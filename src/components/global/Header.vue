<template>
  <div class="header-container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="z-index: 1">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor03">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">Contact</a>
          </li>
          <li class="nav-item">
            <router-link v-if="this.$store.getters.user" class="nav-link" to="/user/dashboard"><div>Your Page</div></router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="this.$store.getters.user"  class="nav-link" to="/allusers"><div>All Users</div></router-link>
          </li>
          <li v-if="this.$store.getters.user" @click="logout($event)" class="nav-item">
            <router-link class="nav-link" to="/Login">Logout</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
            <div class="dropdown-menu">
              <router-link v-if="!this.$store.getters.user" class="dropdown-item" to="/login"><div>Login</div></router-link>
              <router-link v-if="!this.$store.getters.user" class="dropdown-item" to="/registration"> <div>Registration</div></router-link>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search">
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "header",
  methods:{
    logout($event){
      $event.preventDefault()
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/auth/logout', null, {
        headers: {
          'Authorization': token
        }
      }).then(res => {
        this.$store.commit('setUser', null)
        this.$store.commit('setFriend', null)
        localStorage.removeItem("user")
        localStorage.removeItem("friend")
        localStorage.removeItem("access_token")
        localStorage.removeItem("current_user")
        console.log(this.user)
        console.log(localStorage.user)
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>

</style>
