<template>
    <title>登录</title>
    <div class="login">
        <h4>用户登录</h4>
        <el-form :model="loginForm" label-width="80px">
            <el-form-item label="邮箱" class="email_input_box">
                <el-input v-model="loginForm.email" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>

            <el-form-item label="密码" class="pass_input_box">
                <el-input show-password v-model="loginForm.pass" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>



            <el-form-item>
                <el-button @click="submit_btn" class="submit" type="primary">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div>

    </div>
</template>



<script>
import { reactive } from 'vue'
// import router from "@/routes/router"

export default {
    name: "LoginPage",

    setup() {
        let loginForm = reactive({
            email: '',
            pass: '',
        });

        //验证
        let submit_btn = () => {
            if (!loginForm.email || !loginForm.pass) {
                window.alert("账号或密码不能为空！")
                return;
            }

            // if (/*登录信息匹配并成功登录*/) {

            //     router.push('/'); //回到主页面
            // }
        };

        return {
            loginForm,
            submit_btn,
        }
    },

}
</script>

<style>
.login {
    width: 450px;
    margin: 180px auto;
    border: 1px solid black;
    padding: 20px;
    border-radius: 5px;
}

h4 {
    text-align: center;
}

.submit_btn {
    width: 100%;
}

.pass_input_box {
    margin: 20px;
}

.email_input_box {
    margin: 20px;
}
</style>

