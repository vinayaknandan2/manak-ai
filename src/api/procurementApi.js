import { apiClient } from './apiClient';

export const procurementApi = {
  // GET /api/procurement/dashboard/summary
  // Controller: getDashboardSummary in procurementsController.js
  // Returns: { success: true, summary: { totalProcurements, totalRequirements, totalRecommendations, highConfidence, needsReview }, recentProcurements, recentRecommendations }
  getDashboardSummary: async () => {
    return await apiClient.get('/procurement/dashboard/summary');
  },

  // GET /api/procurement
  // Controller: getProcurement in procurementsController.js
  // Returns: { success: true, procurement: [...] }
  getProcurements: async () => {
    return await apiClient.get('/procurement');
  },

  // GET /api/procurement/:id
  // Controller: getProcurementById in procurementsController.js
  // Returns: { success: true, procurement }
  getProcurementById: async (id) => {
    return await apiClient.get(`/procurement/${id}`);
  },

  // POST /api/procurement
  // Controller: createProcurement in procurementsController.js
  // Body: { name, description, type: ['tender', 'procurement', 'boq'] }
  // Returns: { success: true, procurement }
  createProcurement: async (data) => {
    const validTypes = ['tender', 'procurement', 'boq'];
    const lower = (data.type || '').toLowerCase();
    const type = validTypes.includes(lower) ? lower : 'tender';
    return await apiClient.post('/procurement', {
      name: data.name || data.title,
      description: data.description,
      type,
    });
  },

  // POST /api/procurement/:id/analyze
  // Controller: analyzeProcurementController in procurementsController.js
  // Returns: { success: true, requirement }
  analyzeProcurement: async (id) => {
    return await apiClient.post(`/procurement/${id}/analyze`);
  },

  // DELETE /api/procurement/:id
  // Controller: deleteProcurement in procurementsController.js
  // Returns: { success: true, message }
  deleteProcurement: async (id) => {
    return await apiClient.delete(`/procurement/${id}`);
  },

  // GET /api/procurement/:id/recommendations
  // Controller: getRecommendations in procurementsController.js
  // Returns: { success: true, procurementId, count, recommendations: [...] }
  getRecommendations: async (id) => {
    return await apiClient.get(`/procurement/${id}/recommendations`);
  },

  // POST /api/procurement/:id/recommend
  // Controller: recommendStandard in standardController.js
  // Body: { query }
  // Returns: { success: true, procurementId, requirementId, query, count, recommendations: [...] }
  recommendStandard: async (id, query) => {
    return await apiClient.post(`/procurement/${id}/recommend`, { query });
  },

  // GET /api/procurement/:id/evidence
  // Controller: getProcurementEvidence in procurementsController.js
  // Returns: { success: true, procurementId, count, evidence: [...] }
  getProcurementEvidence: async (id) => {
    return await apiClient.get(`/procurement/${id}/evidence`);
  },

  // GET /api/procurement/:id/graph?depth=1
  // Controller: getProcurementGraphController in procurementsController.js
  // Returns: { success: true, procurement, depth, graph }
  getProcurementGraph: async (id, depth = 1) => {
    return await apiClient.get(`/procurement/${id}/graph?depth=${depth}`);
  },
};

export default procurementApi;
