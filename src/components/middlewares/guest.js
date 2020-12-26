export default function auth({ from, next, router }) {
  if (localStorage.getItem('access_token')) {
    return from.name ? router.push({name: from.name}).catch(() => {}) : router.back();
  }
  return next();
}
