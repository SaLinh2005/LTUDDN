export function isAuthenticated(): boolean {
  return localStorage.getItem('isLoggedIn') === 'true';
}

export function getUserEmail(): string {
  return localStorage.getItem('userEmail') || '';
}

export function logout(): void {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
}
