<template>
  <div class="message-container">

<div v-for="messages in getMessages" class="card text-white bg-primary mb-3 " style="width: 100%">
  <div v-for="message in messages" class="card text-white bg-white mb-3 " style="width: 50%;">
    <div class="card-header text-center" style="color: black">{{message.message}}</div>
    <button class="btn btn-danger" @click="deleteFriend(message.message)">Delete</button>
    <div v-for="item in message">
      <div style="color: black">{{item.name}}</div>

    </div>
  </div>
</div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "myMessages",
  data() {
    return {
      getMessages: [],
    }
  },
  mounted() {
    this.messages()
  },
  methods: {
    messages() {
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/auth/chat/my_message', {}, {
        headers: {
          'Authorization': token
        }

      })
        .then(res => {
          console.log(res.data)
          this.getMessages = res.data
        })
        .catch(err => {

        })
    },
    deleteFriend(message) {
      let my_id = this.getUser.id
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/auth/deleteMessage', {
          message: message,
          my_id: my_id
        },
        {
          headers: {
            'Authorization': token
          }

        }).then(res => {
        console.log(res.data)
        this.messages()
      }).catch(err => {
        alert(err.response.data)
      })
    },
  }
}
</script>

<style scoped>

</style>
