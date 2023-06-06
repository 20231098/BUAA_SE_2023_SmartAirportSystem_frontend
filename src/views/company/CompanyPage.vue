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
              <el-sub-menu index="/company">
                <template #title>
                  <el-icon><House /></el-icon>
                  <span>首页</span>
                </template>
                <el-menu-item index="/company">返回首页</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>航班管理</span>
                </template>
                <el-menu-item index="/company/checkflight">查看航班信息</el-menu-item>
                <el-menu-item index="/company/addflight">添加航班信息</el-menu-item>
                <el-menu-item index="/company/changeflight">修改航班信息</el-menu-item>
                <el-menu-item index="/company/deleteflight">删除航班信息</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><document /></el-icon>
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
            <div class="company">
              <h1 v-if="time == 1">Good Morning, 早上好！</h1>
              <h1 v-else-if="time == 2">Good Afternoon, 中午好！</h1>
              <h1 v-else>Good Evening, 下午好！</h1>
            </div>
          </el-main>
        </el-container>  
      </el-container>
    </div>
  </template>

<script>
//import companyChange from '@/components/companyChange.vue';
//import { useStore } from 'vuex';
export default{
  //
    data() {
        var ret = 1;
        var today = new Date();
        var nowHour = today.getHours();
        if (nowHour >= 0 && nowHour < 12) {
            ret = 1;
        } else if (nowHour == 12) {
            ret = 2;
        } else {
            ret = 3;
        }

        return {
            time: ret,
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


.company {
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