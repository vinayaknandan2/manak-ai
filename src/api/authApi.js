import { apiClient } from './apiClient';
import { setTokenCookie, removeTokenCookie, setUserCookie, removeUserCookie } from '../utils/cookieUtils';

// Normalize user object so both user.id and user._id are always available
const normalizeUser = (user) => {
  if (!user) return null;
  const id = user.id || user._id;
  return {
    ...user,
    id,
    _id: id,
    role: user.role || 'USER',
  };
};

export const authApi = {
  login: async (credentials) => {
    const normalizedEmail = credentials.email.trim().toLowerCase();

    // Live backend authentication via POST /api/auth/login
    const data = await apiClient.post('/auth/login', {
      email: normalizedEmail,
      password: credentials.password,
    });

    const user = normalizeUser(data?.user);

    if (data?.token) {
      setTokenCookie(data.token);
    }
    if (user) {
      setUserCookie(user);
    }

    return {
      ...data,
      user,
    };
  },

  register: async (formData) => {
    const payload = {
      name: formData.name?.trim() || formData.email.split('@')[0],
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    // Only include role if explicitly set to valid Mongoose enum ('USER' or 'ADMIN')
    if (formData.role === 'ADMIN' || formData.role === 'USER') {
      payload.role = formData.role;
    }

    // Live backend registration via POST /api/auth/register
    const data = await apiClient.post('/auth/register', payload);
    const user = normalizeUser(data?.user);

    // Session cookies are NOT set on registration; user signs in via /login
    return {
      ...data,
      user,
    };
  },

  // GET /api/auth/me (Protected route via Bearer token)
  getMe: async () => {
    const data = await apiClient.get('/auth/me');
    if (data?.user) {
      const user = normalizeUser(data.user);
      setUserCookie(user);
      return {
        ...data,
        user,
      };
    }
    return data;
  },

  // Backward compatibility alias for getMe
  getProfile: async () => {
    return await authApi.getMe();
  },

  logout: () => {
    removeTokenCookie();
    removeUserCookie();
  },
};

export default authApi;


