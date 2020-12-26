import Login from "./Login";
import Registration from "./Registration";

export default [
  {
    path:'/login',
    name:'Login',
    component:Login,
    meta: {middleware: ['guest']}
  },

  {
    path:'/registration',
    name:'Registration',
    component:Registration,
    meta: {middleware: ['guest']}
  }
]
