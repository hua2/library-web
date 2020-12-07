<template>
  <div class="basic-layout">
    <Header />
    <div class="contain">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header/index'
import Footer from '@/components/Footer/index'
export default {
  name: 'BasicLayout',
  components: { Footer, Header }
}
</script>

<style scoped lang="scss">
.basic-layout {
  width: 100%;
  .contain {
    width: 1280px;
    height: fit-content;
    margin: 0 auto;
  }
}
</style>
