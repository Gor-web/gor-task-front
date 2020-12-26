<template>
  <div class="login-container">
    <p class="text">Login</p>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <div class="form-group d-flex justify-content-center ">
          <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
            <div class="form-group mr-3">
              <input type="text" class="form-control" placeholder="Email"
                     v-bind:class="{ 'is-invalid': errors[0] }"
                     v-model="user.email">
              <span class="color_error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="password" rules="required|min:6|max:12" v-slot="{ errors }">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Password"
                     v-bind:class="{ 'is-invalid': errors[0] }"
                     v-model="user.password">
              <span class="color_error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </div>

        <div class="form-check margin">
          <input type="checkbox" class="form-check-input" id="Check">
          <label class="form-check-label" for="Check">Remember Me</label>
        </div>

        <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-info m-2 btn-lg" @click="login">Sign</button>
        </div>
        <div class="d-flex account-register">
          <div class="color">No account?</div>
          <router-link to="/signup">
            <div class="color">Registration</div>
          </router-link>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>


import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  mounted() {

  },
  methods: {
    onSubmit() {
    },
    login(){
      axios.post('http://127.0.0.1:8000/api/auth/login',this.user).then(res=>{
        console.log(res)
        localStorage.setItem('access_token',res.data.access_token);
        this.storeUser()
        this.$router.push('/user/dashboard')
      }).catch(err=>{
        console.log(err.response.data.error)
      })
    },

  }
}
</script>

<style scoped>
.login-container {
  width: 700px;
  height: 400px;
  background-color: white;
  margin: 40px auto;

}

.text {
  text-align: center;
  font-size: 1.3em;
  font-family: Corbel;
}

.margin {
  margin-left: 300px;
}

.account-register {
  margin-top: 50px;
  text-align: center;
  font-size: 1.2em;
}

.color {
  color: #ff724b;
  margin-left: 170px;
}
</style>
