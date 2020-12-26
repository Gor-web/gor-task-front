import Vue from 'vue'
import axios from "axios";

export default Vue.mixin({
methods:{
  storeUser() {
    console.log(this.$store)
    const token = `Bearer ${localStorage.getItem('access_token')}`
    axios.post('http://127.0.0.1:8000/api/auth/user-profile', null, {
      headers: {
        'Authorization': token
      }
    }).then(res => {
      localStorage.setItem('user', JSON.stringify(res.data));
      this.$store.commit('setUser', res.data);
      this.getFriends()
    })
      .catch(err => {
        console.log('error!')
      })
  },
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

      localStorage.setItem('friend', JSON.stringify(res.data));
      this.$store.commit('setFriend', res.data);
    }).catch(err => {
      alert(err.response.data)
    })
  },
},



  computed:
    {
      getUser() {
        return JSON.parse(localStorage.getItem('user')) || this.$store.getters.user
      },

      getFriend() {
        return  this.$store.getters.friend
      }

    }

})
