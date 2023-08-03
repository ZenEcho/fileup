<template>
   <section class="main-section">
    <Navbar></Navbar>
  </section>
  <main>
    盘络上传扩展
  </main>
</template>
<script>
export default {
  mounted() {
    document.title = "盘络上传";
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = "src/assets/logo.ico";
  },
}
</script>