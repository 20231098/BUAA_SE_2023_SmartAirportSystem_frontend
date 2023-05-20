<template>
    <title>登录</title>
    <div class="login">
        <h4>用户登录</h4>
        <el-form :model="loginForm" label-width="80px">
            <el-form-item label="邮箱" class="email_input_box" prop="email">
                <el-input v-model="loginForm.email" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>

            <el-form-item label="密码" class="pass_input_box" prop="pass">
                <el-input show-password v-model="loginForm.pass" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>

            <div class="button">
                <el-button @click="submit_btn" class="submit" type="primary">登录</el-button>
                <el-button @click="register_btn" class="register" type="plain">注册</el-button>
            </div>
        </el-form>
    </div>
</template>



<script>
import { reactive } from 'vue'
import router from "@/routes/router"

export default {
    name: "LoginPage",

    setup() {
        let loginForm = reactive({
            email: '',
            pass: '',
        });

        // let accountAll = [{
        //     //获取数据库数据
        // }]

        //登录验证
        let submit_btn = () => {
            if (!loginForm.email || !loginForm.pass) {
                alert("账号或密码不能为空！");
                return;
            }


            // if (/*登录信息匹配并成功登录*/) {
            //     alert("登录成功！");
            //     router.push('/'); //回到主页面
            // }else {
            //     alert(账号或密码不正确！);
            // }
        };

        let register_btn = () => {
            router.push('/register');
        }
        return {
            loginForm,
            submit_btn,
            register_btn,
        }
    },

}
</script>

<style>
.login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    border: 1px solid black;
    padding: 20px;
    border-radius: 5px;
}

h4 {
    text-align: center;
}

.button {
    width: 100%;
    display: inline-flex;
    margin: auto;
}

.submit {
    width: 40%;
    margin: auto;
}

.register {
    width: 40%;
    margin: auto;
}

.pass_input_box {
    margin: 20px;
}

.email_input_box {
    margin: 20px;
}
</style>

