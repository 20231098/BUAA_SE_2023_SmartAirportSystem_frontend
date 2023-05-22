<template>
  <div class="routers">
    <router-view></router-view>
    <router-link to="/" class="router1">首页</router-link>
    <router-link to="/login" class="router2">登录/注册</router-link>
  </div>
</template>
<script>


</script>

<style>
.routers {
  z-index: 9999;
}

.router1 {
  padding: 10px;
}

.router2 {
  padding: 5px;
}
</style>