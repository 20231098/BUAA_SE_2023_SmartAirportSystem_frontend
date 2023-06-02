<template>
    <div class="search_box">
        <h1 class="search_title">机票查询</h1>

        <div class="location_container">
            <div class="radio">
                <el-radio-group v-model="radio">
                    <el-radio :label="1">单程</el-radio>
                    <el-radio :label="2">往返</el-radio>
                </el-radio-group>
            </div>

            <div class="location">
                <div class="dest">
                    <el-cascader placeholder="出发地" size="large" :options="options" v-model="selectedOptions"
                        @change="handleChange">
                    </el-cascader>
                </div>

                <div class="dest">
                    <el-cascader placeholder="目的地" size="large" :options="options" v-model="selectedOptions2"
                        @change="handleChange2">
                    </el-cascader>
                </div>

                <div class="date" v-if="radio == 1">
                    <el-date-picker v-model="dateValue1" type="date" placeholder="出发日期" :disabled-date="setDisableDate"
                        size="large" style="width: 370px;" />
                </div>

                <div class="date" v-if="radio == 2">
                    <el-date-picker v-model="dateValue2" type="daterange" start-placeholder="出发日期" end-placeholder="返回日期"
                        :disabled-date="setDisableDate" size="large" />
                </div>

                <div class="input_num">
                    <p>乘客数量</p>
                    <a class="sub_box">
                        <p>成人</p>
                        <el-input-number placeholder="成人" label="成人" class="sub_input_num" v-model="adult" :min="0"
                            @change="adult_num" size="small" />
                    </a>

                    <a class="sub_box">
                        <p>儿童</p>
                        <el-input-number class="sub_input_num" v-model="child" :min="0" @change="child_num" size="small" />
                    </a>

                    <a class="sub_box">
                        <p>婴儿</p>
                        <el-input-number class="sub_input_num" v-model="infant" :min="0" @change="infant_num"
                            size="small" />
                    </a>
                </div>
            </div>
        </div>



        <div class="button">
            <el-button @click="search_btn" class="search_btn" type="primary">查询</el-button>
        </div>
    </div>
</template>

<script>
import router from '@/routes/router';
import { provinceAndCityData, CodeToText } from 'element-china-area-data'
// var from = "";
var dest = "";
var dateStart = "";
var dateEnd = "";

export default {
    data() {

        return {
            options: provinceAndCityData,
            selectedOptions: ['110000', '110100'],
            selectedOptions2: ['110000', '110100'],
            dateValue1: new Date(),
            dateValue2: [new Date(), new Date()],
            radio: 1,
            adult: 1,
            child: 0,
            infant: 0,
        }
    },

    methods: {
        setDisableDate(v) {
            return v.getTime() < new Date().getTime() - 86400000;
        },

        handleChange(value) {
            console.log(value)
            // from = CodeToText[this.selectedOptions[0]] + '/' + CodeToText[this.selectedOptions[1]];
            // console.log(from)//打印区域码所对应的属性值即中文地址

        },

        handleChange2() {
            dest = CodeToText[this.selectedOptions[0]] + '/' + CodeToText[this.selectedOptions[1]];
            console.log(dest)//打印区域码所对应的属性值即中文地址

        },

        search_btn() {
            if (this.radio == 2) {
                dateStart = this.dateValue2[0];
                var month1 = dateStart.getMonth() + 1;
                dateStart = dateStart.getFullYear() + '/' + month1 + '/' + dateStart.getDate();

                dateEnd = this.dateValue2[1];
                var month2 = dateEnd.getMonth() + 1;
                dateEnd = dateEnd.getFullYear() + '/' + month2 + '/' + dateEnd.getDate();

                console.log(dateStart, dateEnd);

                //查询数据库获取和from - dest（地区）和 dateStart - dateEnd（日期）内的机票

                router.push('/ticketList');
            } else {
                //查询dateValue1和loc机票
                router.push('/ticketList');
            }

        },

        adult_num(value) {
            console.log("adult:" + value)
        },

        child_num(value) {
            console.log("child:" + value)
        },

        infant_num(value) {
            console.log("infant:" + value)
        },
    },

}


</script>

<style>
.search_title {
    text-align: center;
    font-weight: 700;
    padding-top: 10px;
    padding-bottom: 10px;
}

.location_container {
    border: 1px solid rgba(218, 218, 218, 0.615);
    border-radius: 15px;
    margin: auto;
    width: 98%;
}


.location {
    position: relative;
    height: 150px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

}

.dest {
    margin: 10px;
}

.radio {
    margin-top: 10px;
    margin-left: 50px;
    padding-left: 12px;
}

.input_num {
    display: flex;
    flex-flow: column;
    margin: 15px;
    text-align: center;
    color: rgb(165, 165, 165);
    font-size: 15px;
}

.sub_input_num {
    margin: 5px;

}

.sub_box {
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.date {
    margin: 10px;
}

.passanger {
    margin: 10px;
}

.button {
    margin-top: 35px;
    justify-content: center;
    align-items: center;
}

.search_btn {
    width: 20%;
}

.search_box {
    position: relative;
    top: 150px;
    margin: auto;
    width: 1200px;
    height: 350px;
    border-radius: 20px;
    box-shadow: 5px 1px 10px 3px rgb(186, 186, 186);
    background-color: rgb(243, 245, 255);
}

.text {
    width: 10px;
}
</style>