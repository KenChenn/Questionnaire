<template>
    <div class="main">
        <div>
            <el-dialog v-model="dialogController">
                <div>
                    <div>
                        <p class="form_quiz_text quiz_text">問題：</p>
                        <input v-model="this.editData.title">
                        <select id="editSelectTitle" v-model="this.editData.type" @change="edittypeChange()">
                            <option v-for="item in quizTypeList" :value="item[0]">{{ item[0] }}</option>
                        </select>
                        <input type="checkbox" id="editPublishedCheck" class="editPublishedCheck"
                            v-model="this.editData.necessary">
                        <span class="editPublishedText">必填</span>
                    </div>
                    <div v-if="editData.type == '單選題'">
                        <div>
                            <div v-for="(item, index) in editData.options">
                                <input v-model="editData.options[index]">
                                <i class="fa-solid fa-xmark" @click="editDeleteAnswer(index)"></i>
                            </div>
                            <button @click="addAnswer()">增加選項</button>
                        </div>
                    </div>
                    <div v-if="editData.type == '多選題'">
                        <div>
                            <div v-for="(item, index) in editData.options">
                                <input v-model="editData.options[index]">
                                <i class="fa-solid fa-xmark" @click="editDeleteAnswer(index)"></i>
                            </div>
                            <button @click="addAnswer()">增加選項</button>
                        </div>
                    </div>
                    <div v-if="editData.type == '簡答題'">
                    </div>
                    <div>
                        <el-button @click="this.dialogController = false">取消</el-button>
                        <el-button type="primary" @click="this.editQusetionSave()">儲存</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="outer">
            <div class="tabs">
                <input type="radio" id="tab-1" name="tab" checked="checked">
                <label for="tab-1">問卷</label>
                <div class="tab-content">
                    <div class="information">
                        <div class="information_inside_area_1">
                            <p class="form_name_text form_information_text">問卷名稱：</p>
                            <input class="form_name_input form_input" v-model="this.quizData.quizTitle">
                        </div>
                        <div class="information_inside_area_2">
                            <p class="form_description_text form_information_text">問卷說明：</p>
                            <textarea class="form_description_input form_input"
                                v-model="this.quizData.quizDirections"></textarea>
                        </div>
                        <div class="information_inside_area_3">
                            <p class="form_startTime_text form_information_text">開始時間：</p>
                            <input type="date" class="form_startTime_input form_input"
                                v-model="this.quizData.quizStartDate">
                        </div>
                        <div class="information_inside_area_4">
                            <p class="form_endTime_text form_information_text">結束時間：</p>
                            <input type="date" class="form_endTime_input form_input" v-model="this.quizData.quizEndDate">
                        </div>
                        <div class="information_inside_area_5">
                            <button class="form_cancel_button font_button">取消</button>
                            <button class="form_next_button font_button" @click="nextPage()">下一步</button>
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
                            <input class="form_quiz_input quiz_title" v-model="questionData.title">
                            <select id="quiz_type_select" class="quiz_type_select" @change="typeChange()">
                                <option v-for="item in quizTypeList" :value="item[0]">{{ item[0] }}</option>
                            </select>
                            <input type="checkbox" class="publishedCheck" v-model="this.questionData.necessary">
                            <span class="publishedText">必填</span>
                        </div>
                        <p class="form_quiz_text">選項：</p>
                        <div class="quiz_inside_area_2">
                            <div class="quiz_div" v-if="questionData.type == '單選題'">
                                <div class="quiz_type_radio_div">
                                    <div v-for="(item, index) in questionData.options">
                                        <input class="quiz_answer_input" v-model="questionData.options[index]">
                                        <i class="fa-solid fa-xmark" @click="deleteAnswer(index)"></i>
                                    </div>
                                    <button class="add_answer_button" @click="addAnswer()">增加選項</button>
                                </div>
                            </div>
                            <div class="quiz_div" v-if="questionData.type == '多選題'">
                                <div class="quiz_type_checkBox_div">
                                    <div v-for="(item, index) in questionData.options">
                                        <input class="quiz_answer_input" v-model="questionData.options[index]">
                                        <i class="fa-solid fa-xmark" @click="deleteAnswer(index)"></i>
                                    </div>
                                    <button class="add_answer_button" @click="addAnswer()">增加選項</button>
                                </div>
                            </div>
                            <div class="quiz_type_textArea_div" v-if="questionData.type == '簡答題'">
                                <!-- <textarea class="quiz_answer_textArea" v-model="questionData.options[0]"
                                    @input="check()"></textarea> -->
                            </div>

                        </div>
                        <div class="quiz_inside_area_3">
                            <i class="fa-solid fa-trash-can" @click="deleteQuestion()"></i>
                            <button class="addInQuizData" @click="addQuizQuestion()">加入題庫</button>
                        </div>
                        <div class="quiz_inside_area_4">
                            <table class="quizDataArea">
                                <tr class="quizDataAreaTr">
                                    <td class="deleteTd"></td>
                                    <td class="numberTd">編號</td>
                                    <td class="titleTd">問題</td>
                                    <td class="typeTd">問題種類</td>
                                    <td class="publishedTd">必填</td>
                                    <td class="editTd">編輯</td>
                                </tr>
                                <tr v-for="(item, index) in quizData.quizQuestion">
                                    <td class="deleteTd"><input type="checkbox" v-model="this.deleteList" :value="index">
                                    </td>
                                    <td class="numberTd">{{ index + 1 }}</td>
                                    <td style="word-break:break-all;">{{ item.title }}</td>
                                    <td class="typeTd">{{ item.type }}</td>
                                    <td class="publishedTd" v-if="item.necessary == true"><i class="fa-solid fa-o"></i>
                                    </td>
                                    <td class="publishedTd" v-if="item.necessary == ''"><i class="fa-solid fa-x"></i></td>
                                    <td class="editTd"><a href="javascript:void(0)" @click="editQuestion(index)">編輯</a></td>
                                </tr>

                            </table>
                        </div>
                        <div class="quiz_inside_area_5">
                            <button class="backBtn" @click="backPage()">上一步</button>
                            <button class="previewBtn" @click="confirmQuiz()">預覽問卷</button>
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

    .editDialog {
        z-index: 10;
    }

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

                        .publishedCheck {
                            margin-top: 20px;
                            margin-right: 5px;
                            margin-left: 20px;
                        }

                        .publishedText {
                            margin-top: 20px;
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
                    }

                    .quiz_inside_area_3 {
                        height: 60px;

                        .fa-trash-can {
                            font-size: 30px;
                            float: left;
                            margin-top: 2%;
                            margin-left: 20px;
                        }

                        .addInQuizData {
                            height: 50px;
                            width: 100px;
                            float: right;
                            margin-right: 20px;
                        }


                    }

                    .quiz_inside_area_4 {
                        display: flex;

                        .quizDataArea {
                            width: 100%;

                            td {
                                border: 1px solid #333;
                            }

                            .deleteTd {
                                text-align: center;
                                width: 5%;
                            }

                            .numberTd {
                                text-align: center;
                                width: 9%;
                            }

                            .titleTd {
                                text-align: center;
                            }

                            .typeTd {
                                text-align: center;
                                width: 10%;
                            }

                            .publishedTd {
                                text-align: center;
                                width: 7%;
                            }

                            .editTd {
                                text-align: center;
                                width: 9%;
                            }

                        }
                    }

                    .quiz_inside_area_5 {
                        display: flex;
                        justify-content: end;
                        margin-top: 50px;
                        margin-bottom: 10px;

                        .backBtn {
                            margin-right: 20px;
                        }
                    }
                }
            }
        }
    }
}
</style>

<script>
import QuestionEditDialog from '../components/questionEditDialog.vue'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            quizTypeList: [
                ["單選題", "radio"],
                ["多選題", "checkBox"],
                ["簡答題", "textArea"],
            ],
            quizData: {
                quizNum:null,
                quizTitle: "",
                quizDirections: "",
                quizStartDate: "",
                quizEndDate: "",
                quizQuestion: []
            },
            questionData: {
                title: "",
                type: "單選題",
                necessary: "",
                options: [""],
            },
            deleteList: [],
            editQuizType: "",
            editData: {
                editIndex: "",
                title: "",
                type: "",
                necessary: "",
                options: [],
            },
            dialogController: false,

        }
    },
    components: {
        QuestionEditDialog
    },
    methods: {
        questionDataInit() {
            this.questionData = {
                title: "",
                necessary: "",
                type: quiz_type_select.selectedOptions[0].innerText,
                options: [""],
            }
        },
        typeChange() {
            this.questionData.type = quiz_type_select.selectedOptions[0].innerText,
                this.questionData.options = [""]
        },
        edittypeChange() {
            this.editData.type = editSelectTitle.selectedOptions[0].innerText
            console.log(this.editData.type);
            if ((this.editData.options.length <= 0) && (this.editData.type == "單選題" || this.editData.type == "多選題")) {
                console.log("123");
                this.editData.options.push("")
            }
        },
        addAnswer() {
            switch (this.dialogController) {
                case true:
                    this.editData.options.push("")
                    break;
                case false:
                    this.questionData.options.push("")
                    break;
            }
        },
        deleteAnswer(index) {
            if (this.questionData.options.length > 1) {
                this.questionData.options.splice(index, 1)
                return;
            }
            alert("最少需要有一個答案")
        },
        editDeleteAnswer(index) {
            if (this.editData.options.length > 1) {
                this.editData.options.splice(index, 1)
                return;
            }
            alert("最少需要有一個答案")
        },
        addQuizQuestion() {
            this.quizData.quizQuestion.push(this.questionData);
            this.questionDataInit();
            console.log(this.quizData);
        },
        deleteQuestion() {
            this.deleteList.sort(function (a, b) {
                if (a < b) {
                    return 1; // 正數時，後面的數放在前面
                } else {
                    return -1 // 負數時，前面的數放在前面
                }
            })
            for (let i = 0; i < this.deleteList.length; i++) {
                this.quizData.quizQuestion.splice(this.deleteList[i], 1)
            }
            this.deleteList = []
        },
        editQuestion(index) {
            console.log(this.quizData.quizQuestion[index]);
            this.editData.options = []
            this.editData.editIndex = index
            this.editData.title = this.quizData.quizQuestion[index].title
            this.editData.type = this.quizData.quizQuestion[index].type
            this.editData.necessary = this.quizData.quizQuestion[index].necessary
            for (let i = 0; i < this.quizData.quizQuestion[index].options.length; i++) {
                this.editData.options.push(this.quizData.quizQuestion[index].options[i])
            }
            this.dialogController = true
        },
        editQusetionSave() {
            if (this.editData.editIndex == "" && this.editData.editIndex != 0) {
                this.dialogController = false
                console.log("editQusetionSave()的return");
                return
            }
            this.quizData.quizQuestion[this.editData.editIndex].title = this.editData.title
            this.quizData.quizQuestion[this.editData.editIndex].type = this.editData.type
            this.quizData.quizQuestion[this.editData.editIndex].necessary = this.editData.necessary
            this.quizData.quizQuestion[this.editData.editIndex].options = []
            for (let i = 0; i < this.editData.options.length; i++) {
                this.quizData.quizQuestion[this.editData.editIndex].options.push(this.editData.options[i])
            }
            if (this.quizData.quizQuestion[this.editData.editIndex].type == "簡答題") {
                this.quizData.quizQuestion[this.editData.editIndex].options = []
            }
            this.dialogController = false

        },
        nextPage() {
            document.getElementById("tab-2").checked = true
        },
        backPage() {
            document.getElementById("tab-1").checked = true
        },
        confirmQuiz() {
            localStorage.setItem("quizData", JSON.stringify(this.quizData))
            this.$router.push('/QuestionnaireConfirm')
        },
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
                    if(data.code == 200){
                        this.quizData.quizTitle = data.quizList[0].name
                        this.quizData.quizDirections = data.quizList[0].description
                        this.quizData.quizStartDate = data.quizList[0].startDate
                        this.quizData.quizEndDate = data.quizList[0].endDate
                        let array = [];
                        array = JSON.parse(data.quizList[0].questionStr)
                        for(let i = 0;array.length;i++){
                            this.quizData.quizQuestion.push({
                                title:array[i].title,
                                type:array[i].type,
                                necessary:array[i].necessary,
                                options:JSON.parse(array[i].options)
                            })
                        }
                    }
                })
        },
        check() {
            console.log(this.questionData);
        },
        check3() {
            console.log(this.editData);
        }
    },
    mounted() {
        switch (true) {
            case this.$route.name == "QuestionnaireEdit" && this.$route.params.quizNum >= 0:
                console.log("這是編輯問卷" + this.$route.params.quizNum + "的頁面");
                this.getDataByQuizNum(this.$route.params.quizNum);
                this.quizData.quizNum = this.$route.params.quizNum;
                break;
            case this.$route.name == "QuestionnaireCreate":
                console.log("這是新建問卷的頁面");
                break;
        }
0    }
}
</script>