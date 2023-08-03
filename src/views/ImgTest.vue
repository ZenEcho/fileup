<script setup>
import Header from '../components/imgtest/header.vue'
import leftButton from '../components/imgtest/left-button.vue'
</script>
<template>
  <section class="main-section">
    <Navbar></Navbar>
    <Header></Header>
  </section>
  <div class="container-fluid">
    <section class="wrapperBox" v-if="isCountdownFinished">
      <div class="box" v-for="(item, index) in RenderingData.slice(0, 6)" :key="index">
        <h3><a :href="item.link" target="_blank">{{ item.name }}</a></h3>
        <p style="font-size: 0.9em;">{{ item.introduce }}</p>
        <div class="image">
          <div class="loading" v-if="!item.loaded"></div>
          <div class="alert alert-danger" role="alert" v-if="item.loadFailed">图片加载失败</div>
          <img :src="item.image" :style="{ display: item.loaded ? 'block' : 'none' }" @load="onImageLoad(item)"
            @error="onImageError(item)" v-if="!item.loadFailed" />
        </div>
        <p class="text-center row" style="font-size: 0.9em;">
          <span class="loadingTime col" style="color: #dc3545;">{{ item.loadTime }}</span>
          <span class="imageSize col" style="color: #198754;">{{ item.fileSizeInMB }}</span>
        </p>
        <span class="IsIcons">
          <span v-if="item.CDN" class="isCDN" data-bs-toggle="popover" data-bs-trigger="hover focus"
            data-bs-content="CDN"></span>
          <span v-if="item.region" class="isCN" data-bs-toggle="popover" data-bs-trigger="hover focus"
            data-bs-content="海外"></span>
        </span>
      </div>
    </section>
    <div v-else class="text-center">
      {{ countdown }} 秒后获取数据...
    </div>
    <div class="alert alert-dark text-center" role="alert">
      电脑配置越高加载时间越精准
    </div>
  </div>
  <section class="footer-section">
    <footer>
      <div class="row">
        <p><span>Copyright 2023 欢迎访问图床大比拼</span></p>
        <p><a href="https://github.com/ZenEcho/fileup.dev">GitHub</a>,<a href="https://fileup.dev/imgtest">2023免费图床</a>,<a
            href="https://fileup.dev/imgtest">国内外免费图床</a>,<a href="https://fileup.dev/imgtest">最新2023免费图床</a>
        </p>
      </div>
    </footer>
  </section>
  <leftButton :data="shuffledData" @selected-indexes="selectedData"></leftButton>
</template>

<script>
export default {
  components: {
    leftButton, // 注册子组件
  },
  data() {
    return {
      data: [], //原始数据
      shuffledData: [], // 洗牌后的数据
      RenderingData: [], // 实际渲染数据
      imageError: false, // 加载错误
      countdown: 3, // 倒计时时间，单位为秒
      isCountdownFinished: false, // 倒计时是否完成的标志位
    };
  },

  methods: {
    startCountdown() {
      const countdownInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(countdownInterval);
          this.isCountdownFinished = true; // 设置标志位为 true
          this.fetchData(); // 获取数据
        }
      }, 1000); // 每隔一秒执行一次
    },
    fetchData() {
      fetch('https://fileup.dev/imgtestData.json')
        .then(response => response.json())
        .then(data => {
          this.data = data.data;
          this.shuffleData();
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    shuffleData() {
      const array = this.data;
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      this.shuffledData = array;
      this.PageRendering(this.shuffledData);
    },
    PageRendering(array) {
      array.forEach(item => {
        item.image += `?cache=${Date.now()}`;
      });
      this.RenderingData = array;
    },
    getImageSize(item) {
      fetch("https://cors-anywhere.pnglog.com/" + item.image, {
        method: 'HEAD'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.headers.get('content-length');
        })
        .then(fileSize => {
          if (!fileSize) {
            item.fileSizeInMB = "图片大小:数据为空"
          }
          const fileSizeInMB = (parseInt(fileSize) / (1024 * 1024)).toFixed(2);
          item.fileSizeInMB = "图片大小:" + fileSizeInMB + "MB"
        })
        .catch(error => {
          item.fileSizeInMB = "图片大小:获取失败"
        });

    },
    onImageLoad(item) {
      this.getImageSize(item);
      const startTime = parseInt(item.image.match(/cache=(\d+)/)[1]);
      if (!startTime) return;

      const endTime = Date.now();
      let loadTime = endTime - startTime
      item.loadTime = "加载时间:" + loadTime + "毫秒";
      item.loadFailed = false;
      item.loaded = true;
    },
    onImageError(item) {
      item.loaded = true;
      item.loadFailed = true;
      item.loadTime = "图片加载失败"
    },

    selectedData(selectedData) {
      console.log(selectedData);
      this.PageRendering(selectedData)
    },
  },
  mounted() {
    this.startCountdown();

    
    document.title = "盘络图床大对比";
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = "src/assets/images/up.ico";
  },
};
</script>


<style scoped>
@import '@/assets/css/imgtest/main.css';

p {
  font-size: 16px;
  margin: 0;
}

.main-section {
  background-image: linear-gradient(180deg, #0d6efd, #0dcaf0);
  font-size: 1.5em;
  color: white;
  display: flex;
  flex-direction: column;
  height: 90vh;
}

footer {
  padding: 1em;
  text-align: center;
}

.footer-section {
  color: white;
  background-image: linear-gradient(90deg, #0dcaf0, #20c997);
  box-shadow: 0 1rem 3rem rgba(33, 37, 41, .175);
}
</style>