<template>
    <title>注册</title>
    <div class="register">
        <h4>注册新账号</h4>
        <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="80px" class="registerFormStyle"
            status-icon="true">
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="registerForm.email" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>

            <el-form-item label="用户类型" prop="uType">
                <el-select v-model="registerForm.uType" placeholder="请选择用户类型">
                    <el-option label="航空公司" value="airline" />
                    <el-option label="管理员" value="admin" />
                    <el-option label="普通用户" value="user" />
                </el-select>
            </el-form-item>

            <el-form-item label="密码" prop="pass">
                <el-input v-model="registerForm.pass" placeholder="请输入密码" type="password" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="checkPass">
                <el-input v-model="registerForm.checkPass" placeholder="请确认密码" type="password"></el-input>
            </el-form-item>

            <el-form-item label="员工号" prop="adminID" v-if="admin">
                <el-input v-model="registerForm.adminID" placeholder="请输入员工号"></el-input>
            </el-form-item>

            <div class="button">
                <el-button @click="register_btn()" class="register_btn" type="primary">注册</el-button>
            </div>
        </el-form>


    </div>
</template>

<script>
import router from '@/routes/router';
import { ElMessage } from 'element-plus';

export default {
    name: "RegisterPage",

    data() {
        var validateEmail = (rule, value, callback) => {
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
            if (regEmail.test(value)) {
                callback();
            }
            callback(new Error('请输入合法邮箱地址'));
        };

        var validatePass = (rule, value, callback) => {
            const regPass = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
            if (regPass.test(value)) {
                callback();
            }
            callback(new Error('密码必须由字母、数字组成，且长度不低于8位'));
        };

        var validatePass2 = (rule, value, callback) => {
            if (value == this.registerForm.pass) {
                callback();
            }
            callback(new Error('两次密码不一致'));
        };

        return {
            admin: false,

            registerForm: {
                email: '',
                pass: '',
                checkPass: '',
                uType: '',
                adminID: ''
            },

            rules: {
                email: [
                    { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
                    { validator: validateEmail, trigger: 'blur' },
                ],

                pass: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { vaildator: validatePass, trigger: 'blur' }
                ],

                checkPass: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur' }
                ],

                uType: [
                    { required: true, message: '用户类型不能为空', trigger: 'blur' }
                ]
            },

        }
    },

    methods: {
        register_btn() {
            this.$refs.registerForm.validate((valid) => {
                if (valid) {
                    router.push('/');
                } else {
                    ElMessage({
                        showClose: true,
                        type: 'error',
                        message: "请完成填写",
                        duration: 2000,
                    })
                }
            })
        }
    },

}
</script>

<style>
.register {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    border: 1px solid black;
    padding: 20px;
    border-radius: 5px;
}
</style>