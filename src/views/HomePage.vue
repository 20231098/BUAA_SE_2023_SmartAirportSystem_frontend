<template>
    <!-- 打招呼显示 （早午晚） -->
    <div class="greeting">
        <h1 v-if="time == 1">Good Morning</h1>
        <h1 v-else-if="time == 2">Good Afternoon</h1>
        <h1 v-else>Good Evening</h1>
    </div>

    <div class="box">
        <a class="items" v-for="(item, index) in list1" :key="index" onmouseover="this.style.color = 'blue'"
            onmouseout="this.style.color = 'black'" @click="changePage(item)">
            {{ item.name }}
        </a>
    </div>
</template>

<script>
import router from '@/routes/router';

export default {
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
            list1: [
                {name:"首页", index:1},
                {name:"查询", index:2},
                {name:"登录/注册", index:3},
            ],

            boxStyle: {

            },

            time: ret
        }
    },

    methods: {
        changePage(item){
            if(item.index == 3){
                router.push('/login');
            }
        }
    }

}


</script>

<style>
#app {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgb(225, 239, 255);
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
    top: 30px;
}

.items {
    display: inline-block;
    height: 41px;
    text-decoration: none;
    color: #4c4c4c;
    padding: 0 20px;
}

.box {
    height: 45px;
    border-top: 3px solid blue;
    border-bottom: 1px solid grey;
    background-color: white;
    font-size: 15px;
    line-height: 41px;
}
</style>