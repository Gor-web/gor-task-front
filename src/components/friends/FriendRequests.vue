<template>
  <div class="friend-container">
    <table class="table table-hover table-bordered  table-dark">
      <tr>
        <th>Name</th>
        <th>Lastname</th>
        <th>Age</th>
        <th>Email</th>
        <th style="text-align: center">Action</th>
      </tr>

      <tbody v-for="request in requests">
      <tr v-for="item in request.user">
        <td>{{ item.name }}</td>
        <td>{{ item.lastname }}</td>
        <td>{{ item.age }}</td>
        <td>{{ item.email }}</td>
        <div class="text-center">
          <td @click="acceptFriend(item.id)" class="btn btn-outline-warning ">Accept friend</td>
          <td @click="declineFriend(item.id)" class="btn btn-danger">Decline</td>
        </div>

      </tr>
      </tbody>

    </table>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FriendRequests",
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
      axios.post('http://127.0.0.1:8000/api/auth/myRequests/', {
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
    acceptFriend(id) {
      let my_id=this.getUser.id
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/auth/myRequests/accept', {
          id: id,
          my_id:my_id
        },
        {
          headers: {
            'Authorization': token
          }
        }).then(res => {
        console.log(res.data)
        this.getFriends()
      }).catch(err => {
        alert(err.response.data)
      })
    },
    declineFriend(id) {
      let my_id=this.getUser.id
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/auth/myRequests/decline', {
          id: id,
          my_id:my_id
        },
        {
          headers: {
            'Authorization': token
          }

        }).then(res => {
        console.log(res.data)
        this.getFriends()
      }).catch(err => {
        alert(err.response.data)
      })
    }
  }
}
</script>

<style scoped>

</style>
