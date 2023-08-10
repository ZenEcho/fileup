<template>
    <div class="login-container">
        <el-card class="login-card">
            <h1 class="login-title">欢迎登录</h1>
            <el-form ref="loginForm" :model="loginData" :rules="rules">
                <el-form-item label="邮箱" prop="Email">
                    <el-input v-model="loginData.Email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="Password">
                    <el-input v-model="loginData.Password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="Captcha">
                    <el-input v-model="loginData.Captcha"></el-input>
                    <img v-if="captchaImage" :src="captchaImage" class="captcha-image" @click="generateCaptcha" />
                </el-form-item>
                <el-form-item class="login-button">
                    <el-button type="primary" @click="handleLogin">登录</el-button>
                </el-form-item>
                <el-form-item>
                    <span>没有账号?</span>
                    <el-button type="info" @click="goToRegister" link>注册</el-button>
                    <span>or</span>
                    <el-button type="info" @click="recoverPassword" link>找回密码</el-button>
                </el-form-item>
            </el-form>
        </el-card>
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
            loginData: {
                Email: '',
                Password: '',
                Captcha: '',
                Last_Login_Time: '',
            },
            rules: {
                Email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
                ],
                Password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '密码长度至少为 6 个字符', trigger: 'blur' },
                ],
                Captcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ],
            },
            captchaImage: '',
        };
    },
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (!valid) { return }
                this.loginData.Last_Login_Time = new Date()
                fetch(this.$apiConfig.ServerUrl + "/api/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.loginData),
                    credentials: 'include',
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data);
                        if (data.status) {
                            this.toast.success(data.message);
                            localStorage.setItem('token', data.token);
                            this.$router.push('/dashboard');
                        } else {
                            this.toast.error(data.message);
                        }

                    })
                    .catch((error) => {
                        this.toast.error(error.message);
                    });

            });
        },
        goToRegister() {
            this.$router.push('/register');
        },
        recoverPassword() {
            return this.toast.error("暂时无法使用");
        },
        generateCaptcha() {
            fetch(this.$apiConfig.ServerUrl +'/captcha', { credentials: 'include' })
                .then(response => response.text())
                .then(data => {
                    this.captchaImage = 'data:image/svg+xml;base64,' + btoa(data);
                    this.loginData.Captcha = ''; // 清空用户输入的验证码
                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
    created() {
        this.generateCaptcha();
    },
};
</script>
  
<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.login-card {
    width: 24em;
    padding: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-title {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
}

.login-button {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.el-button--primary {
    width: 100%;
}
</style>