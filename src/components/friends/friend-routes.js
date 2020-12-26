import FriendRequests from "./FriendRequests";
import MyFriends from "./MyFriends";

export default [
  {
    path:'/requests/friendRequests',
    name:'friendRequests',
    component:FriendRequests,
    meta: {middleware: ['auth']}
  },
  {
    path:'/myFriends',
    name:'myFriends',
    component:MyFriends,
    meta: {middleware: ['auth']}
  }
]
