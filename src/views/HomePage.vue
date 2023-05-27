<template>
    <!-- 打招呼显示 （早午晚） -->
    <div class="headerContainer">
        <img src="@/assets/logo.png" class="logo" />
        <pageChange class="pageChange"></pageChange>
    </div>

    <div class="greeting">
        <h1 v-if="time == 1">Good Morning, 早上好！</h1>
        <h1 v-else-if="time == 2">Good Afternoon, 中午好！</h1>
        <h1 v-else>Good Evening, 下午好！</h1>
    </div>
</template>

<script>
import pageChange from '@/components/pageChange.vue';
export default {
    components: { pageChange },
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
            time: ret
        }
    },

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
    margin: 10px;
    padding: 10px;
    position: absolute;
    top: 130px;
}

.logo {
    padding-left: 10px;
    height: 100px;
    width: 250px;
}

.pageChange {
    position:absolute;
    right: 0px;
    top: 31px;
}

.headerContainer{
    height: 100px;
    border-top: blue solid 2px;
    border-bottom: lightgrey solid 2px;
    display: flex;
}
</style>