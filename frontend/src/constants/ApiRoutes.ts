export const API_ROUTES = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register',
    info: '/auth/info',
  },

  analyze: {
    options: 'types/choose',
    result: 'ml_data',
  },
  HISTORY: {
    GET_HISTORY: '/history',
  },
  INCIDENTS: {
    COUNT: 'incident_count'
  }
};
