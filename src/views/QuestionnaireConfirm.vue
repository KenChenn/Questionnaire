<template>
    <div class="outer">
        <div class="quizTimeArea">
            <label>{{ quizData.quizStartDate ? quizData.quizStartDate : "" }} ~ {{ quizData.quizEndDate ?
                quizData.quizEndDate : "" }}</label>
        </div>
        <div class="quizTitleArea">
            <h1>{{ quizData.quizTitle ? quizData.quizTitle : "" }}</h1>
        </div>
        <div class="quizDirectionseArea">
            <label>{{ quizData.quizDirections ? quizData.quizDirections : "" }}</label>
        </div>
        <div class="userInputArea">
            <div class="userInputArea-name">
                <label class="userNameText">姓名:</label>
                <input class="userNameInput">
            </div>
            <div class="userInputArea-phone">
                <label class="userPhoneText">手機:</label>
                <input class="userPhoneInput">
            </div>
            <div class="userInputArea-email">
                <label class="usereEmailText">E-mail:</label>
                <input class="usereEmailInput">
            </div>
            <div class="userInputArea-age">
                <label class="usereAgeText">年齡:</label>
                <input class="usereAgeInput">
            </div>
        </div>
        <div v-for="(item, index) in quizData.quizQuestion">
            <label>{{ index + 1 }}.{{ item.title }} {{ item.necessary ? "(必填)" : "" }}</label>
            <div v-for="select in item.options" v-if="item.type == '單選題'">
                <input type="radio" :name="'question-' + index + '-option'" :value="select">
                <label>{{ select }}</label>
            </div>
            <div v-for="select in item.options" v-if="item.type == '多選題'">
                <input type="checkBox" :name="'question-' + index + '-option'" :value="select">
                <label>{{ select }}</label>
            </div>
            <div v-for="select in item.options" v-if="item.type == '簡答題'">
                <textarea></textarea>
            </div>
        </div>
        <div class="btnArea">
            <el-button type="warning" @click="save('false')">僅儲存</el-button>
            <el-button type="success" @click="save('true')">儲存並發布</el-button>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>

<script>
import { Logger } from 'sass'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            quizData: {},
            array: [],
            arrayStr: "",
            questionFormat: {
                num: "",
                title: "",
                type: "",
                necessary: "",
                options: [],
            }
        }
    },
    methods: {
        questionFormatInit() {
            this.questionFormat = {
                num: "",
                title: "",
                type: "",
                necessary: "",
                options: [],
            }
        },
        save(published) {
            if (this.quizData.length == undefined || this.quizData.length == null) {
                Swal.fire({
                    title: '找不到資料，無法儲存',
                    icon: 'error',
                    confirmButtonText: '回到問卷總表'
                }).then((result) => {
                    if (result.isConfirmed = true) {
                        this.$router.push('QuestionnaireManage')
                        localStorage.removeItem("quizData");
                    }
                })
                return
            }
            for (let i = 0; i < this.quizData.quizQuestion.length; i++) {
                this.questionFormat.num = i + 1
                this.questionFormat.title = this.quizData.quizQuestion[i].title
                this.questionFormat.type = this.quizData.quizQuestion[i].type
                this.questionFormat.necessary = this.quizData.quizQuestion[i].necessary
                this.questionFormat.options = this.quizData.quizQuestion[i].options
                this.array.push(this.questionFormat)
                this.array[i].options = JSON.stringify(this.array[i].options)
                this.questionFormatInit()
            }
            fetch('http://localhost:8080/quiz/create',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        name: this.quizData.quizTitle,
                        description: this.quizData.quizDirections,
                        start_date: this.quizData.quizStartDate,
                        end_date: this.quizData.quizEndDate,
                        question_list: this.array,
                        // question_list: [{
                        //     num: "1",
                        //     title: "這是單選非必填題",
                        //     type: "單選題",
                        //     necessary: "true",
                        //     options: JSON.stringify(this.array)
                        // }],
                        is_published: published
                    })
                })
                .then(response => response.json())
                .then(data => {
                    this.array = [];
                    Swal.fire({
                        title: '儲存成功',
                        icon: 'success',
                        confirmButtonText: '回到問卷總表'
                    }).then((result) => {
                        if (result.isConfirmed = true) {
                            this.$router.push('QuestionnaireManage')
                            localStorage.removeItem("quizData");
                        }
                    })
                }).then(Error => {
                    console.log(Error);
                })
        }
    },
    mounted() {
        if (localStorage.getItem("quizData") != null || localStorage.getItem("quizData") != undefined) {
            this.quizData = JSON.parse(localStorage.getItem("quizData"));
            // console.log(this.quizData);
        }
    },
}
</script>