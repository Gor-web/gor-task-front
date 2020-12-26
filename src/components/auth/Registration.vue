<template>
  <div class="register-container">
    <p class="text">Registration</p>
    <hr>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <div class="col-sm-6 offset-sm-3">
          <ValidationProvider name="name" rules="required|alpha" v-slot="{ errors }">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="name"
                     v-bind:class="{ 'is-invalid': errors[0] }"
                     v-model="user.name">
              <span class="color_error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="lastname" rules="required|alpha" v-slot="{ errors }">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="lastname"
                     v-bind:class="{ 'is-invalid': errors[0] }"
                     v-model="user.lastname">
              <span class="color_error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>


          <ValidationProvider name="age" rules="required|between:1,100|numeric" v-slot="{ errors }">
            <div class="form-group">
              <input type="number" class="form-control" placeholder="Age"
                     v-bind:class="{ 'is-invalid': errors[0] }"
                     v-model="user.age">
              <span class="color_error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
            <div class="form-group">
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

          <ValidationProvider name="confirmPassword" rules="required|confirmed:password" v-slot="{ errors }">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="ConfirmPassword"
                     v-bind:class="{ 'is-invalid': errors[0] }"
                     v-model="user.confirmPassword">
              <span class="color_error">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <div class="form-group">
            <input type="submit" class="btn btn-outline-dark" value="Registration" @click="register">
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>

</template>

<script>

import axios from "axios";

export default {
  name: "Registration",
  data() {
    return {
      user: {
        name: '',
        lastname: '',
        age: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
  methods: {
    onSubmit() {

    },

    register() {
      axios.post("http://127.0.0.1:8000/api/auth/register",this.user)
        .then(res => {
          this.$router.push('/email')
          console.log(res.data)
        })
        .catch(err=> {
          console.log(err.error)
        })
    }
  },

}
</script>

<style scoped>
.text {
  text-align: center;
  font-size: 1.4em;
  font-family: "Arial Narrow";
}
</style>
