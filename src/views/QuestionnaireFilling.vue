<template>
    <div class="main">
        <div class="quizTitleArea">
            <h1>{{ quizData.quizTitle ? quizData.quizTitle : "" }}</h1>
        </div>
        <div class="quizDirectionseArea">
            <label>{{ quizData.quizDirections ? quizData.quizDirections : "" }}</label>
        </div>
        <div class="userInputArea">
            <div class="userInputArea-name">
                <label class="userNameText">姓名:</label>
                <el-input v-model="userWriter.name"  maxlength="10" placeholder="name" ></el-input>
            </div>
            <div class="userInputArea-phone">
                <label class="userPhoneText">手機:</label>
                <el-input v-model="userWriter.phone"  maxlength="10" placeholder="phone" ></el-input>
            </div>
            <div class="userInputArea-email">
                <label class="usereEmailText">E-mail:</label>
                <el-input v-model="userWriter.email"  maxlength="40" placeholder="email" ></el-input>
            </div>
            <div class="userInputArea-age">
                <label class="usereAgeText">年齡:</label>
                <el-input v-model="userWriter.age" maxlength="3" placeholder="age"></el-input>
            </div>
        </div>
        <div v-for="(item, index) in quizData.quizQuestion">
            <label>{{ index + 1 }}.{{ item.title }} {{ item.necessary ? "(必填)" : "" }}</label>
            <div v-for="select in item.options" v-if="item.type == '單選題'">
                <el-radio-group v-model="userWriter.answer[index]">
                    <el-radio :label="select"></el-radio>
                </el-radio-group>
            </div>
            <div v-for="select in item.options" v-if="item.type == '多選題'">
                <el-checkbox-group v-model="userWriter.answer[index]">
                    <el-checkbox :label="select" />
                </el-checkbox-group>
                <!-- <input type="checkBox" :name="'question-' + index + '-option'" :value="select" v-model="answer[index]">
                <label>{{ select }}</label> -->
            </div>
            <div v-for="select in item.options" v-if="item.type == '簡答題'">
                <el-input maxlength="50" show-word-limit type="textarea" v-model="userWriter.answer[index]" resize="none"
                    rows="3"></el-input>
            </div>
        </div>
        {{ userWriter }}
        <el-button type="primary" :icon="Promotion" @click="">填寫完畢</el-button>

    </div>
</template>

<style scoped lang="scss"></style>


<script setup>
import {
    Promotion
} from '@element-plus/icons-vue'
import { watch } from 'vue'
</script>

<script>
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            quizData: {
                quizTitle: "",
                quizDirections: "",
                quizStartDate: "",
                quizEndDate: "",
                quizQuestion: []
            },
            userWriter: {
                quiz_num: "",
                name: "",
                phone: "",
                email: "",
                age: "",
                answer: [],
            },
        }
    },
    methods: {
        getDataByQuizNum(quizNum) {
            fetch('http://localhost:8080/quiz/get_data_by_num',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        num: quizNum,
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        this.quizData.quizTitle = data.quizList[0].name
                        this.quizData.quizDirections = data.quizList[0].description
                        this.quizData.quizStartDate = data.quizList[0].startDate
                        this.quizData.quizEndDate = data.quizList[0].endDate
                        let array = []
                        array = JSON.parse(data.quizList[0].questionStr)
                        for (let i = 0; i < array.length; i++) {
                            this.quizData.quizQuestion.push({
                                title: array[i].title,
                                type: array[i].type,
                                necessary: array[i].necessary,
                                options: JSON.parse(array[i].options)
                            })
                        }
                    }
                })
        },
        send() {
            // for(let i =0; i<Object.keys(this.$refs).length;i++){
            //     for(let j =0; j<(Object.values(this.$refs)[i]).length;j++){
            //         if(Object.values(this.$refs)[i][j].checked){
            //             this.userWriter.answer.set(i+1,)
            //             console.log(Object.values(this.$refs)[i][j].value);
            //         }
            //     }
            // }

        },
    },
    mounted() {
        switch (true) {
            case this.$route.params.quizNum >= 1:
                this.getDataByQuizNum(this.$route.params.quizNum);
                this.userWriter.quiz_num = this.$route.params.quizNum
                break;
            case this.$route.params.quizNum <= 0 || this.$route.params.quizNum == null || this.$route.params.quizNum == undefined:
                Swal.fire({
                    title: '發生錯誤，找不到問卷',
                    icon: 'error',
                    confirmButtonText: '回到問卷總表'
                }).then((result) => {
                    if (result.isConfirmed = true) {
                        this.$router.push('/')
                    }
                })
                break;
        }
    }
}
</script>