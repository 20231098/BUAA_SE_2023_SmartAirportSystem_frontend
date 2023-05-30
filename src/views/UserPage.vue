<template>
    <div class="window">
        <div class="container">
            <!-- <div class="title">个人中心</div> -->
            <el-tabs tab-position="left" class="tabs">
                <el-tab-pane label="个人中心">
                    <div class="box1">
                        <p class="boxHeader">个人信息设置</p>
                        <div class="boxItem">
                            <div class="subItem">
                                <p class="item">邮箱:</p>
                                <div class="item2">
                                    <p>{{ email }}</p>
                                    <el-button text class="edit" style="color: rgba(255, 255, 255, 0); background-color: rgba(255, 255, 255, 0);">
                                        <p>编辑</p>
                                        <el-icon size="20px">
                                            <Edit />
                                        </el-icon>
                                    </el-button>
                                </div>
                            </div>

                            <div class="subItem">
                                <p class="item">手机:</p>
                                <div class="item2">
                                    <p>{{ phone }}</p>
                                    <el-button text class="edit" style="color: rgba(255, 255, 255, 0); background-color: rgba(255, 255, 255, 0);">
                                        <p>编辑</p>
                                        <el-icon size="20px">
                                            <Edit />
                                        </el-icon>
                                    </el-button>
                                </div>
                            </div>

                            <div class="subItem">
                                <p class="item">用户名:</p>
                                <div class="item2">
                                    <p>{{ userName }}</p>
                                    <el-button text class="edit" style="color: rgba(255, 255, 255, 0); background-color: rgba(255, 255, 255, 0);">
                                        <p class="hoverEdit">编辑</p>
                                        <el-icon size="20px">
                                            <Edit />
                                        </el-icon>
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="我的消息">这是消息</el-tab-pane>
                <el-tab-pane label="订单">这是订单</el-tab-pane>
            </el-tabs>


        </div>
    </div>
</template>


<script>
import { Edit } from '@element-plus/icons';
export default {
    components: {
        Edit
    },

    data() {
        return { //从数据库获取用户数据
            email: "email@gmail.com",
            phone: "12345678",
            userName: "User123",
        }
    }
}
</script>


<style>
.window {
    height: 800px;
    width: 100%;
}

.container {
    position: relative;
    top: 135px;
    bottom: 30px;
    height: 635px;
    width: 850px;
    margin: auto;
    border: solid 1px lightgrey;
    background-color: white;
    box-shadow: 5px 5px 5px 5px rgb(186, 186, 186);
}

.title {
    position: relative;
    left: 0px;
    top: 0px;
}

.tabs {
    position: relative;
    top: 0px;
    height: 100%;
}

.tabs>.el-tabs__content {
    color: black;
}

.tabs .el-tabs__item.is-active {
    color: blue;
}

.tabs .el-tabs__active-bar {
    background-color: blue;
}

.tabs .el-tabs__header {
    background-color: rgb(243, 245, 255);
}

.tabs .el-tabs__item:hover {
    color: blue;
}

.box1 {
    width: 715px;
    margin-top: 20px;
    margin-right: 10px;
    margin-left: 10px;
}

.boxHeader {
    background-color: rgb(243, 245, 255);
    text-align: center;
    padding: 10px;
}

.boxItem {
    border-bottom: solid 1px lightgrey;
    border-top: solid 1px lightgrey;
}

.item {
    height: 30px;
    padding: 15px;
    padding-bottom: 10px;
    margin: 10px;
    margin-left: 100px;
}

.subItem {
    display: flex;
}

.item2 {
    position: absolute;
    left: 200px;
    display: flex;
    align-items: center;
    height: 35px;
    padding-top: 10px;
    margin-top: 7px;
}

.edit {
    display: flex;
}

.edit :hover{
    color: rgb(67, 67, 255);
    background: white !important;
}

</style>