// Simple auth utilities for hardcoded admin credentials
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'theodore kaczynski'
}

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}
