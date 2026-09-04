// Re-export Redux-backed useAuth hook for complete backward compatibility
export { useAuth } from './hooks';

export function AuthProvider({ children }) {
  return children;
}

export default AuthProvider;
