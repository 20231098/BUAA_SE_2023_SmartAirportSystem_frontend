<template>
  <div class="faq">
    <h2>常见问题</h2>
    <el-button v-if="userRole === 'support'" type="primary" @click="showAddForm">
      添加
    </el-button>
    <el-form v-if="showAdd" ref="addForm" label-width="100px" class="add-form">
      <el-form-item label="问题">
        <el-input v-model="newQuestion" placeholder="请输入问题"></el-input>
      </el-form-item>
      <el-form-item label="回答">
        <el-input v-model="newAnswer" placeholder="请输入回答"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="ifEdit" type="primary" @click="editQuestion">修改</el-button>
        <el-button v-else type="primary" @click="addFAQ">确认添加</el-button>
        <el-button v-if="ifEdit" @click="cancelEdit">取消</el-button>
        <el-button v-else @click="cancelAdd">取消</el-button>
      </el-form-item>
    </el-form>
    <ul class="faq-list">
      <li v-for="question in faq" :key="question.id" class="faq-item">
        <div class="question">{{ question.question }}</div>
        <div class="answer">{{ question.answer }}</div>
        <el-button v-if="userRole === 'support'" type="danger" size="small" @click="deleteFAQ(faq.indexOf(question))">
          删除
        </el-button>
        <el-button v-if="userRole === 'support'" size="small" @click="editFAQ(faq.indexOf(question))">
          编辑
        </el-button>
      </li>
    </ul>
  </div>
</template>

<script>
// import { reactive } from 'vue';
import { ElButton, ElForm, ElFormItem, ElInput, ElMessage } from 'element-plus';
import axios from 'axios';
export default {
  components: {
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
  },
  data() {
    return {
      userRole: '', // 从父组件传递的 userRole
      faq: [], // 保存 FAQ 数据的数组
      showAdd: false, // 是否显示添加表单
      ifEdit: false,
      editID: null,
      newQuestion: '', // 新问题输入
      newAnswer: '', // 新回答输入
    };
  },
  created() {
    this.getUserRole();
  },
  mounted() {
    this.getFAQ();
  },
  methods: {
    getFAQ() {
      axios.get('/api/faq') 
        .then(response => {
          this.faq = response.data;
        })
        .catch(error => {
          console.error(error);
        });
      for(let i = 0;i < 5;i++){
        this.faq.push({
          question: i.toString(),
          answer: (i+10).toString(),
        });
      }
    },
    exit() {
      this.$router.go(-1);
    },
    getUserRole() {
      // axios.get('/api/userRole') 
      //   .then(response => {
      //     this.userRole = response.data.role;
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
        // test
      this.userRole = 'support';
        // test
    },
    showAddForm() {
      this.showAdd = true;
    },
    cancelAdd() {
      this.showAdd = false;
      this.newQuestion = '';
      this.newAnswer = '';
    },
    addFAQ() {
      const existingIndex = this.faq.findIndex(item => item.question === this.newQuestion);
      if (existingIndex !== -1) {
        ElMessage({
                  type: 'error',
                  message: "问题已存在",
                  duration: 2000,
              })
      } else {
        const newFAQ = {
          question: this.newQuestion,
          answer: this.newAnswer,
        };
        this.faq.push(newFAQ);
        this.newQuestion = '';
        this.newAnswer = '';
      }
      // axios
      //   .post('/api/addFAQ', newFAQ)
      //   .then(response => {
      //     this.getFAQ();
      //     this.cancelAdd();
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
    },
    deleteFAQ(id) {
      this.faq.splice(id, 1);
      // axios
      //   .delete(`/api/delFAQ/${id}`)
      //   .then(response => {
      //     this.getFAQ();
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
    },
    editFAQ(id) {
      const faqToEdit = this.faq[id];
      if (faqToEdit) {
        this.newQuestion = faqToEdit.question;
        this.newAnswer = faqToEdit.answer;
        this.showAdd = true; 
        this.ifEdit = true;
        this.editID = id;
      }
    },
    editQuestion() {
      const faqToEdit = this.faq[this.editID];
      if (faqToEdit) {
        const existingIndex = this.faq.findIndex(item => item.question === this.newQuestion && item !== faqToEdit);
        if (existingIndex !== -1) {
          ElMessage({
                    type: 'error',
                    message: "问题已存在",
                    duration: 2000,
                })
        } else {
          faqToEdit.question = this.newQuestion;
          faqToEdit.answer = this.newAnswer;
          this.cancelEdit();
        // axios.post('/api/editFAQ', {
        //     id: editID,
        //     question: this.newQuestion,
        //     answer: this.newAnswer,
        //   })
        //   .then(response => {
        //     this.getFAQ();
        //     this.cancelEdit();
        //   })
        //   .catch(error => {
        //     console.error(error);
        //   });
        }
      }
    },
    cancelEdit() {
      this.ifEdit = false; 
      this.editId = null; 
      this.cancelAdd();
    },
  },
};
</script>
