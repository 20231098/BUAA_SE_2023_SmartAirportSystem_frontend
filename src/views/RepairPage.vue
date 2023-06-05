<template>
  <div class="repair-page">
    <h2>添加维修项</h2>
    <el-form ref="repairForm" :model="newRepairItem" label-width="120px">
      <el-form-item label="描述">
        <el-input v-model="newRepairItem.description" placeholder="请输入描述" autosize></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="ifEdit" type="primary" @click="editRepairItem">修改</el-button>
        <el-button v-else type="primary" @click="addRepairItem">确认添加</el-button>
        <el-button v-if="ifEdit" @click="cancelEdit">取消</el-button>
        <el-button v-else @click="cancelAdd">取消</el-button>
      </el-form-item>
    </el-form>

    <h2>维修列表</h2>
    <div v-if="repairItems.length > 0" class="repair-list">
      <div v-for="(repairItem, index) in repairItems" :key="index" class="repair-item">
        <span>{{ repairItem.description }}</span>
        <div class="repair-actions">
          <el-button type="text" @click="deleteRepairItem(index)">删除</el-button>
          <el-button type="text" @click="startEdit(index)">修改</el-button>
        </div>
      </div>
    </div>
    <p v-else>暂无维修项</p>
  </div>
</template>

<script>
import axios from 'axios';
import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus';

export default {
  components: {
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
  },
  data() {
    return {
      newRepairItem: {
        description: '',
      },
      repairItems: [],
      ifEdit: false,
      editID: null,
    };
  },
  created() {
    this.getRepairItems();
  },
  methods: {
    addRepairItem() {
      axios.post('/api/repair', this.newRepairItem)
        .then(response => {
          this.repairItems.push(response.data);
          this.newRepairItem.description = '';
        })
        .catch(error => {
          console.error(error);
        });
    },
    cancelAdd(){
        this.newRepairItem.description = "";
    },
    deleteRepairItem(id) {
      axios.delete(`/api/repair/drop`, id)
        .then(() => {
          this.repairItems = this.repairItems.filter(item => item.id !== id);
        })
        .catch(error => {
          console.error(error);
        });
    },
    editRepairItem(){
        this.repairItems[this.editID].description = this.newRepairItem.description;
        this.cancelAdd();
    },
    cancelEdit(){
        this.newRepairItem.description = "";
        this.ifEdit = false;
        this.editID = null;
    },
    startEdit(id) {
      this.newRepairItem.description = this.repairItems[id].description;
      this.ifEdit = true;
      this.editID = id;
    },
    getRepairItems() {
      axios.get('/api/repair/list')
        .then(response => {
          this.repairItems = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
.repair-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.repair-list {
  margin-top: 20px;
}

.repair-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.repair-actions {
  display: flex;
}

.repair-actions > * {
  margin-left: 10px;
}
</style>
