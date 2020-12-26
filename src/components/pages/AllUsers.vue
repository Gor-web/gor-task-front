<template>
  <div class="all-users-container">
    <div class="text-center font-weight-bolder h2 mt-2">All Users</div>
    <hr>

    <div class="container h-100">
      <div class="d-flex  h-100">
        <div class="searchbar">
          <input class="search_input" type="text" name="" placeholder="Search by name..." v-model="filters.name">
          <a href="#" class="search_icon"><i class="fas fa-search"></i></a>
        </div>
      </div>
    </div>


      <div  v-for="user in filteredUsers" :key="user.id" class="card" style="width:350px;height: 150px;display: inline-block;margin-left: 70px;margin-top: 20px" v-if="getUser.id !== user.id"  >
        <div class="card-body text-center css-style " >
          <h4 class="card-title">{{user.name}} {{user.lastname}}</h4>
          <h4 class="card-title">Age: {{user.age}}</h4>
          <button class="btn btn-outline-primary" @click="show(user.id)">See Profile</button>
        </div>
      </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AllUsers",
  data() {
    return{
      users: [],
      filters: {
        name:'',
        lastname:''
      }
    }
  },
  mounted() {
    const token = `Bearer ${localStorage.getItem('access_token')}`
    axios.get('http://127.0.0.1:8000/api/auth/users', {
      headers: {
        'Authorization': token
      }
    }).then(res => {
      this.users = res.data
      console.log(res)
    }).catch(err => {
      alert(err.response.data)
    })
  },
  methods: {
    show(id) {
      const token = `Bearer ${localStorage.getItem('access_token')}`
      axios.post('http://127.0.0.1:8000/api/auth/show/' + id, {
        headers: {
          'Authorization': token
        }
      }).then(res => {
        console.log(res.data)
        localStorage.setItem('current_user', JSON.stringify(res.data));
        this.$router.push('/userprofile')
      }).catch(err => {
        alert(err.response.data)
      })
    },
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => user.name.startsWith(this.filters.name))
    }
  },
}
</script>

<style scoped>
.css-style{
  box-shadow: 5px 5px 5px #ecffe4;
}

.searchbar {
  margin-bottom: auto;
  margin-top: auto;
  height: 60px;
  background-color: #353b48;
  border-radius: 30px;
  padding: 10px;
}

.search_input {
  color: white;
  border: 0;
  outline: 0;
  background: none;
  width: 0;
  caret-color: transparent;
  line-height: 40px;
  transition: width 0.4s linear;
}

.searchbar:hover > .search_input {
  padding: 0 10px;
  width: 450px;
  caret-color: red;
  transition: width 0.4s linear;
}

.searchbar:hover > .search_icon {
  background: white;
  color: #e74c3c;
}

.search_icon {
  height: 40px;
  width: 40px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
  text-decoration: none;
}

</style>
