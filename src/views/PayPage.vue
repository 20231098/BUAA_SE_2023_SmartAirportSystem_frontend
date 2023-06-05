<!-- params: { amount: this.parkingForm.payAmount, method: this.parkingForm.paymentMethod} -->
<template>
    <div class="parking">
        <el-form :model="payForm" status-icon="true">
            <!-- <el-form-item label="卡号"  v-if="payForm.method == '信用卡'" class="register_input_box">
                <el-input placeholder="请输入名称"></el-input>
            </el-form-item>            
            <el-form-item label="密码" v-if="payForm.method == '信用卡'" class="register_input_box">
                <el-input placeholder="请输入名称"></el-input>
            </el-form-item> -->
            <el-form-item align:center>
                <h1>价格：{{payForm.amount}}</h1>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="pay_btn" class="paying_btn">确认</el-button>
        <el-button @click="pay_cancel" class="paying_btn">取消</el-button>
    </div>
</template>
<script>
import { ElMessage } from 'element-plus';

export default {
    data() {
        return {
            payForm: {
                amount: 0,
                method: "",
            },
        };
    },
    methods: {
        pay_cancel() {
            ElMessage({
                type: 'error',
                message: '支付取消',
                duration: 2000,
            });
            this.$router.go(-1);
        },
        pay_btn() {
            ElMessage({
                type: 'success',
                message: '支付成功',
                duration: 2000,
            });
            this.$router.go(-1);
        },
    },
    created(){
        console.log (this.$route.params.amount);
        console.log(this.$route.params.method);
        this.payForm.amount = this.$route.params.amount;
        this.payForm.method = this.$route.params.method;
    },
}
</script>
<style>
.parking {
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

.register_input_box {
    margin: 10px;
    width: 89%;
}

.paying_btn {
    width: 40%;
    margin: auto;
}
</style>