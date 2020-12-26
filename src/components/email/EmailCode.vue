<template>
<div class="email-container">
  <div class="form-group">
    <div>Please check your email and write the code</div>
    <input type="text" class="form-control" v-model="code">
    <button class="btn btn-outline-primary" @click="send()">Enter email code</button>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
name: "EmailCode",
  data(){
  return{
    code:''
  }
  },
  methods:{
   send(){
     axios.post("http://127.0.0.1:8000/api/auth/checkVerifyCode", {
       code:this.code
     })
       .then(res => {
         this.$router.push('/login')
         console.log(res.data)
       })
       .catch(err=> {
         console.log(err.error)
       })
   }
  }
}
</script>

<style scoped>

</style>
