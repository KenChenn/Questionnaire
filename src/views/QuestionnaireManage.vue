<template>
    <div class="main">
        <el-button round :icon="User" @click="logOut()">登出</el-button>
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
        <el-button type="danger" :icon="Delete" round @click="deleteQuiz()">刪除</el-button>
        <el-button type="primary" :icon="Plus" round @click="$router.push({ name: 'QuestionnaireCreate' })">增加</el-button>

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
                        <td class="deleteTd"></td>
                        <td class="numberTd">編號</td>
                        <td class="nameTd">名稱</td>
                        <td class="statusTd">狀態</td>
                        <td class="stardDateTd">開始時間</td>
                        <td class="endDateTd">結束時間</td>
                        <td class="resultTd">結果</td>
                    </tr>
                    <tr class="searchDataTr" v-for="(item, index) in searchData.slice(pageStart, pageEnd)">
                        <td class="deleteTd"><input type="checkbox" v-model="deleteList" :value="item.num"></td>
                        <td class="numberTd">#{{ item.num }}</td>
                        <!-- <td class="nameTd"><a :href="'/QuestionnaireEdit/' + item.num">{{ item.name }}</a></td> -->
                        <td class="nameTd"><a :href="'/QuestionnaireEdit/' + item.num"
                                @click.prevent="pageTurn(item.num)">{{ item.name }}</a></td>
                        <!-- <td class="nameTd"><a href="javascript:void(0)" @click="pageTurn(item.num)">{{ item.name }}</a></td> -->
                        <td class="statusTd" v-if="Date.parse(item.endDate) < new Date()">已結束</td>
                        <td class="statusTd"
                            v-if="Date.parse(item.startDate) < new Date() && new Date() < Date.parse(item.endDate)">進行中</td>
                        <td class="statusTd" v-if="Date.parse(item.startDate) > new Date()">尚未開始</td>
                        <td class="stardDateTd">{{ new Date(item.startDate).getFullYear() }}/{{ (new
                            Date(item.startDate).getMonth() + 1 < 10 ? "0" + (new Date(item.startDate).getMonth() + 1) : new
                                Date(item.startDate).getMonth() + 1) }}/{{ (new Date(item.startDate).getDate() < 10 ? "0" +
            (new Date(item.startDate).getDate()) : new Date(item.startDate).getDate()) }}</td>
                        <td class="endDateTd">{{ new Date(item.endDate).getFullYear() }}/{{ (new
                            Date(item.endDate).getMonth() + 1 < 10 ? "0" + (new Date(item.endDate).getMonth() + 1) : new
                                Date(item.endDate).getMonth() + 1) }}/{{ (new Date(item.endDate).getDate() < 10 ? "0" + (new
            Date(item.endDate).getDate()) : new Date(item.endDate).getDate()) }}</td>
                        <td class="resultTd">前往</td>
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
    background-color: aquamarine;

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

                    .deleteTd {
                        text-align: center;
                        width: 1%;
                    }

                    .numberTd {
                        text-align: center;
                        width: 5%;
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
import { watch } from 'vue'
import {
    User,
    Search,
    Delete,
    Plus,
} from '@element-plus/icons-vue'
</script>

<script>
import Swal from 'sweetalert2'


export default {
    data() {
        return {
            searchInput: "",
            searchStartDate: "",
            searchEndDate: "",
            searchData: [], //目標資料
            perpage: 9, //一頁顯示的資料量
            currenPage: 1,
            deleteList: [],
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
                        is_login: true
                    })
                })
                .then(response => response.json())
                .then(data => {
                    this.searchData = data.quizList;
                    // console.log(this.searchData);
                })
        },
        setPage(page) {
            if (page <= 0 || page > this.totalPage) {
                return
            }
            this.currenPage = page
        },
        deleteQuiz() {
            fetch('http://localhost:8080/quiz/delete',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        quiz_num_list: this.deleteList
                    })
                })
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    switch (data.code) {
                        case 200:
                            this.deleteList = []
                            this.search();
                            const currenPageWatch = watch(() => this.searchData, () => {
                                if (this.searchData[this.pageStart] == undefined) {
                                    this.currenPage -= 1
                                }
                                currenPageWatch()
                            }
                            )
                            Swal.fire({
                                title: '刪除成功',
                                icon: 'success',
                                confirmButtonText: '確定'
                            })
                            break;
                            case 400:
                            Swal.fire({
                                title: '刪除失敗',
                                icon: 'error',
                                confirmButtonText: '確定'
                            })
                            break;
                    }
                })
        },
        logOut() {
            fetch('http://localhost:8080/api/logout',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                })
                .then(response => response.json())
            Swal.fire({
                title: '登出成功',
                icon: 'success',
                confirmButtonText: '回到網頁'
            }).then((result) => {
                if (result.isConfirmed = true) {
                    this.$router.push('/')
                }
            })

        },
        pageTurn(quizNum) {
            this.$router.push({
                path: `/QuestionnaireEdit/${quizNum}`
            })
        }
    },
    mounted() {
        this.search();
    }
}
</script>