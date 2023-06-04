<template>
    <el-container>
        <el-header>
            <div class="headerContainer">
                <img src="@/assets/logo.png" class="logo" />
                <pageChange class="pageChange"></pageChange>
            </div>
        </el-header>
        <el-main>
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
                            <el-date-picker v-model="dateValue1" type="date" placeholder="出发日期"
                                :disabled-date="setDisableDate" size="large" style="width: 370px;" @change="dateChange" />
                        </div>

                        <div class="date" v-if="radio == 2">
                            <el-date-picker v-model="dateValue2" type="daterange" start-placeholder="出发日期"
                                end-placeholder="返回日期" :disabled-date="setDisableDate" size="large" />
                        </div>
                    </div>
                </div>

                <div class="button">
                    <el-button @click="search_btn" class="search_btn" type="primary">查询</el-button>
                </div>
            </div>

            <div v-if="showFlight">
                <div v-if="radio == 2" class="tabs_container">
                    <el-tabs v-model="activeName" type="border-card" class="tabs">
                        <el-tab-pane name="go" label="选择去程" class="tab_label">
                            <div v-if="hasGoFlight">
                                <div v-for="flight in flightListGo" :key="flight.id" class="ticket">
                                    <div class="itemBox">
                                        <div class="subItemBox">
                                            <p class="companyName">{{ flight.companyName }}</p>
                                            <p class="flightName">{{ flight.flightName }}</p>
                                        </div>

                                        <div class="subItemBox2">
                                            <div class="sub_subItemBox">
                                                <p class="departureTime">{{ flight.departureTime }}</p>
                                                <p class="departureLocation">{{ flight.departureLocation }}</p>
                                            </div>

                                            <div class="sub_subItemBox">
                                                <img src="@/assets/flights.png"
                                                    style="height: 25px; width: 25px; margin: 20px;" />
                                            </div>

                                            <div class="sub_subItemBox">
                                                <p class="landingTime">{{ flight.landingTime }}</p>
                                                <p class="landingLocation">{{ flight.landingLocation }}</p>
                                            </div>
                                        </div>

                                        <div class="totalTime">{{ flight.totalTime }}</div>

                                        <div class="priceBox">
                                            <p style="font-size: 15px; margin: 5px; color: rgb(255, 149, 20);">￥</p>
                                            <p class="price">{{ flight.price }}</p>
                                            <p style="font-size: 10px; margin: 5px;">起</p>
                                        </div>


                                        <el-button class="confirm_btn" @click="chooseGo(flight.id)">选择去程</el-button>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <el-empty description="没有相关机票" :image="plane" />
                            </div>
                        </el-tab-pane>

                        <el-tab-pane name="back" label="选择返程" class="tab_label" :disabled="disabled">
                            <div v-if="hasBackFlight">
                                <div v-for="flight in flightListBack" :key="flight.id" class="ticket">
                                    <div class="itemBox">
                                        <div class="subItemBox">
                                            <p class="companyName">{{ flight.companyName }}</p>
                                            <p class="flightName">{{ flight.flightName }}</p>
                                        </div>

                                        <div class="subItemBox2">
                                            <div class="sub_subItemBox">
                                                <p class="departureTime">{{ flight.departureTime }}</p>
                                                <p class="departureLocation">{{ flight.departureLocation }}</p>
                                            </div>

                                            <div class="sub_subItemBox">
                                                <img src="@/assets/flights.png"
                                                    style="height: 25px; width: 25px; margin: 20px;" />
                                            </div>

                                            <div class="sub_subItemBox">
                                                <p class="landingTime">{{ flight.landingTime }}</p>
                                                <p class="landingLocation">{{ flight.landingLocation }}</p>
                                            </div>
                                        </div>

                                        <div class="totalTime">{{ flight.totalTime }}</div>

                                        <div class="priceBox">
                                            <p style="font-size: 15px; margin: 5px; color: rgb(255, 149, 20);">￥</p>
                                            <p class="price">{{ flight.price }}</p>
                                            <p style="font-size: 10px; margin: 5px;">起</p>
                                        </div>


                                        <el-button class="confirm_btn" @click="orderTicket(flight.id)">选择机票</el-button>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <el-empty description="没有相关机票" :image="plane" />
                            </div>


                        </el-tab-pane>
                    </el-tabs>
                </div>

                <div v-if="radio == 1">
                    <el-tabs v-model="activeName" type="border-card" class="tabs">
                        <el-tab-pane name="go" label="选择机票" class="tab_label">
                            <div v-if="hasGoFlight">
                                <div v-for="flight in flightListGo" :key="flight.id" class="ticket">
                                    <div class="itemBox">
                                        <div class="subItemBox">
                                            <p class="companyName">{{ flight.companyName }}</p>
                                            <p class="flightName">{{ flight.flightName }}</p>
                                        </div>

                                        <div class="subItemBox2">
                                            <div class="sub_subItemBox">
                                                <p class="departureTime">{{ flight.departureTime }}</p>
                                                <p class="departureLocation">{{ flight.departureLocation }}</p>
                                            </div>

                                            <div class="sub_subItemBox">
                                                <img src="@/assets/flights.png"
                                                    style="height: 25px; width: 25px; margin: 20px;" />
                                            </div>

                                            <div class="sub_subItemBox">
                                                <p class="landingTime">{{ flight.landingTime }}</p>
                                                <p class="landingLocation">{{ flight.landingLocation }}</p>
                                            </div>
                                        </div>

                                        <div class="totalTime">{{ flight.totalTime }}</div>

                                        <div class="priceBox">
                                            <p style="font-size: 15px; margin: 5px; color: rgb(255, 149, 20);">￥</p>
                                            <p class="price">{{ flight.price }}</p>
                                            <p style="font-size: 10px; margin: 5px;">起</p>
                                        </div>


                                        <el-button class="confirm_btn" @click="orderTicket(flight.id)">选择机票</el-button>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <el-empty description="没有相关机票" :image="plane" />
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>


            </div>
        </el-main>
    </el-container>
</template>

<script>
import pageChange from '@/components/pageChange.vue';
import { provinceAndCityData, codeToText } from 'element-china-area-data';
import router from "@/routes/router";

var from = "";
var dest = "";
var dateStart = "";
var dateEnd = "";
var goFlightId = "";

export default {
    components: {
        pageChange,
    },

    data() {
        return {
            activeName: 'go',
            disabled: true,
            plane: require('../assets/plane.png'),
            options: provinceAndCityData,
            selectedOptions: ['11', '110101'],
            selectedOptions2: ['11', '110101'],
            dateValue1: new Date(),
            dateValue2: [new Date(), new Date()],
            radio: 1,
            adult: 1,
            child: 0,
            infant: 0,
            hasGoFlight: false,
            hasBackFlight: false,
            showFlight: false,
            flightListGo: [],
            flightListBack: [],
        }
    },

    methods: {
        setDisableDate(v) {
            return v.getTime() < new Date().getTime() - 86400000;
        },

        handleChange(value) {
            console.log(value)
            from = codeToText[this.selectedOptions[0]] + '/' + codeToText[this.selectedOptions[1]];
            console.log("from=" + from)//打印区域码所对应的属性值即中文地址
        },

        handleChange2() {
            dest = codeToText[this.selectedOptions2[0]] + '/' + codeToText[this.selectedOptions2[1]];
            console.log("dest=" + dest)//打印区域码所对应的属性值即中文地址

        },

        search_btn() {
            this.flightListBack.length = 0;
            this.flightListGo.length = 0;
            var month1 = "";
            var month2 = "";
            // var totalTime = "";
            if (this.radio == 2) {
                this.dateValue1 = this.dateValue2[0];

                dateStart = this.dateValue2[0];
                month1 = dateStart.getMonth() + 1;
                dateStart = dateStart.getFullYear() + '/' + month1 + '/' + dateStart.getDate();

                dateEnd = this.dateValue2[1];
                month2 = dateEnd.getMonth() + 1;
                dateEnd = dateEnd.getFullYear() + '/' + month2 + '/' + dateEnd.getDate();

                console.log(dateStart, dateEnd);

                /*查询数据库获取和from - dest（地区）和 dateStart - dateEnd（日期）内的机票

                */

                this.showFlight = true; //显示机票列表

                // if(/*数据库成功查找去程*/){
                //     this.hasGoFlight = true;
                //查找所有机票
                //去程
                // while(数据库有相关机票){
                //     totalTime = landingTime - departureTime;
                //     this.flightListGo.push({ id:"", companyName: "", departureTime: "", landingTime: "", departureLocation: "", landingLocation: "", totalTime: totalTime, price: "" });
                // }else{
                //     this.hasGoFlight = false;
                // }


                // if(/*数据库成功查找返程*/){
                //     this.hasBackFlight = true;
                //返程
                // while(数据库有相关机票){
                //     totalTime = landingTime - departureTime;
                //     this.flightListBack.push({ id:"", companyName: "", departureTime: "", landingTime: "", departureLocation: "", landingLocation: "", totalTime: totalTime, price: "" });
                // }
                // }else{
                //     this.hasBackFlight = false;
                // }

                //测试用
                this.hasGoFlight = true;
                this.flightListGo.push({ id: "1", companyName: "厦门航空", flightName: "MF78", departureTime: "13:00", landingTime: "15:30", departureLocation: "北京", landingLocation: "河南", totalTime: "2小时30分钟", price: "2000" });
                this.flightListGo.push({ id: "2", companyName: "中国南方航空", flightName: "C109", departureTime: "14:00", landingTime: "16:00", departureLocation: "北京", landingLocation: "河南", totalTime: "2h", price: "2000" });
                this.hasBackFlight = true;
                this.flightListBack.push({ id: "1", companyName: "中国南方航空", flightName: "C109", departureTime: "13:00", landingTime: "15:00", departureLocation: "河南", landingLocation: "北京", totalTime: "2h", price: "2000" });




            } else {
                this.dateValue2[0] = this.dateValue1;
                this.dateValue2[1] = this.dateValue1;

                dateStart = this.dateValue1;
                month1 = dateStart.getMonth() + 1;
                dateStart = dateStart.getFullYear() + '/' + month1 + '/' + dateStart.getDate();
                console.log(dateStart);
                /*查询dateStart和lfrom机票


                */

                this.showFlight = true; //显示机票列表

                // if(/*数据库成功查找*/){
                //     this.hasGoFlight = true;
                // while(数据库有相关机票){
                //     totalTime = landingTime - departureTime;
                //     this.flightListGo.push({ id:"", companyName: "", departureTime: "", landingTime: "", departureLocation: "", landingLocation: "", totalTime: totalTime, price: "" });
                //      id为flighId
                // }
                //
                // }else{
                //     this.hasGoFlight = false;
                // }

                //测试用
                this.hasGoFlight = true;
                this.flightListGo.push({ id: "1", companyName: "厦门航空", flightName: "MF78", departureTime: "13:00", landingTime: "15:30", departureLocation: "北京", landingLocation: "河南", totalTime: "2小时30分钟", price: "2000" });
                this.flightListGo.push({ id: "2", companyName: "中国南方航空", flightName: "C109", departureTime: "14:00", landingTime: "16:00", departureLocation: "北京", landingLocation: "河南", totalTime: "2h", price: "2000" });
            }
        },

        chooseGo(id) { //获取去程机票
            if (this.disabled) {
                this.disabled = false;
            }

            if (this.flightListBack.length == 0) { //若返程机票列表为空，则需加载
                // if(有返程机票){
                // this.hasBackFlight = true;
                // while(数据库有相关机票){
                //     totalTime = landingTime - departureTime;
                //     this.flightListBack.push({ id:"", companyName: "", departureTime: "", landingTime: "", departureLocation: "", landingLocation: "", totalTime: totalTime, price: "" });
                // }
                // }else{
                //     this.hasBackFlight = false;
                // }

                //测试用
                this.hasBackFlight = true;
                this.flightListBack.push({ id: "1", companyName: "中国南方航空", flightName: "C109", departureTime: "13:00", landingTime: "15:00", departureLocation: "河南", landingLocation: "北京", totalTime: "2h", price: "2000" });
            }
            goFlightId = id;
            console.log(goFlightId);
        },

        orderTicket(id) { //获取返程/单程机票，并提交到购买页面  
            if (this.radio == 2) {
                var backFlightId = id;
                console.log(backFlightId);

                router.push({
                    path: '/buyTicket',
                    query: {
                        goId: goFlightId,
                        backId: id,
                    }
                })

            } else {
                router.push({
                    path: '/buyTicket',
                    query: {
                        goId: id,
                        backId: null,
                    }
                })
            }
        }

    },

}
</script>

<style>
.search_title {
    text-align: center;
    font-weight: 700;
    font-size: 25px;
    margin-bottom: 25px;
}

.location_container {
    position: relative;
    border: 1px solid rgba(218, 218, 218, 0.615);
    border-radius: 15px;
    margin: auto;
    width: 98%;
}


.location {
    position: relative;
    margin: auto;
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

}

.dest {
    margin: 20px;
}

.radio {
    margin-top: 20px;
    margin-left: 50px;
}

.date {
    margin: 20px;
}

.passanger {
    margin: 20px;
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
    margin: auto;
    width: 80%;
    margin-top: 50px;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 5px 1px 10px 3px rgb(186, 186, 186);
    background-color: rgb(243, 245, 255);
}

.tabs {
    border-radius: 20px;
    width: 88%;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 20px;
}

.el-tabs__header {
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
}

.ticket {
    border: 1px solid lightgrey;
    border-radius: 10px;
    margin: 10px;
}

.companyName {
    font-size: 15px;
}

.flightName {
    font-size: 13px;
    color: rgb(0, 81, 255);
}

.departureTime {
    font-size: 30px;
    margin: 10px;
}

.landingTime {
    font-size: 30px;
    margin: 10px;
}

.departureLocation {
    font-size: 14px;
}

.landingLocation {
    font-size: 14px;
}

.totalTime {
    font-size: 15px;
    margin: auto;
    width: 100px;
}

.price {
    font-size: 25px;
    margin: auto;
    color: rgb(255, 149, 20);
}

.itemBox {
    display: flex;
    width: 100%;
    margin: auto;
    padding: 15px;
}

.subItemBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-left: 0px;
    margin-top: auto;
    margin-bottom: auto;
    width: 200px;
}

.subItemBox2 {
    display: flex;
    margin: auto;
}

.sub_subItemBox {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.confirm_btn {
    margin: auto;
    margin-right: 30px;
}

.priceBox {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>