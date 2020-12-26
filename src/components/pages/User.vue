<template>
  <div class="user-container">
    <p style="font-size: 2em">User page</p>
    <nav class="sidenav-left">
      <div class="left-item">
        <div class="photo" v-model="getUser.name">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="60" fill="currentColor" class="bi bi-camera"
               viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                  d="M15 12V6a1 1 0 0 0-1-1h-1.172a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 9.173 3H6.828a1 1 0 0 0-.707.293l-.828.828A3 3 0 0 1 3.172 5H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
            <path fill-rule="evenodd"
                  d="M8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
            <path d="M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
          </svg>
        </div>
        <div>
          <input type="text" v-if="active_data" v-model="edit_data.name">
          <p>{{ getUser.name||edit_data.name }}</p>
          <input type="text" v-if="active_data" v-model="edit_data.lastname">
          <p>{{ getUser.lastname||edit_data.lastname }}</p>

          <button v-if="!active_data" class="btn btn-outline-info btn-lg btn-block"
                  data-toggle="modal" data-target="#exampleModal"
                  @click="editUser(getUser.id)">Edit</button>
          <button v-else-if="active_data"
                  @click="saveEditedUser(getUser.id)"
                  class="save btn btn-dark btn-lg btn-block">Save</button>

        </div>
        <div>
          <RouterLink to="/requests/friendRequests">
            <p class="btn  btn-lg  mt-3  btn-primary">Friend requests</p></RouterLink>
        </div>

      </div>
      <RouterLink to="/message" class="btn btn-dark btn-lg btn-block">Messages</RouterLink>
    </nav>

    <div class="main-center">
      </div>
    <div>
    </div>

      <div class="card  w-50 d-flex card-css" v-if="showMessage">
        <div class="close" @click="showMessage=false">X Close</div>
        <div class="card-header">
          Chat
        </div>
        <div class="card-body">
          <textarea class="form-control " id="exampleFormControlTextarea1" rows="3" v-model="message"></textarea>
          <hr>
          <button class="btn btn-lg btn-dark" @click="sendMessage(id)">Send Message</button>
        </div>
        <div class="card-footer text-muted">
          Chat by Gor
        </div>
      </div>

      <nav class="sidenav-right">
        <div class="right-item">
          <h3>My Friends</h3>
          <hr>
          <div v-for="request in getFriend">
            <div v-for="item in request">
              <div v-for="val in item" class="bg-dark mt-3  ">
                <div class="text-light hover-users ml-1" @click="openCard"
                     data-toggle="modal" data-target="#exampleModalCenter"
                >{{ val.name }} {{ val.lastname }}
                </div>
                <button class="btn btn-danger btn-sm " @click="deleteFriend(val.id)">Delete Friend</button>
                <button class="btn btn-outline-warning btn-sm " @click="openMessage(val.id)" >Message</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>


</template>

<script>
import axios from "axios";

export default {
  name: "User",

  data() {
    return {
      accepted_to_me: '',
      openUsers: false,
      showMessage: false,
      message: '',
      getter_id: null,
      edit_data: {},
      active_data: false,
    }
  },


  mounted() {
    this.getFriends()
    this.edit_data = this.getUser
  },
  methods: {
    openMessage(id) {
      this.showMessage = true
      this.getter_id=id
    },

    sendMessage() {

      let my_id = this.getUser.id

      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post("http://127.0.0.1:8000/api/auth/chat/send",{
        message:this.message,
        my_id:my_id,
        getter_id:this.getter_id
      },{
        headers: {
          'Authorization': token
        }
        }
      )
        .then(res => {
          this.showMessage=false
          console.log(res.data)
        })
    },
    openCard() {
      this.openUsers = true
    },
    deleteFriend(id) {
      let my_id = this.getUser.id
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/auth/delete', {
          friend_id: id,
          my_id: my_id
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

    editUser(getUser_id) {
      this.active_data=true
      this.edit_data = this.getUser.find(getUser => getUser.id === getUser_id)
    },
    saveEditedUser(id) {
      this.active_data=false

      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/auth/saveUser',
        {
          data: this.edit_data,
          getUser_id: id
        },
        {
          headers: {
            'Authorization': token
          }
        }).then(res => {

        this.storeUser()
        this.edit_data = this.getUser

        console.log(res.data)
      }).catch(err=>{
      })
    },
  },



}
</script>

<style scoped>
.user-container {
  text-align: center;
}

.main-center {
  margin-left: 180px;
  margin-top: 50px;
}

.sidenav-left {
  height: 100%;
  width: 180px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #f9f9ff;
  overflow-x: hidden;
  transition: 0.5s;
  border-right: 2px solid black;
}

.sidenav-left .left-item {
  margin-top: 120px;
}

.sidenav-left .left-item .photo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid black;
  margin-left: 50px;
}

.main-center {
  margin-right: 180px;
  margin-top: 50px;
  margin-bottom: 50px;
}

.sidenav-right {
  height: 100%;
  width: 230px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: #f9f9ff;
  overflow-x: hidden;
  transition: 0.5s;
  border-left: 2px solid black;
}

.sidenav-right .right-item {
  margin-top: 120px;
}

.hover-users {
  font-size: 1.1em;
  cursor: pointer;
}

.hover-users:hover {
  font-size: 1.2em;
}

.close {
  cursor: pointer;
}
.card-css {
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
}

</style>
