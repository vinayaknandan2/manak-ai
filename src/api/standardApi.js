import { apiClient } from './apiClient';

export const standardApi = {
  // POST /api/standard
  // Controller: createStandard in standardController.js
  // Body: { code, title, description, category, subcategory, source, status, latestVersion, keywords }
  // Returns: { success: true, message: "Standard created successfully", standard }
  createStandard: async (standardData) => {
    return await apiClient.post('/standard', standardData);
  },

  // GET /api/standard/search?q=...
  // Controller: searchStandard in standardController.js
  // Returns: { success: true, query, count, standards: [...] }
  searchStandards: async (query) => {
    return await apiClient.get(`/standard/search?q=${encodeURIComponent(query)}`);
  },

  // GET /api/standard/:id/version
  // Controller: getStandardVersionController in standardController.js
  // Returns: { success: true, ...versionInfo }
  getStandardVersion: async (id) => {
    return await apiClient.get(`/standard/${id}/version`);
  },

  // GET /api/standard/:id/graph?depth=1
  // Controller: getStandardGraphController in standardController.js
  // Returns: { success: true, standard: { _id, code, title, version, standardFamily }, depth, graph }
  getStandardGraph: async (id, depth = 1) => {
    return await apiClient.get(`/standard/${id}/graph?depth=${depth}`);
  },
};

export default standardApi;
