<template>
    <div class="Register-container">
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
    </div>
</template>
  
<script>
import { ElCard, ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import { useToast } from "vue-toastification";
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
                    { pattern: /^.{4}$/, message: '验证码为 4 个字符', trigger: 'blur' },
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
                fetch("http://localhost:3199/register", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.RegisterData),
                    credentials: 'include',
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
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
                        this.toast.error(error.message);
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
            fetch('http://localhost:3199/captcha', { credentials: 'include' })
                .then(response => response.text())
                .then(data => {
                    this.captchaImage = 'data:image/svg+xml;base64,' + btoa(data);
                    this.RegisterData.captcha = ''; // 清空用户输入的验证码
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
.Register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.Register-card {
    width: 24em;
    padding: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.Register-title {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
}

.Register-button {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.el-button--primary {
    width: 100%;
}
</style>

<!-- <template>
    <div class="Register-container">
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
                    // 3秒后跳转到'/Register'页面
                    setTimeout(() => {
                        this.$router.push('/Register');
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
  
<style scoped>
.Register-container {
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
   -->
  