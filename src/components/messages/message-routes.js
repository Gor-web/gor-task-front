import MyMessages from "./MyMessages";

export default [
  {
    path:'/message',
    name:'MyMessages',
    component:MyMessages,
    meta: {middleware: ['auth']}

  }
]
