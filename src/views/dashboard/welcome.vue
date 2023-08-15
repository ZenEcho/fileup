<template>
    <div class="login-container">
        <div class="card">
            <div class="form-box">
                <LoginCard v-if="status === 0"></LoginCard>
                <RegisterCard v-else-if="status === 1"></RegisterCard>
            </div>
            <div>
                <div class="con-box right">
                    <h2>登录<span>图床对比</span></h2>
                    <LoginSvg></LoginSvg>
                    <el-form-item>
                        <span>没有账号?</span>
                        <el-button type="info" @click="goToRegister" link>注册</el-button>
                        <span>or</span>
                        <el-button type="info" @click="recoverPassword" link>找回密码</el-button>
                    </el-form-item>
                </div>
                <div class="con-box left">
                    <h2>注册<span>图床对比</span></h2>
                    <RegisterSvg></RegisterSvg>
                    <el-form-item>
                        <span>已注册?</span>
                        <el-button type="info" @click="goToLogin" link>登录</el-button>
                        <span>or</span>
                        <el-button type="info" @click="recoverPassword" link>找回密码</el-button>
                    </el-form-item>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script>
import LoginCard from '@/views/dashboard/Login.vue';
import RegisterCard from '@/views/dashboard/Register.vue';
import LoginSvg from '@/views/dashboard/LoginSvg.vue';
import RegisterSvg from '@/views/dashboard/RegisterSvg.vue';
import { useToast } from "vue-toastification";
export default {
    setup() {
        const toast = useToast();
        return { toast }
    },
    components: {
        LoginCard,
        RegisterCard,
        LoginSvg,
        RegisterSvg
    },
    data() {
        return {
            status: 0
        };
    },
    methods: {
        goToRegister() {
            let form_box = document.getElementsByClassName('form-box')[0];
            form_box.style.transform = 'translate(25em)';
            setTimeout(() => {
                this.status = 1
            }, 450);
        },
        goToLogin() {
            let form_box = document.getElementsByClassName('form-box')[0];
            form_box.style.transform = 'translate(0em)';
            setTimeout(() => {
                this.status = 0
            }, 450);
        },
        recoverPassword() {
            return this.toast.error("暂时无法使用");
        },
    }
};
</script>
  
<style scoped>
.form-box {
    width: 25em;
    height: 100%;
    transition: 0.5s ease-in-out;
    z-index: 2;
}

.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.card {
    width: 50em;
    height: 28em;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-card {
    padding: 1em;
    width: 25em;
    height: 34em;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 1em;
    border: 1px #eee solid;
    position: absolute;
    top: 50%;
    left: -2px;
    transform: translate(0%, -50%);
}

.Register-card {
    width: 25em;
    height: 34em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 50%;
    right: -2px;
    transform: translate(0%, -50%);
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 1em;
    border: 1px #eee solid;
}

.con-box {
    width: 50%;
    /* 弹性布局 垂直排列 居中 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* 绝对定位 居中 */
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
}

.con-box.left {
    left: -2%;
}

.con-box.right {
    right: -2%;
}

.con-box h2 {
    color: #8e9aaf;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 3px;
    text-align: center;
    margin-bottom: 4px;
}

.con-box p {
    font-size: 12px;
    letter-spacing: 2px;
    color: #8e9aaf;
    text-align: center;
}



.con-box img {
    width: 150px;
    height: 150px;
    opacity: 0.9;
    margin: 40px 0;
}


.con-box button:hover {
    background-color: #d3b7d8;
    color: #fff;
}

.el-button--primary {
    width: 100%;
}
</style>