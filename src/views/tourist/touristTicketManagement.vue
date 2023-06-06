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
                <el-tab-pane label="查询航班信息" name="first">
                    <div class="Ticket"  @keyup.enter="keyPressed">
                        <h4>查询航班信息</h4>
                        <el-form :model="Flightform" label-width="70px">

                            <el-form-item label="起飞地点" class="login_input_box" prop="takeofflocation">
                                <el-cascader placeholder="出发地" size="large" :options="options" v-model="Flightform.takeofflocation"
                                @change="handleChange">
                            </el-cascader>
                            </el-form-item>

                            <el-form-item label="降落地点" class="login_input_box" prop="landinglocation">
                            <el-cascader placeholder="到达地" size="large" :options="options" v-model="Flightform.landinglocation"
                                @change="handleChange">
                            </el-cascader>
                            </el-form-item>

                            <el-form-item label="起飞日期" class="login_input_box" prop="date">
                                <el-date-picker v-model="Flightform.date" type="date" placeholder="Pick a day" :size="size"/>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="touristCheckFlight" class="submit_btn" type="primary">查询航班信息</el-button>
                            </div>
                        </el-form>
                    </div>
                    <el-table :data="FlightList" stripe style="width: 100%">
                        <el-table-column prop="FlightId" label="航班ID" width="120" />
                        <el-table-column prop="Name" label="航班名称" width="120" />
                        <el-table-column prop="CompanyId" label="公司ID" width="120"/>
                        <el-table-column prop="takeofflocation" label="起飞位置" width="120"/>
                        <el-table-column prop="departuretime" label="起飞时间" width="120"/>
                        <el-table-column prop="landinglocation" label="降落位置" width="120"/>
                        <el-table-column prop="landingtime" label="降落时间" width="120"/>
                        <el-table-column prop="departuregate" label="登机口" width="120"/>
                        <el-table-column prop="terminal" label="航站楼" width="120"/>
                    </el-table>           
                </el-tab-pane>
                <el-tab-pane label="查询航班机票" name="second">
                    <div class="Ticket"  @keyup.enter="keyPressed">
                        <h4>查询航班机票</h4>
                        <el-form :model="Flightform" label-width="70px">

                            <el-form-item label="航班ID" class="login_input_box" prop="TouristId">
                                    <el-input v-model="Flightform.FlightId" placeholder="请输入航班ID"></el-input>
                                </el-form-item>

                            <div class="button">
                                <el-button @click="touristCheckFlightTicket" class="submit_btn" type="primary">查询航班信息</el-button>
                            </div>
                        </el-form>
                    </div>
                    <el-table :data="TicketList" stripe style="width: 100%">
                        <el-table-column prop="FlightId" label="航班ID" width="120" />
                        <el-table-column prop="TicketId" label="机票ID" width="120" />
                        <el-table-column prop="price" label="机票价格" width="120"/>
                        <el-table-column prop="type" label="机票类型" width="120"/>
                        <el-table-column prop="amount" label="机票数量" width="120"/>
                    </el-table> 
                </el-tab-pane>
                <el-tab-pane label="购买机票" name="third">
                    <div class="Ticket"  @keyup.enter="keyPressed">
                        <h4>购买航班机票</h4>
                        <el-form :model="TicketFrom" label-width="100px">

                            <el-form-item label="机票ID" class="login_input_box" prop="TouristId">
                                <el-input v-model="TicketFrom.TicketId" placeholder="请输入机票ID"></el-input>
                            </el-form-item>

                            <el-form-item label="实名信息ID" class="login_input_box" prop="TouristId">
                                <el-input v-model="TicketFrom.personid" placeholder="请输入实名信息ID"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="touristBuyTicket" class="submit_btn" type="primary">购买航班机票</el-button>
                            </div>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="列出已购机票" name="fourth">
                    <el-table :data="RecordList" stripe style="width: 100%">
                        <el-table-column prop="orderid" label="订单ID" width="120" />
                        <el-table-column prop="flightname" label="航班名称" width="120" />
                        <el-table-column prop="companyname" label="公司名称" width="120"/>
                        <el-table-column prop="takeofflocation" label="起飞位置" width="120"/>
                        <el-table-column prop="departuretime" label="起飞时间" width="120"/>
                        <el-table-column prop="landinglocation" label="降落位置" width="120"/>
                        <el-table-column prop="landingtime" label="降落时间" width="120"/>
                        <el-table-column prop="departuregate" label="登机口" width="120"/>
                        <el-table-column prop="realname" label="真实姓名" width="120"/>
                        <el-table-column prop="seatinfo" label="座位信息" width="120"/>
                        <el-table-column prop="tickettype" label="机票类型" width="120"/>
                    </el-table> 
                    <div class="button">
                        <el-button @click="touristCheckTicket" class="submit_btn" type="primary">列出已购机票</el-button>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="退票" name="fifth">
                    <div class="Ticket"  @keyup.enter="keyPressed">
                        <h4>退票</h4>
                        <el-form :model="RecordForm" label-width="100px">

                            <el-form-item label="订单ID" class="login_input_box" prop="TouristId">
                                <el-input v-model="RecordForm.orderid" placeholder="请输入订单ID"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="touristCancelTicket" class="submit_btn" type="primary">退票</el-button>
                            </div>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="列出空闲座位" name="sixth">
                    <div class="Ticket"  @keyup.enter="keyPressed">
                        <h4>列出空闲座位</h4>
                        <el-form :model="RecordForm" label-width="100px">

                            <el-form-item label="订单ID" class="login_input_box" prop="TouristId">
                                <el-input v-model="RecordForm.orderid" placeholder="请输入订单ID"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="touristCheckSeat" class="submit_btn" type="primary">列出空闲座位</el-button>
                            </div>
                        </el-form>
                    </div>
                    <el-table :data="SeatList" style="width: 100%" :row-class-name="tableRowClassName">
                        <el-table-column prop="seatid" label="座位ID" width="120" />
                    </el-table> 
                </el-tab-pane>
                <el-tab-pane label="选择机票座位" name="seventh">
                    <div class="Ticket"  @keyup.enter="keyPressed">
                        <h4>选择机票座位</h4>
                        <el-form :model="SeatForm" label-width="100px">

                            <el-form-item label="订单ID" class="login_input_box" prop="TouristId">
                                <el-input v-model="SeatForm.orderid" placeholder="请输入订单ID"></el-input>
                            </el-form-item>

                            <el-form-item label="座位ID" class="login_input_box" prop="TouristId">
                                <el-input v-model="SeatForm.seatid" placeholder="请输入座位ID"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="touristChooseSeat" class="submit_btn" type="primary">选择机票座位</el-button>
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
            FlightList:[
            {
                FlightId: "",
                Name: "",
                CompantyId: "",
                takeofflocation: "",
                departuretime: "",
                landinglocation: "",
                landingtime: "",
                departuregate: "",
                terminal: "",
            }],

            Flightform:{
                FlightId: "",
                Name: "",
                CompantyId: "",
                takeofflocation: "",
                departuretime: "",
                landinglocation: "",
                landingtime: "",
                departuregate: "",
                terminal: "",
                date:"",
            },

            TicketList:[{
                TicketId : "",
                FlightId : "",
                Type  : "",
                Price : "",
                Amount : "",
            }],

            TicketFrom:{
                TicketId : "",
                FlightId : "",
                Type  : "",
                Price : "",
                Amount : "",
                personid: "",
            },

            RecordList:[{
                orderid: "1",
                companyname: "1",
                flightname: "1",
                takeofflocation: "1",
                landinglocation: "1",
                departuretime: "1",
                landingtime: "1",
                departuregate: "1",
                terminal: "1",
                realname: "1",
                seatinfo: "1",
                tickettype: "1",
            }],

            RecordForm:{
                orderid: "",
                companyname: "",
                flightname: "",
                takeofflocation: "",
                landinglocation: "",
                departuretime: "",
                landingtime: "",
                departuregate: "",
                terminal: "",
                realname: "",
                seatinfo: "",
                tickettype: "",
            },

            SeatList:[{
                seatid: "",
                occupied: "",
                //0:未被占用,1:被占用,2:自己的
            }
        ],

            SeatForm:{
                orderid: "",
                seatid: "",
                occupied: "",
                //0:未被占用,1:被占用,2:自己的
            },

        }

    },
    
    methods:{
        touristCheckFlight(){
            const touristtoken = window.localStorage.getItem("touristtoken");
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/tourist/searchflight" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: qs.stringify({
                /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                    token:touristtoken,
                    takeofflocation: this.Flightform.takeofflocation,
                    landinglocation: this.Flightform.landinglocation,
                    date: this.Flightform.date,
                }),
            })
            .then((res) => {
                /* res 是 response 的缩写 */
                console.log(res.data);
                if(!res.data.success){
                    this.$message.error(res.data.message);
                }
                else{
                    this.FlightList = res.data.message;
                }
            });
        },

        touristCheckFlightTicket(){
            if(!this.Flightform.FlightId)
            {
                ElMessage({
                        type: 'error',
                        message: "航班ID不能为空",
                        duration: 2000,
                    })
            }
            else
            {
                const touristtoken = window.localStorage.getItem("touristtoken");
                this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/tourist/listticket" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                    data: qs.stringify({
                    /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                        token:touristtoken,
                        flightid: this.Flightform.FlightId
                    }),
                })
                .then((res) => {
                    /* res 是 response 的缩写 */
                    console.log(res.data);
                    if(!res.data.success){
                        this.$message.error(res.data.message);
                    }
                    else{
                        this.TicketList = res.data.message;
                    }
                }); 
            }
        },

        touristBuyTicket(){
            if(!this.TicketFrom.TicketId || !this.TicketFrom.personid)
            {
                ElMessage({
                        type: 'error',
                        message: "机票ID或实名信息ID不能为空",
                        duration: 2000,
                    })
            }
            else
            {
                const touristtoken = window.localStorage.getItem("touristtoken");
                this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/tourist/purchaseflight" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                    data: qs.stringify({
                    /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                        token:touristtoken,
                        ticketid: this.TicketFrom.TicketId,
                        personid: this.TicketFrom.personid,
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

        touristCheckTicket(){
            const touristtoken = window.localStorage.getItem("touristtoken");
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/tourist/listpurchase" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
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
                    this.RecordList = res.data.message;
                }
            }); 
        },

        touristCancelTicket(){
            if(!this.RecordForm.orderid)
            {
                ElMessage({
                        type: 'error',
                        message: "订单ID不能为空",
                        duration: 2000,
                    })
            }
            else
            {
                const touristtoken = window.localStorage.getItem("touristtoken");
                this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/tourist/returnpurchase" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                    data: qs.stringify({
                    /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                        token:touristtoken,
                        orderid: this.RecordForm.orderid,
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

        touristCheckSeat(){
            if(!this.RecordForm.orderid)
            {
                ElMessage({
                        type: 'error',
                        message: "订单ID不能为空",
                        duration: 2000,
                    })
            }
            else
            {
                const touristtoken = window.localStorage.getItem("touristtoken");
                this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/tourist/returnpurchase" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                    data: qs.stringify({
                    /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                        token:touristtoken,
                        orderid: this.RecordForm.orderid,
                    }),
                })
                .then((res) => {
                    /* res 是 response 的缩写 */
                    console.log(res.data);
                    if(!res.data.success){
                        this.$message.error(res.data.message);
                    }
                    else{
                        this.$message.success("绿色为座位空闲，米色为自己已买的座位");
                        this.SeatList = res.data.message;
                    }
                }); 
            }
        },

        tableRowClassName({row}) {
            if(row.occupied == "0")
            {
                
                return "warning-row";
            }
            else if(row.occupied == "1")
            {
                return "";
            }
            else
            {
                return "success-row";
            }
        },

        touristChooseSeat(){
            if(!this.SeatForm.orderid || !this.SeatForm.seatid)
            {
                ElMessage({
                        type: 'error',
                        message: "订单ID或座位ID不能为空",
                        duration: 2000,
                    })
            }
            else
            {
                const touristtoken = window.localStorage.getItem("touristtoken");
                this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/tourist/selectseat" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                    data: qs.stringify({
                    /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                        token:touristtoken,
                        orderid: this.SeatForm.orderid,
                        seatid: this.SeatForm.seatid,
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

  .card{
    top: 200px;
    margin: auto;
    margin-top: 50px;
    margin-left: 200px;
    height: 100%;
    min-height: max-content;
    width: 70%;
    border-color: black;
}

.el-table .warning-row {
  background-color: aquamarine;
}
.el-table .success-row {
  background-color: bisque;
}
  </style>