<script>
export default {
    data() {
        return {
            quizData: {},
        }
    },
    methods: {
        login() {
            fetch('http://localhost:8080/api/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials : 'include',
                    body: JSON.stringify({
                        account: "admin",
                        password: "admin"
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if(data.rtncode == "SUCCESSFUL"){
                        this.$router.push('/QuestionnaireContent')
                    }
                })
        }
    }
}
</script>

<template>
    <button @click="login()">表單頁</button>
    TESTupdate
</template>

<style scoped lang="scss"></style>
