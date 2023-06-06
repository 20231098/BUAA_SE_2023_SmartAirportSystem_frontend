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
                  <el-menu-item index="/admin">返回首页</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="2">
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>停车位管理</span>
                  </template>
                  <el-menu-item index="/admin/parkingManage">停车位管理</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="3">
                  <template #title>
                    <el-icon><document /></el-icon>
                    <span>行李信息管理</span>
                  </template>
                  <el-menu-item index="/admin/luggagemanage">行李管理</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="4">
                  <template #title>
                    <el-icon><Promotion /></el-icon>
                    <span>申请管理</span>
                  </template>
                  <el-menu-item index="/admin/applymanage" v-if="positionpost== 0 || positionpost==2 ">申请管理</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="5">
                  <template #title>
                    <el-icon><PieChart /></el-icon>
                    <span>个人中心</span>
                  </template>
                  <el-menu-item index="/admin/selfmanage">个人中心</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="6">
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
                <el-tab-pane label="添加报修申请" name="first" >
                    <div class="goods"  @keyup.enter="keyPressed">
                            <h4>添加报修申请</h4>
                            <el-form :model="recordForm" label-width="100px" status-icon="true">

                                <el-form-item label="设备名称" class="login_input_box" prop="devicename">
                                    <el-input v-model="recordForm.devicename" placeholder="请输入设备名称"></el-input>
                                </el-form-item>

                                <el-form-item label="设备信息" class="login_input_box" prop="deviceinfo">
                                    <el-input v-model="recordForm.deviceinfo" placeholder="请输入设备信息"></el-input>
                                </el-form-item>

                                <el-form-item label="设备位置" class="login_input_box" prop="location">
                                    <el-input v-model="recordForm.location" placeholder="请输入设备位置"></el-input>
                                </el-form-item>

                                
                                <el-form-item label="设备图片"
                                    :rules="[
                                    {
                                    required: true,
                                    message: '请上传运行效果',
                                    trigger: 'blur',
                                    },
                                    ]"
                                >
                                    <el-upload
                                        :file-list="fileList"
                                        list-type="picture-card"
                                        :auto-upload="false"
                                        :on-change="handleChange"
                                        :on-remove="handleRemove"
                                    >
                                    <el-icon><Plus /></el-icon>
                                    </el-upload>
                                </el-form-item>

                                <div class="button">
                                    <el-button @click="addRecord" class="button" type="primary">添加报修申请</el-button>
                                </div>
                            </el-form>
                        </div>
                </el-tab-pane>
                <el-tab-pane label="查看保修申请" name="second">
                    <span>对于处理意见,0为同意,1为拒绝,2为未处理</span>
                    <el-table :data="recordList" stripe style="width: 100%">
                            <el-table-column prop="recordid" label="报修申请ID" width="120" />
                            <el-table-column prop="devicename" label="设备名称" width="120"/>
                            <el-table-column prop="deviceinfo" label="设备情况" width="120"/>
                            <el-table-column prop="devicepicture" label="设备照片" width="120">
                                <img :src="devicepicture" alt="" />
                            </el-table-column>    
                            <el-table-column prop="location" label="设备位置" width="120"/>
                            <el-table-column prop="approved" label="处理意见" width="120" />
                    </el-table>
                    <div class="button">
                        <el-button @click="checkRecord" class="button" type="primary">查看报修请求</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="审核保修申请" name="third" v-if="positionpost=='0'">
                    <div class="goods"  @keyup.enter="keyPressed">
                            <h4>审核报修申请</h4>
                            <el-form :model="recordForm" label-width="100px" status-icon="true">

                                <el-form-item label="申请id" class="login_input_box" prop="recordid">
                                    <el-input v-model="recordForm.recordid" placeholder="请输入申请ID"></el-input>
                                </el-form-item>

                                <el-form-item label="审核意见" class="login_input_box" prop="deviceinfo">
                                    <el-select v-model="recordForm.approved" class="m-2" placeholder="Select">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
                                    </el-select>
                                </el-form-item>

                                <div class="button">
                                    <el-button @click="solveRecord" class="button" type="primary">审核报修申请</el-button>
                                </div>
                            </el-form>
                        </div>
                </el-tab-pane>
                <el-tab-pane label="查看入驻申请" name="fourth">
                    <el-table :data="requestList" stripe style="width: 100%">
                            <el-table-column prop="requestid" label="入驻申请ID" width="120" />
                            <el-table-column prop="realname" label="商户真实姓名" width="120"/>
                            <el-table-column prop="idnumber" label="商户身份证号" width="120"/>
                            <el-table-column prop="shopname" label="商店名称" width="120"/>
                            <el-table-column prop="email" label="商户邮箱" width="120"/>
                    </el-table>
                    <div class="button">
                        <el-button @click="checkRequest" class="button" type="primary">查看入驻请求</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="审核入驻申请" name="fifth" v-if="positionpost=='0'">
                    <div class="goods"  @keyup.enter="keyPressed">
                            <h4>审核入驻申请</h4>
                            <el-form :model="requestForm" label-width="100px" status-icon="true">

                                <el-form-item label="申请id" class="login_input_box" prop="requestid">
                                    <el-input v-model="requestForm.requestid" placeholder="请输入申请ID"></el-input>
                                </el-form-item>

                                <el-form-item label="审核意见" class="login_input_box" prop="deviceinfo">
                                    <el-select v-model="requestForm.approved" class="m-2" placeholder="Select">
                                        <el-option v-for="item in newoptions" :key="item.value" :label="item.label" :value="item.value"/>
                                    </el-select>
                                </el-form-item>

                                <div class="button">
                                    <el-button @click="solveRequest" class="button" type="primary">审核报修申请</el-button>
                                </div>
                            </el-form>
                        </div>
                </el-tab-pane>
                <el-tab-pane label="删除保修申请" name="sixth">
                    <div class="goods"  @keyup.enter="keyPressed">
                            <h4>删除报修申请</h4>
                            <el-form :model="recordForm" label-width="100px" status-icon="true">

                                <el-form-item label="申请id" class="login_input_box" prop="recordid">
                                    <el-input v-model="recordForm.recordid" placeholder="请输入申请ID"></el-input>
                                </el-form-item>

                                <div class="button">
                                    <el-button @click="deleteRecord" class="button" type="primary">审核报修申请</el-button>
                                </div>
                            </el-form>
                        </div>
                </el-tab-pane>
                <el-tab-pane label="查看财务报表" name="seventh">
                    
                </el-tab-pane>
            </el-tabs>
          </el-main>
        </el-container>  
      </el-container>
    </div>
  </template>
  
  <script>
import { ElMessage } from 'element-plus';
  import qs from 'qs';
  const position = window.localStorage.getItem("positionpost");
  //import companyChange from '@/components/companyChange.vue';
  //import { useStore } from 'vuex';
  export default{
  //
    data() {
    
        return {
            positionpost: position,

            options:[
                {
                    value: 0,
                    label:  "ACCESS",
                },
                {
                    value: 1,
                    label: "DENY",
                },
                {
                    value: 2,
                    label: "UNSOLVED",
                },
            ],

            newoptions:[
                {
                    value: 0,
                    label:  "ACCESS",
                },
                {
                    value: 1,
                    label: "DENY",
                },
            ],

            recordList:[{
                recordid: "",
                location: "",
                devicename: "",
                deviceinfo: "",
                devicepicture: "",
                approved: "",
            }],
            recordForm:{
                recordid: "",
                location: "",
                devicename: "",
                deviceinfo: "",
                devicepicture: "",
            },

            requestList:[{
                requestid:"",
                realname: "",
                idnumber: "",
                shopname: "",
                email: "",
                passwords: "",
            }],

            requestForm:{
                requestid: "",
                approved: "",
            },

        }
    },
    methods:{
        checkRecord(){
                const admintoken = window.localStorage.getItem("admintoken");
                this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/staff/listrepairrecord" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                    data: qs.stringify({
                    /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                        token:admintoken,
                    }),
                })
                .then((res) => {
                    /* res 是 response 的缩写 */
                    console.log(res.data);
                    if(!res.data.success){
                        this.$message.error(res.data.message);
                    }
                    else{
                        this.recordList = res.data.message;
                    }
                });
        },
            

        checkRequest(){
            const admintoken = window.localStorage.getItem("admintoken");
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/staff/listmerchantrequest" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: qs.stringify({
                    /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                        token:admintoken,
                    }),
            })
            .then((res) => {
                /* res 是 response 的缩写 */
                console.log(res.data);
                if(!res.data.success){
                    this.$message.error(res.data.message);
                }
                else{
                    this.requestList = res.data.message;
                }
            });
        },
            

        solveRecord(){
            if(!(!this.recordForm.recordid || !this.recordForm.approved))
            {
                    const admintoken = window.localStorage.getItem("admintoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/staff/examinerepairrecord" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:admintoken,
                            recordid: this.recordForm.recordid,
                            approved: this.recordForm.approved,
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
            else
            {
              ElMessage({
                        type: 'error',
                        message: "请完成输入",
                        duration: 2000,
                    })
            }
        },

        solveRequest(){
            if(this.requestForm.requestid)
            {
                    const admintoken = window.localStorage.getItem("admintoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/staff/examinemerchantrequest" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:admintoken,
                            requestid: this.requestForm.requestid,
                            approved: this.requestForm.approved,
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
            else
            {
              ElMessage({
                        type: 'error',
                        message: "请完成输入",
                        duration: 2000,
                    })
            }
        },

        deleteRecord(){
            if(this.recordForm.recordid)
            {
                    const admintoken = window.localStorage.getItem("admintoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/staff/examinemerchantrequest" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:admintoken,
                            recordid: this.recordForm.recordid,
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
            else
            {
              ElMessage({
                        type: 'error',
                        message: "请完成输入",
                        duration: 2000,
                    })
            }
        },

        addRecord(){
            if(!(!this.recordForm.deviceinfo || !this.recordForm.devicename || !this.recordForm.location))
            {
                    const admintoken = window.localStorage.getItem("admintoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/staff/examinemerchantrequest" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:admintoken,
                            devicename: this.recordForm.devicename,
                            deviceinfo: this.recordForm.deviceinfo,
                            devicepicture: "",
                            location: this.recordForm.location,
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
            else
            {
              ElMessage({
                        type: 'error',
                        message: "请完成输入",
                        duration: 2000,
                    })
            }
        },

        addPicture(){

        }
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
  
  
  .admin {
    margin-left: 200px;
    padding: 10px;
    position: absolute;
    top: 110px;
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
  </style>