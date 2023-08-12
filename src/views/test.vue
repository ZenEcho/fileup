<template>
    <div>
        <div >
            <h1>测试</h1>
            <!-- <p v-for="(color, index) in parsedColors" :key="index">{{ color }}</p> -->
        </div>
    </div>
</template>
  
<script>
import http from '@/http';
import cheerio from 'cheerio'; // 导入 cheerio 库

export default {
    data() {
        return {
            parsedColors: [], // 用来存储解析后的颜色数组
        };
    },
    mounted() {
        // 发送 GET 请求获取HTML内容
        // http.get('https://www.bootcss.com/p/websafecolors/')
        //     .then(response => {
        //         const html = response.data;
        //         const $ = cheerio.load(html); // 使用 cheerio 加载 HTML

        //         const colorElements = $('.color .html'); // 获取类名为 "html" 的元素集合

        //         colorElements.each((index, element) => {
        //             const colorText = $(element).text().trim(); // 获取元素的文本内容并去除首尾空格
        //             const hexValue = colorText.match(/#([0-9A-Fa-f]{6})/); // 从文本中提取十六进制值
        //             if (hexValue) {
        //                 const formattedColor = `--${hexValue[1]}: ${hexValue[0]};`; // 格式化为 "--000000: #000000;"
        //                 this.parsedColors.push(formattedColor); // 将格式化后的文本添加到数组中
        //             }
        //         });
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });
    },
};
</script>

  
<style scoped>
/* 样式可以根据需要自行添加 */
</style>
  