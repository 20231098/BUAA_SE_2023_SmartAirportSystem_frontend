<template>
  <div class="standby">
    <h2>航班候补</h2>
    <el-form ref="standbyForm" :model="standbyForm" label-width="120px">
      <el-form-item label="选择航班" :rules="[{ required: true, message: '请选择航班' }]">
        <el-select v-model="standbyForm" placeholder="请选择航班">
          <el-option
            v-for="flight in flights"
            :key="flight.id"
            :label="flight.name"
            :value="flight.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="setStandby">确认设置</el-button>
        <el-button type="primary" @click="cancelStandby">取消</el-button>
      </el-form-item>
    </el-form>
    <h2>已有余票</h2>
    <el-row v-if="restList.length > 0" class="standby-list">
      <el-col v-for="(standby, index) in restList" :key="index" :span="12">
        <el-card class="standby-item" :body-style="{ padding: '20px' }">
          <el-row>
            <el-col :span="18">{{standby}}</el-col>
            <el-col :span="6" class="delete-button">
              <el-button type="text" @click="deleteStandby(standby)" icon="el-icon-delete">删除</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <h2>仍无余票</h2>
    <el-row v-if="waitList.length > 0" class="standby-list">
      <el-col v-for="(standby, index) in waitList" :key="index" :span="12">
        <el-card class="standby-item" :body-style="{ padding: '20px' }">
          <el-row>
            <el-col :span="18">{{standby}}</el-col>
            <el-col :span="6" class="delete-button">
              <el-button type="text" @click="deleteStandby(standby)" icon="el-icon-delete">删除</el-button>
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
import { ElForm, ElFormItem, ElSelect, ElOption, ElButton, ElMessage } from 'element-plus';

export default {
  components: {
    ElForm,
    ElFormItem,
    ElSelect,
    ElOption,
    ElButton,
  },
  data() {
    return {
      userRole: 'customer',
      standbyForm: "",
      flights: [],
      standbys: [],
      restList: [],
      waitList: [],
    };
  },
  created() {
    // 获取航班数据
    this.getFlights();
    this.getStandbys();
    this.checkStandby();
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getFlights();
      this.getStandbys();
      this.checkStandby();
    }, 30 * 1000); 
  },
  methods: {
    getStandbys() {
      this.standbys = [];
      axios.get('/api/standbys')
        .then(response => {
          this.standbys = response.data;
        })
        .catch(error => {
          console.error(error);
        });
      for(let i = 0;i < 9;i++){
        this.standbys.push("F"+i);
      }
    },
    getFlights() {
      axios.get('/api/flights/rest')
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
          rest: (i > 5? 0:10),
        });
      }
    },
    setStandby() {
      this.$refs.standbyForm.validate(valid => {
        if (valid) {
          const existingFlight = this.flights.find(flight => flight.id === this.standbyForm);
          if (existingFlight.rest == 0) {
            if(!this.standbys.includes(this.standbyForm)){ //
            //-----------------------------------------------------------
              axios.post('/api/add-standby', this.standbyForm)
                .catch(error => {
                  console.error(error);
                });
              this.standbyForm = '';
            }else{
              ElMessage({
                type: 'error',
                message: "当前航班已设置候补",
                duration: 2000,
              })
            }
          } else{
              ElMessage({
                type: 'error',
                message: "当前航班仍有余票",
                duration: 2000,
              })
          }
        }else console.log("-----------------");
      });
    },
    deleteStandby(flightId) {
      axios.post('/api/del-standby', flightId)
        .catch(error => {
          console.error(error);
        });
    },
    checkStandby() {
      this.restList = [];
      this.waitList = [];
      for(let i = 0;i < this.standbys.length;i++){
        const standby = this.standbys[i];
        const flight = this.flights.find(flight => flight.id === standby);
        if(flight.rest == 0) this.waitList.push(standby);
        else this.restList.push(standby);
      }
    },
    cancelStandby() {
      this.standbyForm = '';
    },
  },
};
</script>

<style scoped>
.standby {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.standby-list .el-card {
  margin-bottom: 20px;
}

.delete-button {
  display: flex;
  justify-content: flex-end;
}
</style>