<template>
  <div class="friend-container">
    <div v-for="request in requests">
      <div v-for="item in request.friend_info">
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MyFriends",
  data() {
    return {
      requests: null
    }
  },

  mounted() {
    this.getFriends()
  },
  methods: {
    getFriends() {
      let id = this.getUser.id
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/auth/myFriends/', {
          id: id,
        },
        {
          headers: {
            'Authorization': token
          }

        }).then(res => {
        console.log(res.data)
        this.requests = res.data
      }).catch(err => {
        alert(err.response.data)
      })
    },
  }
}
</script>

<style scoped>

</style>
