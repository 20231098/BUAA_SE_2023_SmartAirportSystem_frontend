<template>
  <div class="price-alert">
    <h2>价格预警</h2>
    <el-form ref="alertForm" :model="alertForm" label-width="120px">
      <el-form-item label="选择航班" prop="id" :rules="[{ required: true, message: '请选择航班' }]">
        <el-select v-model="alertForm.id" placeholder="请选择航班">
          <el-option
            v-for="flight in flights"
            :key="flight.id"
            :label="flight.name"
            :value="flight.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设置预警价格" prop="price" :rules="[{ required: true, message: '请设置预警价格' }]">
        <el-input-number v-model="alertForm.price" controls-position="right" :min="0" :precision="2"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="setAlert">确认设置</el-button>
        <el-button type="primary" @click="cancelAlert">取消</el-button>
      </el-form-item>
    </el-form>
    <h2>达到预警价格</h2>
    <el-row v-if="alertsAbove.length > 0" class="alert-list">
      <el-col v-for="(alert, index) in alertsAbove" :key="index" :span="12">
        <el-card class="alert-item" :body-style="{ padding: '20px' }">
          <el-row>
            <el-col :span="18">
              <el-statistic :value="alert.price" :precision="2" :suffix="`元`">
                <template #prefix>
                  {{ alert.id }} :
                </template>
              </el-statistic>
            </el-col>
            <el-col :span="6" class="delete-button">
              <el-button type="text" @click="deleteAlert(alert.id)" icon="el-icon-delete">删除</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <h2>未到达预警价格</h2>
    <el-row v-if="alertsBelow.length > 0" class="alert-list">
      <el-col v-for="(alert, index) in alertsBelow" :key="index" :span="12">
        <el-card class="alert-item" :body-style="{ padding: '20px' }">
          <el-row>
            <el-col :span="18">
              <el-statistic :value="alert.price" :precision="2" :suffix="`元`">
                <template #prefix>
                  {{ alert.id }} :
                </template>
              </el-statistic>
            </el-col>
            <el-col :span="6" class="delete-button">
              <el-button type="text" @click="deleteAlert(alert.id)" icon="el-icon-delete">删除</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <p v-else>暂无价格预警</p>
  </div>
</template>

<script>
import axios from 'axios';
import { ElForm, ElFormItem, ElSelect, ElOption, ElInputNumber, ElButton, ElMessage } from 'element-plus';

export default {
  components: {
    ElForm,
    ElFormItem,
    ElSelect,
    ElOption,
    ElInputNumber,
    ElButton,
  },
  data() {
    return {
      userRole: 'customer',
      flights: [],
      alerts: [],
      alertsBelow: [],
      alertsAbove: [],
      alertForm: {
        id: '',
        price: null,
      },
    };
  },
  created() {
    // 获取航班数据
    this.getFlights();
    this.getAlerts();
    this.checkPrice();
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getFlights();
      this.getAlerts();
      this.checkPrice();
    }, 30 * 1000); 
  },
  methods: {
    getAlerts() {
      this.alerts = [];
      axios.get('/api/alerts')
        .then(response => {
          this.alerts = response.data;
        })
        .catch(error => {
          console.error(error);
        });
      for(let i = 0;i < 9;i++){
        this.alerts.push({
          id: "F"+i,
          price: (i+1) * 200,
        });
      }
    },
    getFlights() {
      axios.get('/api/flights/price')
        .then(response => {
          this.flights = response.data;
        })
        .catch(error => {
          console.error(error);
        });
      this.flights = [];
      for(let i = 0;i < 10;i++){
        this.flights.push({
          id: "F"+i,
          price: 1000,
        });
      }
    },
    setAlert() {
      this.$refs.alertForm.validate(valid => {
        if (valid) {
          const existingFlight = this.flights.find(flight => flight.id === this.alertForm.id);
          const existingAlert = this.alerts.find(alert => alert.id === this.alertForm.id);
          if (existingAlert) {
            if(this.alertForm.price < existingFlight.price){
              existingAlert.price = this.alertForm.price;
              axios.post('/api/edit-alert', existingAlert)
                .catch(error => {
                  console.error(error);
                });
              this.alertForm.id = '';
              this.alertForm.price = null;
            }else{
              ElMessage({
                type: 'error',
                message: "当前价格已低于预警价格",
                duration: 2000,
              })
            }
          } else {
            const newAlert = {
              id: this.alertForm.id,
              price: this.alertForm.price,
            };
            if(newAlert.price < existingFlight.price){
              axios.post('/api/add-alert', newAlert)
                .catch(error => {
                  console.error(error);
                });
              this.alerts.push(newAlert);
              this.alertForm.id = '';
              this.alertForm.price = null;
            }else{
              ElMessage({
                type: 'error',
                message: "当前价格已低于预警价格",
                duration: 2000,
              })
            }
          }
        }else{
          ElMessage({
            type: 'error',
            message: "请正确填写",
            duration: 2000,
          })
        }
      });
    },
    deleteAlert(flightId) {
      axios.post('/api/del-alert', flightId)
        .catch(error => {
          console.error(error);
        });
      for(let i = 0;i < this.alerts.length;i++){
        if(this.alerts[i].id === flightId) {
          this.alerts.splice(i, 1);
          break;
        }
      }
      this.checkPrice();
    },
    checkPrice() {
      this.alertsBelow = [];
      this.alertsAbove = [];
      for(let i = 0;i < this.alerts.length;i++){
        const alert = this.alerts[i];
        const flight = this.flights.find(flight => flight.id === alert.id);
        if(alert.price < flight.price) this.alertsBelow.push(alert);
        else this.alertsAbove.push(alert);
      }
    },
    cancelAlert() {
      this.alertForm.id = '';
      this.alertForm.price = null;
    },
  },
};
</script>

<style scoped>
.price-alert {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.alert-list .el-card {
  margin-bottom: 20px;
}

.delete-button {
  display: flex;
  justify-content: flex-end;
}
</style>