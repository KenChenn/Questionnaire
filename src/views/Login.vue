<template>
    <div class="outer">
        <div class="main">
            <el-input v-model="this.accountInput" class="accountInput" placeholder="帳號" />
            <el-input v-model="this.passwordInput" class="passwordInput" placeholder="密碼" show-password/>
            <el-button type="primary" round @click="login()">登入</el-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.outer {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    .main {
        height: 70%;
        width: 50%;
        background-color: aquamarine;

        .accountInput {
        }
        .passwordInput {
        }
    }
}
</style>

<script>
export default {
    data() {
        return {
            accountInput:"",
            passwordInput:""
        }
    },
    methods:{
        login() {
            fetch('http://localhost:8080/api/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials : 'include',
                    body: JSON.stringify({
                        account: this.accountInput,
                        password: this.passwordInput
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if(data.rtncode == "SUCCESSFUL"){
                        this.$router.push('/QuestionnaireManage')
                    }
                })
        }
    }
}
</script>