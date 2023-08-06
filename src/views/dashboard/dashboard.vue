<template>
    <div>
        <h1>后台面板</h1>
        <!-- 其他后台面板内容 -->
        <button type="button" @click="verifyToken">验证Token</button>
    </div>
</template>
  
<script>
import { useToast } from "vue-toastification";
export default {
    setup() {
        const toast = useToast();
        return { toast }
    },
    created() {
        // 在Vue组件加载时进行Token验证
        this.verifyToken();
    },
    methods: {
        verifyToken() {
            const token = localStorage.getItem('token');
            const verifyTokenApiUrl = 'http://localhost:3199/verify-token';
            fetch(verifyTokenApiUrl, {
                method: 'GET',
                headers: {
                    Authorization: token, 
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        localStorage.token = ""
                        this.$router.push('/login');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log();
                    if(data.status){
                        this.toast.success(data.message);
                    }else{
                        this.toast.error(data.message);
                    }
                    
                })
                .catch((error) => {
                    this.toast.error(error.message);
                    this.$router.push('/login')
                    localStorage.token = ""
                    console.error(error);
                });
        },
    },
};
</script>
  