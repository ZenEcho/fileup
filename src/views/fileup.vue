<template>
  <header style="position: sticky; top: 0px; z-index: 10; background-color: #0F62FE; ">
    <Navbar></Navbar>
  </header>
  <section id="section0">
    <div>
      <div class="app_neme mx-auto">
        <h1>盘络上传</h1>
      </div>
      <h2 class="text-light text-center p-5">为您提供简单快速的文件上传，让您能够迅速获取外链并分享！</h2>
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
  <section style="background-color: white;padding-top:150px;">
    <div class="Functiondemo" style="background-color: aliceblue;">
      <div class="Function-illustrate container">
        <h3>将方块拖拽到虚线框里</h3>
        <h1>拖拽上传</h1>
        <h2 class="watermark">拖拽上传</h2>
        <div class="drag-drop-container">
          <div class="dragElement" draggable="true" @dragstart="dragStart" @dragend="dragEnd"
            style="width: 100px; height: 100px; background-color: blue; margin: 10px; cursor: pointer;">
          </div>
          <div class="dropZone" @dragover.prevent="dragOver" @drop="drop"
            style="width: 300px; height: 200px; border: 2px dashed #ccc; margin: 10px;">
            <p style="margin: 0; text-align: center;">将方块拖拽到这里</p>
          </div>
        </div>
      </div>
    </div>
    <div class="Functiondemo">
      <div class="Function-illustrate container">
        <h3>对着方块右键</h3>
        <h1>右键上传</h1>
        <h2 class="watermark">右键上传</h2>
        <div class="center-flex">
          <div class="blue-box" @contextmenu.prevent="openContextMenu"></div>
        </div>
        <div v-if="showContextMenu" class="context-menu" :style="menuStyle">
          <p @click="closeContextMenu(0)">其他...</p>
          <p @click="closeContextMenu(1)">上传图片</p>
          <p @click="closeContextMenu(0)">其他...</p>
        </div>
      </div>
    </div>
    <div class="Functiondemo" style="background-color: aliceblue;">
      <div class="Function-illustrate container">
        <h3>在虚线框里粘贴</h3>
        <h1>粘贴上传</h1>
        <h2 class="watermark">粘贴上传</h2>
        <div class="center-flex">
          <div class="pasteZone" @paste="handlePaste">
            <p>在此处粘贴</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="section2">
    <div class="Auto-Insert">
      <div class="Auto-Insert-left">
        <div class="Auto-Insert-illustrate">
          <p><span class="Auto-Insert-t">临书易字</span></p>
          <p>
          <h1 class="Auto-Insert-h">编辑框自动插入</h1>
          </p>
          <p><span class="Auto-Insert-i">一个非常方便的功能，它可以自动将您上传的图片插入到输入框/编辑框里。</span></p>
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
                    target="_blank" rel="noopener noreferrer">更多适配详细</a></strong></td>
            </tr>
          </table>
        </div>

      </div>
      <div class="Auto-Insert-right">
        <AutoInsert></AutoInsert>
      </div>
    </div>
  </section>

  <section id="section4">
    <div style="color: #0F62FE;">
      <h4 style="font-weight: bold;">心❤️之所属</h4>
      <h1 style="color: black;font-weight: bold;">体验优化,畅所澎湃</h1>
      <p style="color: black;">盘络上传,针对站点进行单独定制优化,体验更方便、更快速、太棒了!</p>
    </div>
    <h2
      style="top: 100px; position: absolute; font-size: 150px; color: rgb(0 0 0 / 10%); pointer-events: none; transform: rotate(45deg); left: 0; z-index: 0;">
      体验</h2>
    <div class="Belongs">
      <div class="BelongsHead">
        <div class="BelongsHead-item">
          <h2>V2EX</h2>
          <p>一个面向程序员、极客人群的分享交流社区</p>
        </div>
        <div class="BelongsHead-item">
          <h2>Discuz</h2>
          <p>开源社交建站系统,全球成熟度最高、覆盖率最大的建站系统之一</p>
        </div>
        <div class="BelongsHead-item">
          <h2>Nodeseek</h2>
          <p>主机爱好者打造高品质社区，传递行业新闻，分享技术心得</p>
        </div>
      </div>

      <div class="BelongsContent">
        <p>盘络上传针对站点定制优化，链接智能识别并转换为图片。再也不怕萌新不会用图床了！</p>
        <div class="BelongsBoxIMG">
          <span class="BelongsBoxSpan"></span>
          <div class="BelongsIMG">
            <img src="https://cdn-us.imgs.moe/2023/08/29/64ed42e130cd8.png" alt="未转换" title="未转换">
          </div>
          <div class="BelongsIMG">
            <img src="https://cdn-us.imgs.moe/2023/08/29/64ed42e1aa87d.png" alt="已转换" title="已转换">
          </div>
        </div>

      </div>
    </div>
  </section>
  <section>
    <div class="friend-links-container">
      <div class="friend-links-slider" id="friendLinksSlider">
        <div class="friend-link">
          <img src="https://wmimg.com/favicon.ico" >
          <div class="link-info">
            <a href="https://wmimg.com/" target="_blank">无铭图床</a>
            <span class="link-description">您的极致云上图床！</span>
          </div>
        </div>
        <div class="friend-link">
          <img src="https://jkapi.com/favicon.ico" >
          <div class="link-info">
            <a href="https://jkapi.com/" target="_blank">无铭API</a>
            <span class="link-description">稳定、快速、免费的 API 接口服务</span>
          </div>
        </div>
        <div class="friend-link">
          <img src="http://link.mhimg.cn/favicon.ico" >
          <div class="link-info">
            <a href="https://fileup.dev/" target="_blank">萌虎导航</a>
            <span class="link-description">萌虎导航</span>
          </div>
        </div>
        <div class="friend-link">
          <img src="https://www.freeimg.cn/favicon.ico" >
          <div class="link-info">
            <a href="https://www.freeimg.cn/" target="_blank">FreeImg图床</a>
            <span class="link-description">上传图片获得外链</span>
          </div>
        </div>
        <div class="friend-link">
          <img src="https://pnglog.com/favicon.ico" >
          <div class="link-info">
            <a href="https://pnglog.com/" target="_blank">盘络图床</a>
            <span class="link-description">盘络如柏芝</span>
          </div>
        </div>
       
      </div>
    </div>
  </section>
  <section id="section5">
    <h1>了解扩展最新消息</h1>
    <h2><a href="https://t.me/pnglog">加入讨论组</a></h2>
    <div class="privacy mx-auto">
      <p>
        <a class="btn btn-primary btn-lg DownloadButton" href="https://github.com/ZenEcho/PLExtension" target="_blank"><i
            class="bi bi-github"></i> 扩展项目 GitHub</a>
      </p>
      <p><a href="https://icp.gov.moe/?keyword=20234578" target="_blank">萌ICP备20234578号</a></p>
    </div>
  </section>
</template>
<script>
import AutoInsert from '@/components/AutoInsert.vue';
export default {
  components: {
    AutoInsert,
  },
  data() {
    return {
      showContextMenu: false,
      menuStyle: {
        top: '0px',
        left: '0px'
      },
    };
  },
  methods: {
    openContextMenu(event) {
      this.menuStyle.top = event.clientY + 'px';
      this.menuStyle.left = event.clientX + 'px';
      this.showContextMenu = true;

      // 添加点击外部关闭菜单的监听器
      window.addEventListener('click', this.closeContextMenu);
    },
    closeContextMenu(e) {
      this.showContextMenu = false;
      window.removeEventListener('click', this.closeContextMenu);
      if (e === 1) {
        let Send = {
          title: "通知",
          type: "success",
          content: `右键上传成功`,
          duration: 10
        };
        window.postMessage({ type: 'PLNotification', data: Send }, "*");
        document.querySelector('.blue-box').className = "blue-box flicker-backgroundColor"
      } else {
        document.querySelector('.blue-box').className = "blue-box flicker-backgroundColorRed"
      }
      setTimeout(() => {
        document.querySelector('.blue-box').className = "blue-box"
      }, 5000);
    },
    handlePaste(event) {
      event.preventDefault();
      let Send = {
        title: "通知",
        type: "success",
        content: `粘贴上传成功`,
        duration: 10
      };
      window.postMessage({ type: 'PLNotification', data: Send }, "*");
      let pasteZone = document.querySelector('.pasteZone')
      let p = document.querySelector('.pasteZone p')
      pasteZone.classList.add("flicker-border")
      p.textContent = "粘贴上传成功"
      setTimeout(() => {
        p.textContent = "在此处粘贴"
        pasteZone.classList.remove("flicker-border")
      }, 5000);
    },
    dragStart(event) {
      // 可以在此设置需要传递的数据
      event.dataTransfer.setData("text/plain", "dragging");
      event.target.style.opacity = 0.3;
    },
    dragEnd(event) {
      // 拖拽操作结束时的逻辑
      event.target.style.opacity = 1;
    },
    dragOver(event) {
      // 可能需要阻止默认行为来允许放置
      event.preventDefault();
    },
    drop(event) {
      event.preventDefault();
      document.querySelector('.dropZone p').textContent = "拖拽上传成功"
      event.target.classList.add("flicker-border")
      let Send = {
        title: "通知",
        type: "success",
        content: `拖拽上传成功`,
        duration: 10
      };
      window.postMessage({ type: 'PLNotification', data: Send }, "*");
      setTimeout(() => {
        document.querySelector('.dropZone p').textContent = "将方块拖拽到这里"
        event.target.classList.remove("flicker-border")
      }, 5000);
    },
    initSlider() {
      const slider = document.getElementById('friendLinksSlider');
      let items = slider.children;
      let currentX = 0;



      const moveSlider = () => {
        currentX -= 1;
        if (Math.abs(currentX) >= items[0].offsetWidth + 20) {
          slider.appendChild(items[0]);
          currentX += items[0].offsetWidth + 20;
          items = slider.children;
        }
        slider.style.transform = `translateX(${currentX}px)`;
        console.log(currentX)
      }

      setInterval(moveSlider, 30); // 每30ms移动一次
    }
  },
  mounted() {
    this.initSlider();
  },
  beforeDestroy() {
    // 确保移除监听器
    window.removeEventListener('click', this.closeContextMenu);
  }
}
</script>
<style scoped>
@import '@/assets/css/fileup/main.css';
</style>

