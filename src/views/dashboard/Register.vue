<template>
    <el-card class="Register-card">
            <h1 class="Register-title">注册</h1>
            <el-form ref="RegisterForm" :model="RegisterData" :rules="rules">
                <el-form-item label="邮箱" prop="Email">
                    <el-input v-model="RegisterData.Email"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="Username">
                    <el-input v-model="RegisterData.Username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="Password">
                    <el-input v-model="RegisterData.Password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="Captcha">
                    <el-input v-model="RegisterData.Captcha"></el-input>
                    <img v-if="captchaImage" :src="captchaImage" class="captcha-image" @click="generateCaptcha" />
                </el-form-item>
                <el-form-item class="Register-button">
                    <el-button type="primary" @click="handleRegister">注册</el-button>
                </el-form-item>
                <el-form-item>
                    <span>已注册?</span>
                    <el-button type="info" @click="goToLogin" link>登录</el-button>
                    <span>or</span>
                    <el-button type="info" @click="recoverPassword" link>找回密码</el-button>
                </el-form-item>
            </el-form>
        </el-card>
</template>
  
<script>
import { ElCard, ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import { useToast } from "vue-toastification";
import http from '@/http';
export default {
    setup() {
        const toast = useToast();
        return { toast }
    },
    components: {
        ElCard,
        ElForm,
        ElFormItem,
        ElInput,
        ElButton,
    },
    data() {
        return {
            RegisterData: {
                Email: '',
                Username: '',
                Password: '',
                Registration_Time: '',
                Captcha: '',
            },
            rules: {
                Email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
                ],
                Username: [
                    { required: true, message: '输入用户名', trigger: 'blur' },
                    { min: 2, message: '用户名至少为 2 个字符', trigger: 'blur' },
                    { max: 10, message: '用户名最多为 10 个字符', trigger: 'blur' },
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
        handleRegister() {
            this.RegisterData.Registration_Time = new Date()
            this.$refs.RegisterForm.validate(valid => {
                if (!valid) { return }
                http.post('/auth/register', this.RegisterData, {
                })

                    .then((response) => {
                        const data = response.data;
                        if (data.status) {
                            this.toast.success(data.message);
                            setTimeout(() => {
                                this.$router.push('/login');
                            }, 3000);
                        } else {
                            this.toast.error(data.message);
                        }
                    })
                    .catch((error) => {
                        this.toast.error(error.data.message);
                    });
            });
        },
        goToLogin() {
            this.$router.push('/login');
        },
        recoverPassword() {
            return this.toast.error("暂时无法使用");
        },
        generateCaptcha() {

            http.get('/auth/captcha', {
                credentials: 'include',
                responseType: 'text', // 指定响应的数据类型为文本
            })
                .then(response => {
                    this.captchaImage = 'data:image/svg+xml;base64,' + btoa(response.data);
                    this.RegisterData.captcha = '';
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
.Register-title {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
}



.el-button--primary {
    width: 100%;
}
</style>
