<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";

export default {
  name: 'App',
  components: {Footer, Header},
  mounted() {
    // this.getUser = JSON.parse(localStorage.getItem('user'))
    this.storeUser()
this.getFriends()
  }
}
</script>

<style>
#app {

}

body, html {
  margin-bottom: 50px;
}
</style>
