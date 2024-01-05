<template>
    <div class="main">
        <el-button round :icon="User" @click="$router.push('Login')">登入</el-button>
        <div class="top">
            <div class="searchArea">
                <div class="searchArea-top">
                    <label for="">問卷名稱：</label>
                    <input v-model="searchInput">
                </div>
                <div class="searchArea-bottom">
                    <label for="">統計時間：</label>
                    <input type="date" name="" id="" v-model="searchStartDate">
                    <label for="">　到　</label>
                    <input type="date" name="" id="" v-model="searchEndDate">
                    <el-button type="primary" round :icon="Search" @click="search()">查詢</el-button>
                </div>
            </div>
        </div>
        <div class="middle">
            <div class="sheetArea">
                <!-- <el-table :data="tableData" stripe border style="width: 100%">
                    <el-table-column prop="1" label="編號" width="180" />
                    <el-table-column prop="2" label="名稱" width="180" />
                    <el-table-column prop="3" label="狀態" width="180"/>
                    <el-table-column prop="4" label="開始時間" width="180" />
                    <el-table-column prop="5" label="結束時間" width="180"/>
                    <el-table-column prop="6" label="結果" width="180"/>
                </el-table> -->
                <table class="searchDataTabel">
                    <tr class="searchDataTr">
                        <td id="test" class="numberTd">編號</td>
                        <td class="nameTd">名稱</td>
                        <td class="statusTd">狀態</td>
                        <td class="stardDateTd">開始時間</td>
                        <td class="endDateTd">結束時間</td>
                        <td class="resultTd">結果</td>
                    </tr>
                    <tr class="searchDataTr" v-for="item in searchData.slice(pageStart, pageEnd)">
                        <td class="numberTd">#{{ item.num }}</td>
                        <td class="nameTd" v-if="dateCompare_inProgress(item.startDate, item.endDate)"><el-link type="primary" @click="goFilling(item.num)" ><b>{{ item.name }}</b></el-link></td>
                        <td class="nameTd" v-if="dateCompare_notYet(item.startDate) || dateCompare_over(item.endDate)"><el-link  @click="" disabled><b>{{ item.name }}</b></el-link></td>
                        <td :ref="'status' + item.num" class="statusTd" v-if="dateCompare_over(item.endDate)">已結束</td>
                        <td :ref="'status' + item.num" class="statusTd"
                            v-if=" dateCompare_inProgress(item.startDate, item.endDate)">進行中</td>
                        <td :ref="'status' + item.num" class="statusTd" v-if="dateCompare_notYet(item.startDate)">尚未開始
                        </td>
                        <td class="stardDateTd">{{ new Date(item.startDate).getFullYear() }}/{{ (new
                            Date(item.startDate).getMonth() + 1 < 10 ? "0" + (new Date(item.startDate).getMonth() + 1) : new
                                Date(item.startDate).getMonth() + 1) }}/{{ (new Date(item.startDate).getDate() < 10 ? "0" +
            (new Date(item.startDate).getDate()) : new Date(item.startDate).getDate()) }}</td>
                        <td class="endDateTd">{{ new Date(item.endDate).getFullYear() }}/{{ (new
                            Date(item.endDate).getMonth() + 1 < 10 ? "0" + (new Date(item.endDate).getMonth() + 1) : new
                                Date(item.endDate).getMonth() + 1) }}/{{ (new Date(item.endDate).getDate() < 10 ? "0" + (new
            Date(item.endDate).getDate()) : new Date(item.endDate).getDate()) }}</td>
                                <!-- <td class="resultTd"><el-link type="primary" @click="goFilling(item.num)" v-if="($nextTick(() => {console.log($refs['status' + item.num][0].innerText == '進行中')})) "><b>前往</b></el-link></td> -->
                        <td class="resultTd" v-if="dateCompare_inProgress(item.startDate, item.endDate) || dateCompare_over(item.endDate)"><el-link type="primary" @click="" ><b>前往</b></el-link></td>
                        <td class="resultTd" v-if="dateCompare_notYet(item.startDate)" ><el-link  disabled><b>前往</b></el-link></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="bottom">
            <ul class="pagination">
                <li class="page-item" @click.prevent="setPage(currenPage - 1)">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" :class="{ 'active': (currenPage === (n)) }" v-for="(n, index) in totalPage"
                    :key="index" @click.prevent="setPage(n)">
                    <a class="page-link" href="#">{{ n }}</a>
                </li>
                <li class="page-item" @click.prevent="setPage(currenPage + 1)">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main {
    height: 100vh;
    width: 100vw;
    background-color: bisque;

    .top {
        height: 30%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: end;

        .searchArea {
            width: 85%;
            height: 80%;
            border: 1px solid black;

            .searchArea-top {
                width: 100%;
                height: 50%;
            }

            .searchArea-bottom {
                width: 100%;
                height: 50%;
            }
        }
    }

    .middle {
        height: 45%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .sheetArea {
            width: 85%;
            height: 90%;

            .searchDataTabel {
                width: 100%;

                .searchDataTr {
                    width: 100%;

                    td {
                        border: 1px solid #333;
                    }

                    .numberTd {
                        text-align: center;
                        width: 5%;
                        height: 10%;
                    }

                    .nameTd {
                        width: 10%;
                    }

                    .statusTd {
                        text-align: center;
                        width: 5%;
                    }

                    .stardDateTd {
                        text-align: center;
                        width: 5%;
                    }

                    .endDateTd {
                        text-align: center;
                        width: 5%;
                    }

                    .resultTd {
                        text-align: center;
                        width: 5%;
                    }
                }
            }
        }
    }

    .bottom {
        height: 10%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>


<script setup>
import {
    User,
    Search,
} from '@element-plus/icons-vue'
import { watch } from 'vue' 
</script>

<script>
export default {
    data() {
        return {
            searchInput: "",
            searchStartDate: "",
            searchEndDate: "",
            searchData: [], //目標資料
            perpage: 9, //一頁顯示的資料量
            currenPage: 1,
        }
    },
    computed: {
        totalPage() {
            return Math.ceil(this.searchData.length / this.perpage) //Math.ceil()取最小整數
        },
        pageStart() {
            return (this.currenPage - 1) * this.perpage //取得該頁第一個值的index
        },
        pageEnd() {
            return this.currenPage * this.perpage  //取得該頁最後一個值的index
        }
    },
    methods: {
        dateCompare_notYet(startDate) {
            if (startDate == "" || startDate == undefined) {
                return;
            }
            return Date.parse(startDate) > new Date()
        },
        dateCompare_inProgress(startDate, endDate) {
            if (startDate == "" || startDate == undefined || endDate == "" || endDate == undefined) {
                return;
            }
            return (Date.parse(startDate) < new Date() && new Date() < Date.parse(endDate))
        },
        dateCompare_over(endDate) {
            if (endDate == "" || endDate == undefined) {
                return;
            }
            return (Date.parse(endDate) < new Date())
        },
        search() {
            fetch('http://localhost:8080/quiz/search',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        quiz_name: this.searchInput,
                        start_date: this.searchStartDate,
                        end_date: this.searchEndDate,
                    })
                })
                .then(response => response.json())
                .then(data => {
                    this.searchData = data.quizList;
                    this.currenPage = 1;
                    console.log(this.searchData);
                })
        },
        setPage(page) {
            if (page <= 0 || page > this.totalPage) {
                return
            }
            this.currenPage = page
        },
        goFilling(quizNum) {
            this.$router.push({
                path: `/QuestionnaireFilling/${quizNum}`
            })
        }
    },
    mounted() {
        this.search();
    }
}
</script>