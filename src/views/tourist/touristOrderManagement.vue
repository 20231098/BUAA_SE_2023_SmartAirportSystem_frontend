<template>
    <div class="common-layout">
      <el-container>
        <el-header>
          <div class="headerContainer">
            <img src="@/assets/logo.png" class="logo" fit="contain"/>
          </div> 
        </el-header>
        <el-container>
          <el-aside width="200px" class="aside">
            <el-menu
              class="el-menu-vertical-demo"
              align="left" 
              unique-opened :collapse="isCollapse"
              router>
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><House /></el-icon>
                  <span>首页</span>
                </template>
                <el-menu-item index="/tourist">返回首页</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>实名信息管理</span>
                </template>
                <el-menu-item index="/tourist/touristSelfInformation">实名信息管理</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><document /></el-icon>
                  <span>机票管理</span>
                </template>
                <el-menu-item index="/tourist/ticketmanage">管理机票信息</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="4">
                <template #title>
                  <el-icon><FolderChecked /></el-icon>
                  <span>停车订单管理</span>
                </template>
                <el-menu-item index="/tourist/ordermanage">管理停车订单</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="5">
                <template #title>
                  <el-icon><CircleCheck /></el-icon>
                  <span>商品订单管理</span>
                </template>
                <el-menu-item index="/tourist/purchasemanage">管理商品订单</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="6">
                <template #title>
                    <el-icon><PieChart /></el-icon>
                  <span>个人中心</span>
                </template>
                <el-menu-item index="/tourist/selfmanage">个人中心</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="7">
                <template #title>
                    <el-icon><HomeFilled /></el-icon>
                  <span>退出登录</span>
                </template>
                <el-menu-item index="/">退出登录</el-menu-item>
              </el-sub-menu> 
            </el-menu>
          </el-aside>  
          <el-main>
            <el-tabs tab-position="left" class="card">
                <el-tab-pane label="查询停车位" name="first">
                    <el-table :data="parkingList" stripe style="width: 100%">
                        <el-table-column prop="parkingspaceid" label="停车位ID" width="120" />
                        <el-table-column prop="location" label="停车位位置" width="120" />
                        <el-table-column prop="price" label="价格" width="120"/>
                    </el-table>
                    <div class="button">
                        <el-button @click="parking_check" class="submit_btn" type="primary">查询停车位</el-button>
                    </div>                   
                </el-tab-pane>
                <el-tab-pane label="添加停车订单" name="second">
                    <div class="parking" @keyup.enter="keyPressed">
                        <h4>添加停车订单</h4>
                        <el-form :model="parkingForm" :rules="parkingRules" ref="parkingForm" label-width="80px" class="parkingFormStyle"
                            status-icon="true">

                            <el-form-item label="时间段" prop="timeRange">
                                <el-date-picker
                                    v-model="parkingForm.timeRange"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    value-format="YYYY-MM-DD HH:mm:ss"
                                ></el-date-picker>
                            </el-form-item>

                            <el-form-item label="车位" prop="parkingspaceid">
                                <el-input v-model="parkingForm.parkingspaceid" placeholder="请输入车位ID"></el-input>
                            </el-form-item>
                            

                            <el-form-item label="支付方式" prop="paymentMethod">
                                <el-radio-group v-model="parkingForm.paymentMethod">
                                    <el-radio label="信用卡">信用卡</el-radio>
                                    <el-radio label="微信支付">微信支付</el-radio>
                                    <el-radio label="支付宝">支付宝</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    
                        <el-button type="primary" @click="parking_btn" class="parking_btn">确认</el-button>
                        <el-button @click="parking_cancel" class="parking_btn">取消</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="查看停车订单" name="third">
                    <el-table :data="parkingOrderList" stripe style="width: 100%">
                            <el-table-column prop="orderid" label="订单ID" width="120" />
                            <el-table-column prop="touristid" label="旅客ID" width="120"/>
                            <el-table-column prop="parkingspaceid" label="停车位ID" width="120"/>
                            <el-table-column prop="starttime" label="预定开始时间" width="120"/>
                            <el-table-column prop="endtime" label="预定结束时间" width="120"/>
                    </el-table>
                    <div class="button">
                        <el-button @click="checkParkingOrder" class="parking_btn" type="primary">查询停车订单</el-button>
                    </div> 
                </el-tab-pane>
                <el-tab-pane label="退订停车订单" name="fourth">
                    <div class="Addperson"  @keyup.enter="keyPressed">
                        <h4>退订停车订单</h4>
                        <el-form :model="parkingOrderForm" label-width="70px">
                            <el-form-item label="ID" class="login_input_box" prop="orderid">
                                <el-input v-model="parkingOrderForm.orderid" placeholder="请输入订单ID"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="deleteOrder" class="button" type="primary">退订停车订单</el-button>
                            </div>
                        </el-form>
                    </div>
                </el-tab-pane>
            </el-tabs>
          </el-main>
        </el-container>  
      </el-container>
    </div>
  </template>
  
  <script>
  //import companyChange from '@/components/companyChange.vue';
  //import { useStore } from 'vuex';
  import { ElMessage } from 'element-plus';
  import qs from 'qs';
  export default{
  //
    data() {
        return {
            parkingList:[{
                parkingspaceid:"",
                location:"",
                price:"",
            }],

            parkingForm: {
                parkingspaceid: "",
                timeRange: "",
                parkingSpot: "",
                name: "",
                phone: "",
                paymentMethod: "",
                payAmount: 0,
            },
            parkingRules: {
                timeRange: [
                    { required: true, message: "请选择时间段", trigger: "blur" }
                ],
                paymentMethod: [
                    { required: true, message: "请选择支付方式", trigger: "blur" }
                ],
            },

            parkingOrderList:[{
                orderid: "",
                touristid: "",
                parkingspaceid: "",
                starttime: "",
                endtime: "",
            }],

            parkingOrderForm:{
                orderid: "",
                touristid: "",
                parkingspaceid: "",
                starttime: "",
                endtime: "",
            }
        }

    },

    methods:{
        parking_check(){
            const touristtoken = window.localStorage.getItem("touristtoken");
            this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/tourist/listparkinspace" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                    data: qs.stringify({
                    /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                        token:touristtoken,
                    }),
                })
                .then((res) => {
                    /* res 是 response 的缩写 */
                    console.log(res.data);
                    if(!res.data.success){
                        this.$message.error(res.data.message);
                    }
                    else{
                        this.parkingList = res.data.message;
                    }
                });
        },

        parking_cancel() {
            this.$router.go(-1);
        },

        parking_btn() {
            this.$refs.parkingForm.validate((valid) => {
                if (valid) {
                    let startTime = this.parkingForm.timeRange[0];
                    let endTime = this.parkingForm.timeRange[1];
                    const touristtoken = window.localStorage.getItem("touristtoken");
                    this.$http({
                            method: "post" /* 指明请求方式，可以是 get 或 post */,
                            url: "/tourist/selectparking" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                            data: qs.stringify({
                            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                                token: touristtoken,
                                starttime: startTime,
                                endtime: endTime,
                                parkingspaceid: this.parkingForm.parkingspaceid,
                            }),
                        })
                        .then((res) => {
                            /* res 是 response 的缩写 */
                            console.log(res.data);
                            if(!res.data.success){
                                this.$message.error(res.data.message);
                            }
                            else{
                                this.$message.success(res.data.message);
                            }
                        });
                }else{
                    ElMessage({
                        type: 'error',
                        message: "请完成填写",
                        duration: 2000,
                    })
                }
            });
        },

        checkParkingOrder(){
            const touristtoken = window.localStorage.getItem("touristtoken");
            this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/tourist/listparkingorder" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                    data: qs.stringify({
                    /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                        token:touristtoken,
                    }),
                })
                .then((res) => {
                    /* res 是 response 的缩写 */
                    console.log(res.data);
                    if(!res.data.success){
                        this.$message.error(res.data.message);
                    }
                    else{
                        this.parkingOrderList = res.data.message;
                    }
                });
        },

        deleteOrder(){
            if(!this.parkingOrderForm.orderid)
            {
                ElMessage({
                        type: 'error',
                        message: "请完成填写",
                        duration: 2000,
                    })
            }
            else
            {
                const touristtoken = window.localStorage.getItem("touristtoken");
                this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/tourist/returnparkingorder" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:touristtoken,
                            orderid: this.parkingOrderForm.orderid,
                        }),
                    })
                    .then((res) => {
                        /* res 是 response 的缩写 */
                        console.log(res.data);
                        if(!res.data.success){
                            this.$message.error(res.data.message);
                        }
                        else{
                            this.$message.success(res.data.message);
                        }
                    });
            }
        },
    }
  }
  
  </script>
  
  <style>
  #app {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -99999;
  }
  
  * {
    margin: 0;
    padding: 0;
  }
  
  
  
  .headerContainer{
  position: fixed;
  top: 0px;
  height: 100px;
  width: 100%;
  border-top: blue solid 2px;
  border-bottom: lightgrey solid 2px;
  background-color: white;
  display: flex;
  z-index: 99999999;
  }
  
  .aside{
  position: fixed;
  top: 110px;
  width: 100%;
  }
  
  .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 1000px;
  }


.parking {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    border: 1px solid black;
    padding: 20px;
    border-radius: 5px;
    background-color: white;
}

h4 {
    text-align: center;
    padding: 5px;
}

.parking_btn {
    width: 40%;
    margin: auto;
}
  
  </style>