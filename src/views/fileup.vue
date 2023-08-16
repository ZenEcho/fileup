<template>
  <section class="main-section"
    style="position: sticky; top: 0px; z-index: 10; background-color: #00BCD4; ">
    <Navbar></Navbar>
  </section>
  <full-page :options="options" id="fullpage" ref="fullpage">
    <div class="section" id="section0">
      <div class="app_neme mx-auto">
        <img src="src/assets/logo.ico">
        <h1>盘络上传</h1>
      </div>
      <h2 class="text-light text-center p-5">盘络图床开发的浏览器扩展程序，为用户提供简单快速的文件上传功能，使用户可以快速获取外链并分享！</h2>
      <div class="text-center">
        <a class="btn btn-primary btn-lg DownloadButton"
          href="https://microsoftedge.microsoft.com/addons/detail/%E7%9B%98%E7%BB%9C%E4%B8%8A%E4%BC%A0/knmklgmbbbaadnfokcokobnlihdiiloe"
          target="_blank"><i class="bi bi-browser-edge"></i> Edge下载</a>
        <a class="btn btn-primary btn-lg DownloadButton"
          href="https://chrome.google.com/webstore/detail/%E7%9B%98%E7%BB%9C%E4%B8%8A%E4%BC%A0/lhbncdbejjjbbljkdplddajgmeconcnk"
          target="_blank"><i class="bi bi-browser-chrome"></i> Chrome下载</a>
        <a class="btn btn-primary btn-lg DownloadButton"
          href="https://addons.mozilla.org/zh-CN/firefox/addon/%E7%9B%98%E7%BB%9C%E4%B8%8A%E4%BC%A0/" target="_blank"><i
            class="bi bi-browser-firefox"></i> Firefox下载</a>
      </div>
    </div>
    <div class="section text-center" id="section1">
      <div class="slide active">
        <h1>功能超丰富的上传功能</h1>
        <div class="image-container">
          <img src="src/assets/images/sc.png" alt="上传页面">
        </div>
        <span class="text-center text-white p-2">拖拽上传、粘贴上传、其中包括网络资源和本地资源</span>
      </div>
      <div class="slide">
        <h1>多程序支持的配置</h1>
        <div class="image-container">
          <img src="src/assets/images/pz.png" alt="配置页面">
        </div>
        <span
          class="text-center text-white p-2">支持:兰空程序、简单程序、imgurl程序、chevereto程序、hellohao程序、sm.ms图床、imgur图床、腾讯云cos、阿里云oss、aws
          s3、自定义上传等</span>
      </div>
      <div class="slide">
        <h1>记录上传的每一刻</h1>
        <div class="image-container">
          <img src="src/assets/images/jl.png" alt="上传记录">
        </div>
        <span class="text-center text-white p-2">存储你的上传记录,下次使用更方便</span>
      </div>
    </div>
    <div class="section" id="section2">
      <h1 class="mx-auto" data-text="功能展示,准备👌了吗">功能展示,准备</h1>
      <div class="button text-center">
        <button id="Function_Start_button">请先安装插件</button>
      </div>
    </div>
    <div class="section text-center" id="section3">
      <div class="slide active">
        <h1>粘贴上传</h1>
        <div class="image-container">
          <img src="https://cdn-us.imgs.moe/2023/07/04/64a414475a4ec.gif" alt="粘贴上传">
        </div>
        <span
          class="text-center text-white p-2">"粘贴上传"便捷的文件上传功能，支持直接粘贴图片数据、图片链接或本地文件到上传框，实现快速上传。省去了繁琐的选择步骤，只需简单复制并粘贴，即可将文件上传。</span>
      </div>
      <div class="slide ">
        <h1>拖拽上传</h1>
        <div class="image-container">
          <img src="https://cdn-us.imgs.moe/2023/07/04/64a4145276e67.gif" alt="粘贴上传">
        </div>
        <span
          class="text-center text-white p-2">"拖拽上传"是便捷的文件上传方式。只需将文件从本地拖动到指定区域即可完成上传，还可以快速拖拽多个文件或频繁上传文件，提高工作效率，为用户带来便利和舒适的上传体验。</span>
      </div>
      <div class="slide ">
        <h1>右键上传</h1>
        <div class="image-container">
          <img src="https://cdn-us.imgs.moe/2023/07/04/64a414574dba6.gif" alt="粘贴上传">
        </div>
        <span
          class="text-center text-white p-2">"右键上传"是浏览器右键菜单中的便捷文件上传方式。用户只需在网页上对着图片右键点击，选择上传选项，即可完成文件上传。用户可以在浏览网页的同时，快速上传图片。</span>
      </div>
      <div class="slide ">
        <div class="image-container">
          <h1>GitHub插入</h1>
          <img src="https://cdn-us.imgs.moe/2023/06/06/647f3b9b0fb88.gif" alt="GitHub测试">
          <h1>Typecho插入</h1>
          <img src="https://cdn-us.imgs.moe/2023/06/06/647f3b9b590e1.gif" alt="ty测试">
          <h1>WordPress插入</h1>
          <img src="https://cdn-us.imgs.moe/2023/06/06/647f3b9bc6a46.gif" alt="wp测试">
        </div>
        <span class="text-center text-white p-2">盘络上传独家功能,自动将上传的图片插入到编辑框,<a
            href="https://github.com/ZenEcho/PLExtension/blob/master/%E8%87%AA%E5%8A%A8%E6%8F%92%E5%85%A5%E6%94%AF%E6%8C%81.md">更多插入支持查看</a></span>
      </div>
    </div>
    <div class="section  text-center" id="section4">
      <h1>了解扩展最新消息</h1>
      <h2><a href="http://pnglog.com/">关注盘洛图床</a></h2>
      <div class="privacy mx-auto">
        <p>
          <a class="btn btn-primary btn-lg " href="https://github.com/ZenEcho/fileup.dev" target="_blank"><i
              class="bi bi-github"></i> 页面项目 GitHub</a>
          <a class="btn btn-primary btn-lg " href="https://github.com/ZenEcho/PLExtension" target="_blank"><i
              class="bi bi-github"></i> 扩展项目 GitHub</a>
        </p>
        <p><a href="https://icp.gov.moe/?keyword=20234578" target="_blank">萌ICP备20234578号</a></p>
      </div>
    </div>
  </full-page>
</template>
<script>
let Play_begins = false;

export default {
  data() {
    return {
      options: {
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],//页码后缀
        // loopTop: true,//无限循环
        // loopBottom: true,
        autoScrolling: false,
        // navigation: true,//开启导航条
        // navigationTooltips: ['首页', '介绍', '功能', '展示', '关注'],//导航提示内容
        showActiveTooltip: true, //显示导航提示
        afterLoad: function (origin, destination, direction) {
          if (destination.index == 2) {
            if (Play_begins == true) { return; }
            
            window.postMessage({ type: 'Detect_installation_status', data: "莫西莫西,盘络你在吗?" }, '*');
            Play_begins = true
          }


        }
      }
    };
  },
  beforeDestroy() {

  },
  mounted() {
    // document.title = "盘络上传";
    // const favicon = document.querySelector('link[rel="icon"]');
    // favicon.href = "src/assets/logo.ico";

  },
}
</script>
<style scoped>
@import '@/assets/css/fileup/main.css';
</style>

