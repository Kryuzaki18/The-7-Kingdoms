export const AUTH_RATE_LIMIT = {
  max: 5,
  timeWindow: '1 minute',
  errorResponseBuilder: () => ({
    message: 'Too many attempts. Please wait 1 minute before trying again.',
  }),
} as const;

export const GENERAL_RATE_LIMIT = {
  max: 100,
  timeWindow: '1 minute',
  errorResponseBuilder: () => ({
    message: 'Too many requests. Please try again in 1 minute.',
  }),
} as const;
