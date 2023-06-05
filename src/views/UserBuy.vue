<template>
  <div class="user">
    <h1>用户</h1><br/>
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
              <el-button type="text" @click="buyProduct(index)" icon="el-icon-delete">购买</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import { ElButton } from 'element-plus';

export default {
  components: {
    ElButton,
  },
  data() {
    return {
      userRole: 'user',
      products: [{name: "try", price: 10}, {name: "test", price: 10} ]
    };
  },
  methods: {
    getProducts() {
      axios.get('/api/products') 
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    buyProduct(idx){
        const payPrice = this.products[idx].price;
        this.$router.push({ name:'PayPage', params: { amount: payPrice, method: '支付宝'} });
    }
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
.user {
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
