<template>
  <header style="position: sticky; top: 0px; z-index: 10; background-color: #0F62FE; ">
    <Navbar></Navbar>
  </header>
  <section id="section0">
    <div>
      <div class="app_neme mx-auto">
        <h1>盘络上传</h1>
      </div>
      <h2 class="text-light text-center p-5">为用户提供简单快速的文件上传功能，使用户可以快速获取外链并分享！</h2>
      <div class="text-center">
        <a class="btn btn-danger btn-lg DownloadButton"
          href="https://microsoftedge.microsoft.com/addons/detail/%E7%9B%98%E7%BB%9C%E4%B8%8A%E4%BC%A0/knmklgmbbbaadnfokcokobnlihdiiloe"
          target="_blank"> Edge下载</a>
        <a class="btn btn-warning btn-lg DownloadButton"
          href="https://chrome.google.com/webstore/detail/%E7%9B%98%E7%BB%9C%E4%B8%8A%E4%BC%A0/lhbncdbejjjbbljkdplddajgmeconcnk"
          target="_blank"> Chrome下载</a>
        <a class="btn btn-danger btn-lg DownloadButton"
          href="https://addons.mozilla.org/zh-CN/firefox/addon/%E7%9B%98%E7%BB%9C%E4%B8%8A%E4%BC%A0/" target="_blank">
          Firefox下载</a>

      </div>
    </div>
  </section>
  <section id="section1">
    <div class="Function-illustrate container">
      <h3>功能优势</h3>
      <h1>简约高效</h1>
      <p>
        <span>专注图床存储</span><br>
        <span>多方式上传，就很方便</span>
      </p>
    </div>
    <div id="Function" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://cdn-us.imgs.moe/2023/07/04/64a414475a4ec.gif" alt="粘贴上传" class="d-block w-100 mx-auto">
          <h2>粘贴上传</h2>
        </div>
        <div class="carousel-item">
          <img src="https://cdn-us.imgs.moe/2023/07/04/64a4145276e67.gif" alt="拖拽上传" class="d-block w-100 mx-auto">
          <h2>拖拽上传</h2>
        </div>
        <div class="carousel-item">
          <img src="https://cdn-us.imgs.moe/2023/07/04/64a414574dba6.gif" alt="右键上传" class="d-block w-100 mx-auto">
          <h2>右键上传</h2>
        </div>
      </div>
      <div class="carousel-indicators" style="position: static;">
        <button type="button" data-bs-target="#Function" data-bs-slide-to="0" class="active" aria-current="true"
          aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#Function" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#Function" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#Function" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#Function" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </section>
  <section id="section2">
    <div class="Auto-Insert">
      <div class="Auto-Insert-left">
        <div class="Auto-Insert-illustrate">
          <p><span class="Auto-Insert-t">盘络定制功能</span></p>
          <p>
          <h1 class="Auto-Insert-h">编辑框自动插入</h1>
          </p>
          <p><span class="Auto-Insert-i">这是一个非常方便的功能，它可以自动将您上传的图片插入到输入框/编辑框里。</span></p>
        </div>
        <div style="padding: 1em;">
          <table>
            <tr>
              <td colspan="4"><strong>经过测试的适配情况</strong></td>
            </tr>
            <tr>
              <td>Discuz程序论坛</td>
              <td>支持</td>
              <td>支持</td>
              <td>支持</td>
            </tr>
            <tr>
              <td>Xiuno程序论坛</td>
              <td>支持</td>
              <td>支持</td>
              <td>支持</td>
            </tr>
            <tr>
              <td>typecho博客</td>
              <td>无</td>
              <td>无</td>
              <td>支持(文章)</td>
            </tr>
            <tr>
              <td>WordPress博客(6.2以上)</td>
              <td>无</td>
              <td>无</td>
              <td>支持(古腾堡)</td>
            </tr>
            <tr>
              <td>Halo建站(2.6以上)</td>
              <td>无</td>
              <td>无</td>
              <td>支持(默认编辑器)</td>
            </tr>
            <tr>
              <td>emlog博客</td>
              <td>无</td>
              <td>无</td>
              <td>支持</td>
            </tr>
            <tr>
              <td>zblog博客</td>
              <td>无</td>
              <td>无</td>
              <td>支持</td>
            </tr>
            <tr>
              <td colspan="4"><strong><a
                    href="https://github.com/ZenEcho/PLExtension/blob/master/%E8%87%AA%E5%8A%A8%E6%8F%92%E5%85%A5%E6%94%AF%E6%8C%81.md"
                    target="_blank" rel="noopener noreferrer">更多适配</a></strong></td>
            </tr>
          </table>
        </div>

      </div>
      <div class="Auto-Insert-right" >
        <AutoInsert></AutoInsert>
      </div>
    </div>
  </section>

  <section id="section4">
    <h1>了解扩展最新消息</h1>
    <h2><a href="https://t.me/pnglog">加入讨论组</a></h2>
    <div class="privacy mx-auto">
      <p>
        <a class="btn btn-primary btn-lg DownloadButton " href="https://github.com/ZenEcho/fileup.dev" target="_blank"><i
            class="bi bi-github"></i> 页面项目 GitHub</a>
        <a class="btn btn-primary btn-lg DownloadButton" href="https://github.com/ZenEcho/PLExtension" target="_blank"><i
            class="bi bi-github"></i> 扩展项目 GitHub</a>
      </p>
      <p><a href="https://icp.gov.moe/?keyword=20234578" target="_blank">萌ICP备20234578号</a></p>
    </div>
  </section>
</template>
<script>
import AutoInsert from '@/components/AutoInsert.vue';

let Play_begins = false;

export default {
  components: {
    AutoInsert,
  },
  data() {
    return {
    };
  },
  beforeDestroy() {

  },
  mounted() {


  },
}
</script>
<style scoped>
@import '@/assets/css/fileup/main.css';
</style>

