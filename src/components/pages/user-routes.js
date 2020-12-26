import User from "./User";
import AllUsers from "./AllUsers";
import UserProfile from "./UserProfile";

export default [
  {
    path:'/user/dashboard',
    name:'User',
    component:User,
    meta: {middleware: ['auth']}
  },
  {
    path:'/allusers',
    name:'AllUsers',
    component:AllUsers,
    meta: {middleware: ['auth']}
  },
  {
    path:'/userprofile',
    name:'UserProfile',
    component:UserProfile,
    meta: {middleware: ['auth']}
  }
]
