const PREFIX = '/api/v1'
export const API_ROUTES = {
  auth: {
    me: `${PREFIX}/auth/me`,
    login: `${PREFIX}/auth/login`,
    signup: `${PREFIX}/auth/signup`,
    logout: `${PREFIX}/auth/logout`,
  }
} as const;