<!-- let response = await axios.get('http://localhost:8001/api/restParking'); -->

<template>
    <title>parking</title>
    <div class="parking" @keyup.enter="keyPressed">
        <h4>车位预定</h4>
        <el-form :model="parkingForm" :rules="parkingRules" ref="parkingForm" label-width="80px" class="parkingFormStyle"
            status-icon="true">

            <el-form-item label="时间段" prop="timeRange">
                <el-date-picker
                    v-model="parkingForm.timeRange"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                ></el-date-picker>
            </el-form-item>

            <el-form-item label="车位" prop="parkingSpot">
                <el-select v-model="parkingForm.parkingSpot" placeholder="请选择">
                    <el-option
                    v-for="(spot, index) in availableSpots"
                    :key="index"
                    :label="'车位' + spot"
                    :value="spot"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="姓名" prop="name">
                <el-input v-model="parkingForm.name"></el-input>
            </el-form-item>
            
            <el-form-item label="电话号码" prop="phone">
                <el-input v-model.number="parkingForm.phone"></el-input>
            </el-form-item>

            <el-form-item label="支付方式" prop="paymentMethod">
                <el-radio-group v-model="parkingForm.paymentMethod">
                    <el-radio label="信用卡">信用卡</el-radio>
                    <el-radio label="微信支付">微信支付</el-radio>
                    <el-radio label="支付宝">支付宝</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
      
        <el-button type="primary" @click="parking_btn" class="parking_btn">确认</el-button>
        <el-button @click="parking_cancel" class="parking_btn">取消</el-button>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus';

export default {
    data() {
        return {
            parkingForm: {
                timeRange: "",
                parkingSpot: "",
                name: "",
                phone: "",
                paymentMethod: "",
                payAmount: 0,
            },
            parkingRules: {
                timeRange: [
                    { required: true, message: "请选择时间段", trigger: "blur" }
                ],
                parkingSpot: [
                    { required: true, message: "请选择车位", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" }
                ],
                phone: [
                    { required: true, message: "请输入电话号码", trigger: "blur" }
                ],
                paymentMethod: [
                    { required: true, message: "请选择支付方式", trigger: "blur" }
                ],
            },
            availableSpots: [1, 2, 5, 6, 7] // 假设这里是从后端获取的该时间段剩余的车位
        };
    },
    methods: {
        parking_cancel() {
            this.$router.go(-1);
        },
        parking_btn() {
            this.$refs.parkingForm.validate((valid) => {
                if (valid) {
                    let startTime = this.parkingForm.timeRange[0];
                    let endTime = this.parkingForm.timeRange[1];
                    let hours = Math.ceil((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));
                    // 每小时5块
                    this.parkingForm.payAmount = hours * 5;
                    console.log(this.parkingForm.payAmount);
                    console.log(this.parkingForm.paymentMethod);
                    this.$router.push({ name:'PayPage', params: { amount: this.parkingForm.payAmount, method: this.parkingForm.paymentMethod} });
                }else{
                    ElMessage({
                        type: 'error',
                        message: "请完成填写",
                        duration: 2000,
                    })
                }
            });
        },
        // created(){
        //     try{
        //         let response = await axios.get('http://localhost:8001/api/restParking');
        //         this.availableSpots = response.data;
        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
    }   
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

h4 {
    text-align: center;
    padding: 5px;
}

.parking_btn {
    width: 40%;
    margin: auto;
}
</style>