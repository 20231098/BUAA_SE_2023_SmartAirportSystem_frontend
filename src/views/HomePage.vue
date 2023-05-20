<template>
    <!-- 打招呼显示 （早午晚） -->
    <div class="greeting">
        <h1 v-if="time == 1">Good Morning</h1>
        <h1 v-else-if="time == 2">Good Afternoon</h1>
        <h1 v-else>Good Evening</h1>
    </div>
</template>

<script>
export default {
    data() {
        var ret = 1;
        var today = new Date();
        var nowHour = today.getHours();
        if(nowHour >= 0 && nowHour < 12){
                ret = 1;
            }else if(nowHour == 12){
                ret = 2;
            }else{
                ret = 3;
            }
        return {
            time : ret
        }
    }

}


</script>

<style>
.greeting{
    margin: 10px;
    position: absolute;
    top: 30px;
}
</style>