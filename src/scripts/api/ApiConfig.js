export const url = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : process.env.BACKEND_API_URL ;
export const version = 'v2';
