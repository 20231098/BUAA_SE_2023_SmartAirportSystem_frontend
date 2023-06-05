<template>
  <div>
    <h1>客服界面</h1>
    <ChatBox :sender="userRole" />
    <router-link to="/faq">常见问题</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import ChatBox from './ChatBox.vue';

export default {
  data() {
    return {
      userRole: null,
    };
  },
  created() {
    this.getUserRole();
  },
  methods: {
    getUserRole() {
      axios.get('/api/userRole') 
        .then(response => {
          this.userRole = response.data.role;
        })
        .catch(error => {
          console.error(error);
        });
        // test
      this.userRole = 'support';
        // test
    },
  },
  components: {
    ChatBox,
  },
};
</script>
