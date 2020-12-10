
export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('Authorization'))

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` }
  }
  return {}
}