<template>
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
            </el-form-item>
            <div class="Captcha">
                <img v-if="captchaImage" :src="captchaImage" class="captcha-image" @click="generateCaptcha" />
            </div>
            <el-form-item class="login-button">
                <el-button type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
  
<script>
import { useToast } from "vue-toastification";
import http from '@/http';
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
                http.post('/auth/login', this.loginData, {
                })
                    .then((response) => {
                        const data = response.data;
                        if (data.status) {
                            this.toast.success(data.message);
                            this.$router.push('/dashboard');
                            localStorage.userInfo = JSON.stringify(data.userInfo)
                        } else {
                            this.toast.error(data.message);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        this.toast.error(error.data.message);
                    });
            });
        },


        generateCaptcha() {
            http.get('/auth/captcha', {
                credentials: 'include',
                responseType: 'text', // 指定响应的数据类型为文本
            })
                .then(response => {
                    this.captchaImage = 'data:image/svg+xml;base64,' + btoa(response.data);
                    this.loginData.Captcha = '';
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
.Captcha {
    text-align: center;
    margin-top: -10px;
    margin-bottom: 18px;
}

.login-title {
    font-size: 2em;
    text-align: center;
    margin-bottom: 20px;
}

.el-button--primary {
    width: 100%;
}
</style>