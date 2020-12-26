<template>
  <div class="user-profile-container d-flex justify-content-center">
    <div class="card">
      <img src="../images/iconfinder_search_326690.png" alt="Avatar" style="width:200px;height: 200px;margin: auto">
      <div class="container">
        <h4><b>{{ friend_profile.name }} {{ friend_profile.lastname }}</b></h4>
        <p><b>Age: {{ friend_profile.age }}</b></p>
        <p><b>Email: {{ friend_profile.email }}</b></p>
        <div class="d-flex justify-content-center">
          <button v-if="isActive" class="btn-outline-primary btn-lg" @click="addFriend(friend_profile.id)"
                  :class="{active:isActive}" >
            <img src="../images/add-friend.png">Add Friend
          </button>
          <button class="btn btn-outline-info" v-else>Added ✓</button>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserProfile",
  data() {
    return {
      users: [],
      friend_profile:{},
      user: {},
      isActive: true,
    }
  },
mounted() {
    this.friend_profile = JSON.parse(localStorage.getItem('current_user'))

},
  methods: {
    addFriend(id) {
      let userid = this.getUser.id
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/auth/friends/', {
          my_id: userid,
          friend_id: id
        },
        {
          headers: {
            'Authorization': token
          }
        }).then(res => {
        console.log(res.data)

this.isActive = false
      }).catch(err => {
        alert(err.response.data)
      })
    }
  },

}

</script>


<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
  padding: 2px 16px;
}
</style>
