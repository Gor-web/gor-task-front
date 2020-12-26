import EmailCode from "./EmailCode";
export default [
  {
    path:'/email',
    name:'EmailCode',
    component:EmailCode,
    meta: {middleware: ['guest']}
  }
]
