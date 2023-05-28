<template>
  <div class="routers" ref="action">
    <router-view></router-view>
  </div>

  <div class="headerContainer">
    <img src="@/assets/logo.png" class="logo" />
    <pageChange class="pageChange"></pageChange>
  </div>

</template>

<script>
import pageChange from './components/pageChange.vue';
export default{
  components: { pageChange },
}
</script>

<style>
html {
  overflow: auto;
}

.logo {
    padding-left: 10px;
    height: 100px;
    width: 250px;
    /* margin: auto; */
}

.pageChange {
    position:absolute;
    right: 0px;
    top: 31px;
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
</style>