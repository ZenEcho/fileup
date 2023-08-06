<!-- Register.vue -->

<template>
    <div class="login-container">
        <h2>注册</h2>
        <form @submit.prevent="Verification">
            <label for="email">电子邮箱:</label>
            <input type="text" id="email" v-model="registerInfo.EmailAddress" required>
            <label for="username">用户名:</label>
            <input type="text" id="username" v-model="registerInfo.username" required>
            <label for="password">密码:</label>
            <input type="password" id="password" v-model="registerInfo.password" required>
            <div>
                <img :src="captchaImage" @click="refreshCaptcha" />
                <input v-model="captcha" placeholder="Enter the Captcha" />
            </div>
            <button type="submit">注册</button>
        </form>
    </div>
</template>
  
<script>
import { useToast } from "vue-toastification";
export default {
    setup() {
        const toast = useToast();
        return { toast }
    },
    data() {
        return {
            registerInfo: {
                EmailAddress: '',
                username: '',
                password: '',
                registration_time: '',
            },
            captcha: '',
            captchaImage: '',
        };
    },
    methods: {
        Verification() {
            this.registerInfo.registration_time = new Date()
            fetch('http://localhost:3199/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Verification: this.captcha }),
                credentials: 'include',
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status) {
                        this.registerUser()
                    } else {
                        this.toast.error(data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        registerUser() {
            fetch("http://localhost:3199/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.registerInfo),
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.toast.success(data.message+",3秒后跳转到登录页面");
                    // 3秒后跳转到'/login'页面
                    setTimeout(() => {
                        this.$router.push('/login');
                    }, 3000); 
                })
                .catch((error) => {
                    this.toast.error(data.message);
                });
        },
        refreshCaptcha() {
            fetch('http://localhost:3199/captcha', { credentials: 'include' })
                .then((response) => response.text())
                .then((data) => {
                    this.captchaImage = 'data:image/svg+xml;base64,' + btoa(data);
                    this.captcha = '';
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
    mounted() {
        this.refreshCaptcha();
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
  
  