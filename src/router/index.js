import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/home-page/Home";
import NotFound from "../components/404/NotFound";
import authRoutes from "../components/auth/auth-routes";
import userRoutes from "../components/pages/user-routes"
import friendRoutes from "../components/friends/friend-routes"
import emailRoutes from "../components/email/email-routes"
import myMessagesRoutes from "../components/messages/message-routes"
import auth from "../components/middlewares/auth";
import guest from "../components/middlewares/guest";


Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {middleware: ['guest']}
    },
    ...authRoutes,
    ...userRoutes,
    ...friendRoutes,
    ...emailRoutes,
    ...myMessagesRoutes,
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to.meta.middleware)
  if (to.meta.middleware) {
    if (to.meta.middleware.includes('auth')) {
      auth({next,router})
    } else if (to.meta.middleware.includes('guest')) {
      guest({from, next, router})
    }
  }
});
export default router
