<template>
  <div class="merchant">
    <h1>商家</h1><br/>
    <h2>产品</h2><br/>
    <el-row v-if="products.length > 0" class="product-list">
      <el-col v-for="(product, index) in products" :key="index" :span="12">
        <el-card class="product-item" :body-style="{ padding: '20px' }">
          <el-row>
            <el-col :span="18">
              <el-statistic :value="product.price" :precision="2" :suffix="`元`">
                <template #prefix>
                  {{ product.name }} :
                </template>
              </el-statistic>
            </el-col>
            <el-col :span="6" class="delete-button">
              <el-button type="text" @click="deleteProduct(index)" icon="el-icon-delete">删除</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <br/><br/>

    <h2>添加产品</h2><br/>
    <el-input v-model="newProduct.name" placeholder="产品名" size="large" style="width: 200px;"></el-input><br/><br/>
    <el-input v-model="newProduct.price" placeholder="产品价格" size="large" style="width: 200px;"></el-input><br/><br/>
    <el-button @click="addProduct" type="primary">添加</el-button>
    <el-button @click="cancelAdd" type="primary">取消</el-button>    
  </div>
</template>

<script>
import axios from 'axios';
import { ElMessage, ElInput, ElButton } from 'element-plus';

export default {
  components: {
    ElInput,
    ElButton,
  },
  data() {
    return {
      userRole: 'merchant',
      products: [{name: "try", price: 10}],
      newProduct: {
        name: '',
        price: null,
      },
    };
  },
  methods: {
    cancelAdd(){
        this.newProduct.name = '';
        this.newProduct.price = null;
    },
    async getProducts() {
      try {
        const response = await axios.get('/api/products');
        this.products = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addProduct() {
      try {
        const response = await axios.post('/api/products', this.newProduct);
        this.products.push(response.data);
        this.newProduct.name = '';
        this.newProduct.price = null;
        ElMessage.success('添加成功');
      } catch (error) {
        console.error(error);
        ElMessage.error('添加失败');
      }
    },
    async deleteProduct(productId) {
      try {
        await axios.delete(`/api/products/${productId}`);
        this.products = this.products.filter((product) => product.id !== productId);
        ElMessage.success('删除成功');
      } catch (error) {
        console.error(error);
        ElMessage.error('删除失败');
      }
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
.merchant {
  max-width: 500px;
  padding: 20px;
}

.product-list .el-card {
  margin-bottom: 20px;
}

.delete-button {
  display: flex;
  justify-content: flex-end;
}
</style>
