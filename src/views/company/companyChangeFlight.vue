<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="headerContainer">
          <img src="@/assets/logo.png" class="logo" fit="contain" />
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside">
          <el-menu class="el-menu-vertical-demo" align="left" unique-opened :collapse="isCollapse" router>
            <el-sub-menu index="/company">
                <template #title>
                  <el-icon><House /></el-icon>
                  <span>首页</span>
                </template>
                <el-menu-item index="/company">返回首页</el-menu-item>
              </el-sub-menu>
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <location />
                </el-icon>
                <span>航班管理</span>
              </template>
              <el-menu-item index="/company/checkflight">查看航班信息</el-menu-item>
              <el-menu-item index="/company/addflight">添加航班信息</el-menu-item>
              <el-menu-item index="/company/changeflight">修改航班信息</el-menu-item>
              <el-menu-item index="/company/deleteflight">删除航班信息</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <document />
                </el-icon>
                <span>机票管理</span>
              </template>
              <el-menu-item index="/company/checkticket">查看机票信息</el-menu-item>
              <el-menu-item index="/company/addticket">添加机票信息</el-menu-item>
              <el-menu-item index="/company/changeticket">修改机票信息</el-menu-item>
              <el-menu-item index="/company/deleteticket">删除机票信息</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
                  <template #title>
                    <el-icon><PieChart /></el-icon>
                    <span>个人中心</span>
                  </template>
                  <el-menu-item index="/company/selfmanage">个人中心</el-menu-item>
                </el-sub-menu>
              <el-sub-menu index="4">
                <template #title>
                    <el-icon><HomeFilled /></el-icon>
                  <span>退出登录</span>
                </template>
                <el-menu-item index="/">退出登录</el-menu-item>
              </el-sub-menu> 
          </el-menu>
        </el-aside>
        <el-main>
          <div class="companylogin" @keyup.enter="keyPressed">
            <h4>修改航班信息</h4>
            <el-form :model="Flightform" label-width="70px">

              <el-form-item label="航班ID" class="login_input_box" prop="FlightID">
                <el-input v-model="Flightform.FlightID" placeholder="请输入航班ID"></el-input>
              </el-form-item>

              <el-form-item label="航班名称" class="login_input_box" prop="Name">
                <el-input v-model="Flightform.Name" placeholder="请输入航班名称"></el-input>
              </el-form-item>

              <el-form-item label="起飞地点" class="login_input_box" prop="takeofflocation">
                <el-input v-model="Flightform.takeofflocation" placeholder="请输入起飞地点"></el-input>
              </el-form-item>

              <el-form-item label="降落地点" class="login_input_box" prop="landinglocation">
                <el-input v-model="Flightform.landinglocation" placeholder="请输入降落地点"></el-input>
              </el-form-item>

              <el-form-item label="起飞时间" class="login_input_box" prop="departuretime">
                <el-date-picker v-model="Flightform.departuretime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="Select date and time"
                  :shortcuts="shortcuts" />
              </el-form-item>

              <el-form-item label="降落时间" class="login_input_box" prop="landingtime">
                <el-date-picker v-model="Flightform.landingtime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="Select date and time"
                  :shortcuts="shortcuts" />
              </el-form-item>

              <el-form-item label="登机口" class="login_input_box" prop="landingtime">
                <el-input v-model="Flightform.departuregate" placeholder="请输入登机口"></el-input>
              </el-form-item>

              <el-form-item label="航站楼" class="login_input_box" prop="departuretime">
                <el-input v-model="Flightform.terminal" placeholder="请输入航站楼"></el-input>
              </el-form-item>

              <div class="button">
                <el-button @click="submit_btn" class="submit_btn" type="primary">修改航班信息</el-button>
                <el-button @click="returnHome" class="returnHome" type="plain">返回首页</el-button>
              </div>
            </el-form>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//import companyChange from '@/components/companyChange.vue';
import router from '@/routes/router';
import { provinceAndCityData, CodeToText } from 'element-china-area-data';
import qs from 'qs';
import { ElMessage } from 'element-plus';

var dest = "";
export default {
  data() {
    var validateName = (rule, value, callback) => {
      const regName = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
      if (regName.test(value)) {
        callback();
      }
      callback(new Error('请输入合法航班编号'));
    };

    return {
      options: provinceAndCityData,
      Flightform: {
        FlightID: "",
        Name: "",
        CompantyId: "",
        takeofflocation: "",
        departuretime: "",
        landinglocation: "",
        landingtime: "",
        departuregate: "",
        terminal: "",
      },
      rules: {
        Name: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' }
        ],
      }

    }
  },

  methods: {
    returnHome() {
      router.push("/company")
    },
    submit_btn() {
      if (!this.Flightform.terminal || !this.Flightform.departuregate || !this.Flightform.validateName || !this.Flightform.FlightID) {
        if (!this.Flightform.validateName) {
          ElMessage({
            type: 'error',
            message: "航班编号不符合标准！",
            duration: 2000,
          })
        }
        else if (!this.Flightform.FlightID) {
          ElMessage({
            type: 'error',
            message: "航班ID不能为空!",
            duration: 2000,
          })
        }
        else {
          ElMessage({
            type: 'error',
            message: "登机口或航站楼不能为空！",
            duration: 2000,
          })
        }
      }
      else {
        const companytoken = window.localStorage.getItem("companytoken");
        this.$http({
          method: "post" /* 指明请求方式，可以是 get 或 post */,
          url: "/company/updateflight" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
          data: qs.stringify({
            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            token: companytoken,
            flightid: this.Flightform.FlightID,
            name: this.Flightform.Name,
            takeofflocation: this.Flightform.takeofflocation,
            landinglocation: this.Flightform.landinglocation,
            departuretime: this.Flightform.departuretime,
            landingtime: this.Flightform.landingtime,
            departuregate: this.Flightform.departgate,
            terminal: this.Flightform.terminal,
          })
        })
            .then((res) => {
              /* res 是 response 的缩写 */
              console.log(res.data);
              if (!res.data.success) {
                this.$message.error(res.data.message);
              }
              else {
                this.$message.success(res.data.message);
                //添加成功后跳转到about页面
                setTimeout(() => { this.$router.push("/company") }, 1000);
              }
            })
      }
    },

    handleChange(value) {
      console.log(value)
      // from = CodeToText[this.selectedOptions[0]] + '/' + CodeToText[this.selectedOptions[1]];
      // console.log(from)//打印区域码所对应的属性值即中文地址

    },

    handleChange2() {
      dest = CodeToText[this.selectedOptions[0]] + '/' + CodeToText[this.selectedOptions[1]];
      console.log(dest)//打印区域码所对应的属性值即中文地址

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


.greeting {
position: absolute;
top: 110px;
margin-left: 200px;
width: 100%;
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

.aside {
  position: fixed;
  top: 110px;
  width: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 1000px;
}

.login {
  position: absolute;
  top: 400px;
  margin-left: 100px;
  width: 50%;
  border: 1px solid black;
  padding: 20px;
  border-radius: 5px;
  background-color: white;
}

.submit_btn {
  width: 40%;
  margin: auto;
}

.returnHome {
  width: 40%;
  margin: auto;
}
</style>