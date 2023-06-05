<template>
  <div class="chat-box">
    <div class="message-list">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message"
        :class="{'customer-message': message.sender === 'customer', 'support-message': message.sender === 'support'}"
      >
        <div class="message-content">{{ message.content }}</div>
        <div class="message-divider"></div>
      </div>
    </div>
    <div class="input-section">
      <el-input
        v-model="inputMessage"
        placeholder="请输入消息"
        @keyup.enter="sendMessage"
        class="input-box"
      />
      <el-button @click="sendMessage" class="send-button">
        发送
      </el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    sender: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      messages: [],
      inputMessage: '',
    };
  },
  mounted() {
    this.getChatHistory();
    setInterval(() => {
      this.getChatHistory();
    }, 5 * 1000);
  },
  methods: {
    getChatHistory() {
      axios.get('/api/chat-history')
        .then(response => {
          this.messages = response.data;
        })
        .catch(error => {
          console.error('Failed to get chat history:', error);
        });

      setTimeout(() => {
        // 假设获取到的历史消息存储在 chatHistory 变量中
        const chatHistory = [
          { content: 'Hello', sender: 'support' },
          { content: 'Hi', sender: 'customer' },
          { content: 'How can I help you?', sender: 'support' },
        ];
        this.messages = chatHistory;
      }, 500);
    },
    sendMessage() {
      if (this.inputMessage !== '') {
        const newMessage = {
          content: this.inputMessage,
          sender: this.sender,
        };
        this.messages.push(newMessage);
        // axios.post('/api/send-message', newMessage)
        //   .then(response => {
        //     this.messages.push(response.data);
        //   })
        //   .catch(error => {
        //     console.error('Failed to send message:', error);
        //   });
        this.inputMessage = '';
      }
    },
  },
};
</script>

<style scoped>
.chat-box {
  width: 400px;
  height: 600px;
}

.parking {
  width: 200px;
  height: 300px;
}

.message-list {
  width: 100%;
  height: 70%;
  overflow-y: auto;
}

.message {
  padding: 10px;
  margin-bottom: 10px;
}

.customer-message {
  background-color: #e6f7ff;
  color: #1890ff;
}

.support-message {
  background-color: #f6f6f6;
  color: #333333;
}

.message-divider {
  border-bottom: 1px solid #e8e8e8;
}

.input-section {
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-box {
  flex: 1;
  margin-right: 10px;
}

.send-button {
  flex: 0;
}
</style>
