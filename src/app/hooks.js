import { useDispatch, useSelector } from 'react-redux';
import {
  loginOfficer,
  registerAgency,
  fetchProfile,
  logoutUser,
  clearAuthError,
} from './slices/authSlice';
import {
  fetchDashboardSummary,
  fetchProcurements,
  fetchProcurementById,
  createProcurement,
  analyzeProcurement,
  deleteProcurement,
  fetchRecommendations,
  recommendStandard,
  fetchProcurementEvidence,
  fetchProcurementGraph,
  setCurrentProcurement,
} from './slices/procurementSlice';
import {
  searchStandards,
  fetchStandardVersion,
  fetchStandardGraph,
  createNewStandard,
  setSearchQuery,
  setActiveStandard,
} from './slices/standardSlice';
import {
  sendChatMessage,
  askAI,
  toggleChat,
  openChat,
  closeChat,
  addUserMessage,
  clearMessages,
} from './slices/chatSlice';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Auth hook connected strictly to backend routes & cookies
export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login: (credentials) => dispatch(loginOfficer(credentials)).unwrap(),
    register: (formData) => dispatch(registerAgency(formData)).unwrap(),
    fetchProfile: () => dispatch(fetchProfile()).unwrap(),
    getMe: () => dispatch(fetchProfile()).unwrap(),
    logout: () => dispatch(logoutUser()),
    clearError: () => dispatch(clearAuthError()),
  };
}

// Procurement hook connected to /api/procurement
export function useProcurement() {
  const dispatch = useAppDispatch();
  const {
    procurements,
    currentProcurement,
    dashboardSummary,
    recentProcurements,
    recentRecommendations,
    recommendations,
    evidence,
    graph,
    requirement,
    loading,
    isAuditing,
    error,
  } = useAppSelector((state) => state.procurement);

  return {
    procurements,
    currentProcurement,
    dashboardSummary,
    recentProcurements,
    recentRecommendations,
    recommendations,
    evidence,
    graph,
    requirement,
    loading,
    isAuditing,
    error,
    loadDashboardSummary: () => dispatch(fetchDashboardSummary()).unwrap(),
    loadProcurements: () => dispatch(fetchProcurements()).unwrap(),
    loadProcurementById: (id) => dispatch(fetchProcurementById(id)).unwrap(),
    createProcurement: (data) => dispatch(createProcurement(data)).unwrap(),
    analyzeProcurement: (id) => dispatch(analyzeProcurement(id)).unwrap(),
    deleteProcurement: (id) => dispatch(deleteProcurement(id)).unwrap(),
    loadRecommendations: (id) => dispatch(fetchRecommendations(id)).unwrap(),
    recommendStandard: (id, query) => dispatch(recommendStandard({ id, query })).unwrap(),
    loadEvidence: (id) => dispatch(fetchProcurementEvidence(id)).unwrap(),
    loadGraph: (id, depth = 1) => dispatch(fetchProcurementGraph({ id, depth })).unwrap(),
    setCurrentProcurement: (procurement) => dispatch(setCurrentProcurement(procurement)),
  };
}

// Standards hook connected to /api/standard
export function useStandards() {
  const dispatch = useAppDispatch();
  const {
    standards,
    searchQuery,
    searchCount,
    activeStandard,
    standardVersion,
    standardGraph,
    loading,
    error,
  } = useAppSelector((state) => state.standards);

  return {
    standards,
    searchQuery,
    searchCount,
    activeStandard,
    standardVersion,
    standardGraph,
    loading,
    error,
    search: (query) => dispatch(searchStandards(query)).unwrap(),
    loadVersion: (id) => dispatch(fetchStandardVersion(id)).unwrap(),
    loadGraph: (id, depth = 1) => dispatch(fetchStandardGraph({ id, depth })).unwrap(),
    createStandard: (data) => dispatch(createNewStandard(data)).unwrap(),
    setQuery: (q) => dispatch(setSearchQuery(q)),
    setActiveStandard: (standard) => dispatch(setActiveStandard(standard)),
  };
}

// Chat hook connected to /api/chat and /api/ai/ask
export function useChat() {
  const dispatch = useAppDispatch();
  const { messages, isOpen, loading, error } = useAppSelector((state) => state.chat);

  return {
    messages,
    isOpen,
    loading,
    error,
    toggle: () => dispatch(toggleChat()),
    open: () => dispatch(openChat()),
    close: () => dispatch(closeChat()),
    clear: () => dispatch(clearMessages()),
    sendMessage: (msg) => {
      dispatch(addUserMessage(msg));
      return dispatch(sendChatMessage(msg)).unwrap();
    },
    askAI: (prompt) => {
      dispatch(addUserMessage(prompt));
      return dispatch(askAI(prompt)).unwrap();
    },
  };
}
