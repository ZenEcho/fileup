<template>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="Password" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Age" prop="age">
            <el-input v-model.number="ruleForm.age" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const checkAge = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('Please input the age'))
    }
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error('Please input digits'))
        } else {
            if (value < 18) {
                callback(new Error('Age must be greater than 18'))
            } else {
                callback()
            }
        }
    }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    } else {
        if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password again'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("Two inputs don't match!"))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    pass: '',
    checkPass: '',
    age: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    age: [{ validator: checkAge, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>






<!-- <template>
    <div class="login-container">
        <h2>后台登录</h2>
        <form @submit.prevent="Verification">
            <label for="EmailAddress">邮箱:</label>
            <input type="text" id="EmailAddress" v-model="loginInfo.EmailAddress" required>
            <label for="password">密码:</label>
            <input type="password" id="password" v-model="loginInfo.password" required>
            <div>
                <img :src="captchaImage" @click="refreshCaptcha" />
                <input v-model="captcha" placeholder="Enter the Captcha" />
            </div>
            <button type="submit">登录</button>
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
            loginInfo: {
                EmailAddress: '',
                password: '',
                last_login_time: '',
            },
            captcha: '',
            captchaImage: '',
        };
    },
    methods: {
        Verification() {
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
                        this.login()
                    } else {
                        this.toast.error(data.message);
                    }

                })
                .catch((error) => {
                    // Handle login failure
                    console.error(error);
                });
        },
        login() {
            const loginApiUrl = 'http://localhost:3199/login';
            this.loginInfo.last_login_time = new Date()
            fetch(loginApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.loginInfo),
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
        },
        refreshCaptcha() {
            // Fetch a new captcha image from the backend
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
   -->

<!-- <style>
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
   -->