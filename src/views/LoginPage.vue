<template>
    <title>登录</title>
    <div class="login">
        <h4>用户登录</h4>
        <el-form :model="loginForm" label-width="70px" :rules="loginRules">
            <el-form-item label="邮箱" class="login_input_box" prop="email">
                <el-input v-model="loginForm.email" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>

            <el-form-item label="密码" class="login_input_box" prop="pass">
                <el-input show-password v-model="loginForm.pass" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>

            <div class="button">
                <el-button @click="submit_btn" class="submit_btn" type="primary">登录</el-button>
                <el-button @click="register_btn" class="register_btn" type="plain">注册</el-button>
            </div>
        </el-form>
    </div>
</template>



<script>
import router from "@/routes/router"
import { ElMessage } from "element-plus";

export default {
    name: "LoginPage",
    data() {
        return {
            loginRules: {
                email: [
                    { message: '邮箱地址不能为空', trigger: 'blur' }
                ]
            },

            loginForm: {
                email: '',
                pass: '',
            }
        }
    },

    methods: {
        submit_btn() {
            if (!this.loginForm.email || !this.loginForm.pass) {
                ElMessage({
                    showClose: true,
                    type: 'error',
                    message: "账号或密码不能为空！",
                    duration: 2000,
                })
            }

            // if (/*登录信息匹配并成功登录*/) {
            //     alert("登录成功！");
            //     router.push('/'); //回到主页面
            // }else {
            //     alert(账号或密码不正确！);
            // }
        },

        register_btn() {
            router.push('/register');
        }

    }
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
    background-color: white;
}

h4 {
    text-align: center;
    padding: 5px;
}

.button {
    width: 100%;
    display: flex;
    margin: auto;
}

.submit_btn {
    width: 40%;
    margin: auto;
}

.register_btn {
    width: 40%;
    margin: auto;
}

.login_input_box{
    margin: 10px;
    width: 89%;
}

</style>

