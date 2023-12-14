<template>
    <div class="main">
        <div class="outer">
            <div class="tabs">
                <input type="radio" id="tab-1" name="tab" checked="checked">
                <label for="tab-1">問卷</label>
                <div class="tab-content">
                    <div class="information">
                        <div class="information_inside_area_1">
                            <p class="form_name_text form_information_text">問卷名稱：</p>
                            <input class="form_name_input form_input" v-model="this.quizData.quizName">
                        </div>
                        <div class="information_inside_area_2">
                            <p class="form_description_text form_information_text">問卷說明：</p>
                            <textarea class="form_description_input form_input" v-model="this.quizData.quizDescription"></textarea>
                        </div>
                        <div class="information_inside_area_3">
                            <p class="form_startTime_text form_information_text">開始時間：</p>
                            <input type="date" class="form_startTime_input form_input" v-model="this.quizData.quizStartTime">
                        </div>
                        <div class="information_inside_area_4">
                            <p class="form_endTime_text form_information_text">結束時間：</p>
                            <input type="date" class="form_endTime_input form_input" v-model="this.quizData.quizEndTime">
                        </div>
                        <div class="information_inside_area_5">
                            <button class="form_cancel_button font_button">取消</button>
                            <button class="form_next_button font_button">下一步</button>
                        </div>
                    </div>
                </div>
                <!--   tab group end -->

                <!--   tab group -->
                <input type="radio" name="tab" id="tab-2">
                <label for="tab-2">題目</label>
                <div class="tab-content">
                    <div class="quiz">
                        <div class="quiz_inside_area_1">
                            <p class="form_quiz_text quiz_text">問題：</p>
                            <input class="form_quiz_input quiz_title">
                            <select id="quiz_type_select" class="quiz_type_select" @change="quizTypeChange()">
                                <option v-for="item in quizTypeList" :value="item[1]">{{ item[0] }}</option>
                            </select>
                        </div>
                        <p class="form_quiz_text">選項：</p>
                        <div class="quiz_inside_area_2">
                            <div class="quiz_div" v-if="selectedQuizType == 'radio'">
                                <div class="quiz_type_radio_div">
                                    <div v-for="(item, index) in answerList">
                                        <input class="quiz_answer_input" v-model="answerList[index]" @input="check()">
                                        <i class="fa-solid fa-xmark" @click="deleteAnswer(index)"></i>
                                    </div>
                                    <button class="add_answer_button" @click="addAnswer()">增加選項</button>
                                </div>
                            </div>
                            <div class="quiz_div" v-if="selectedQuizType == 'checkBox'">
                                <div class="quiz_type_checkBox_div">
                                    <div v-for="(item, index) in answerList">
                                        <input class="quiz_answer_input" v-model="answerList[index]" @input="check()">
                                        <i class="fa-solid fa-xmark" @click="deleteAnswer(index)"></i>
                                    </div>
                                    <button class="add_answer_button" @click="addAnswer()">增加選項</button>
                                </div>
                            </div>
                            <div class="quiz_type_textArea_div" v-if="selectedQuizType == 'textArea'">
                                <textarea class="quiz_answer_textArea" v-model="answerList[0]" @input="check()"></textarea>
                            </div>
                            <button class="addInQuizData">加入題庫</button>

                        </div>
                        <div class="quiz_inside_area_3">

                        </div>
                        <div class="quiz_inside_area_4">

                        </div>
                    </div>
                </div>
                <!--   tab group end -->

                <!--   tab group -->
                <input type="radio" name="tab" id="tab-3">
                <label for="tab-3">問卷回饋</label>
                <div class="tab-content">Content 3</div>

                <input type="radio" name="tab" id="tab-4">
                <label for="tab-4">統計</label>
                <div class="tab-content">Content 4</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main {
    width: 100vw;
    height: 100vh;
    display: flex;

    .outer {
        width: 100%;
        height: 100%;

        .tabs {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            column-gap: 5px;
            margin: 2em auto;
            width: 50%;


            input[type="radio"] {
                display: none;

                &:checked {
                    +label {
                        color: black;
                        background-color: white;
                        transform: translatey(1px);

                        +.tab-content {
                            display: block;
                        }
                    }
                }
            }

            label {
                padding: 0.5em 0.75em;
                color: #ccc;
                border: 1px solid #ccc;
                border-bottom: unset;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                cursor: pointer;
                order: 0;

                &:hover {
                    color: black;
                }
            }

            .tab-content {
                width: 100%;
                display: none;
                padding: 1em;
                border: 1px solid #ccc;
                border-radius: 5px;
                order: 1;

                .information {
                    .form_information_text {
                        margin: 0;
                        margin-top: 20px;
                        margin-right: 10px;
                        margin-left: 10px;
                    }

                    .form_input {
                        margin-top: 20px;
                        margin-right: 10px;
                        margin-left: 10px;
                    }

                    .form_startTime_input {
                        text-indent: 3%;
                    }

                    .form_endTime_input {
                        text-indent: 3%;
                    }

                    .information_inside_area_1 {
                        display: flex;
                    }

                    .information_inside_area_2 {
                        display: flex;

                        .form_description_input {
                            height: 200px;
                            width: 70%;
                            resize: none;
                        }
                    }

                    .information_inside_area_3 {
                        display: flex;
                    }

                    .information_inside_area_4 {
                        display: flex;
                    }

                    .information_inside_area_5 {
                        display: flex;
                        justify-content: end;
                        align-items: center;

                        .font_button {
                            margin-right: 20px;
                        }
                    }
                }

                .quiz {
                    .form_quiz_text {
                        margin: 0;
                        margin-left: 10px;
                        margin-right: 10px;
                        margin-top: 20px;
                    }

                    .quiz_inside_area_1 {
                        display: flex;
                        align-items: center;

                        .quiz_title {
                            height: 30px;
                            margin-top: 20px;
                            margin-right: 10px;
                            margin-left: 10px;
                        }

                        .quiz_type_select {
                            margin-top: 20px;
                            margin-right: 10px;
                            margin-left: 10px;
                            height: 30px;

                        }
                    }

                    .quiz_inside_area_2 {

                        .quiz_div {

                            .quiz_type_radio_div {
                                width: 100%;
                                margin-left: 10px;

                                .quiz_answer_input {
                                    margin-top: 5px;
                                    margin-right: 5px;
                                }
                            }

                            .quiz_type_checkBox_div {
                                width: 100%;
                                margin-left: 10px;

                                .quiz_answer_input {
                                    margin-top: 5px;
                                    margin-right: 5px;
                                }
                            }


                            .add_answer_button {
                                margin-top: 5px;
                                margin-right: 5px;
                                width: 180px;
                                height: 30px;
                            }

                        }

                        .quiz_type_textArea_div {
                            width: 100%;
                            margin-left: 10px;

                            .quiz_answer_textArea {
                                height: 150px;
                                width: 400px;
                                resize: none;
                            }
                        }

                        .addInQuizData {
                            height: 50px;
                            width: 100px;
                            float: right;
                            margin-right: 20px;
                        }
                    }

                    .quiz_inside_area_3 {
                        display: flex;

                    }

                    .quiz_inside_area_4 {
                        display: flex;

                    }
                }
            }
        }
    }
}
</style>

<script>
export default {
    data() {
        return {
            quizTypeList: [
                ["單選題", "radio"],
                ["多選題", "checkBox"],
                ["簡答題", "textArea"],
            ],
            selectedQuizType: "radio",
            answerList: [""],
            quizData:{},
            
        }
    },
    methods: {
        quizDataInit(){
            this.quizData = {
                quizName:"",
                quizDescription:"",
                quizStartTime:"",
                quizEndTime:"",
                quiz:[],
            }
        },
        quizTypeChange() {
            this.answerList = [""]
            this.selectedQuizType = quiz_type_select.value
        },
        addAnswer() {
            this.answerList.push("")
        },
        deleteAnswer(index) {
            if (this.answerList.length > 1) {
                this.answerList.splice(index, 1)
                return;
            }
            alert("最少需要有一個答案")
        },
        check() {
            console.log(this.answerList);
        },
        check2() {
            console.log(this.quizData);
        }
    },
    mounted(){
        this.quizDataInit() //將問卷資料物件初始化成想要的樣子
    }
}
</script>