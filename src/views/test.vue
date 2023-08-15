<template>
    <div>
        <p>{{ userInfo }}</p>
        <p>{{ userInfo.username }}</p>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            userInfo: {} // 初始化 userInfo 数据
        };
    },
    mounted() {
        // 在组件挂载后，从 localStorage 中读取 userInfo 数据
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (storedUserInfo) {
            this.userInfo = storedUserInfo; // 将数据存储到 userInfo 属性中
        }
        console.log(this.userInfo);
    }
};
</script>
  