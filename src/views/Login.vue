<template>
    <div class="login-container">
        <h2>后台登录</h2>
        <form @submit.prevent="login">
            <label for="username">用户名:</label>
            <input type="text" id="username" v-model="loginInfo.username" required>
            <label for="password">密码:</label>
            <input type="password" id="password" v-model="loginInfo.password" required>
            <button type="submit">登录</button>
        </form>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            loginInfo: {
                username: '',
                password: '',
            }
        };
    },
    methods: {
        login() {
            const url = 'http://localhost:3000/api/login';
            const formData = JSON.stringify(this.loginInfo);
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
   
                })
                .catch(error => {
                    console.error('Error:', error);
                    // this.toast.error("发送错误!");
                });
        },
    },
};
</script>
  
<style>
.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

label,
input {
    display: block;
    margin-bottom: 10px;
}

input {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

button {
    padding: 8px 15px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}
</style>
  