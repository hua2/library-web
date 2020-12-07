<template>
  <div class="other-layout">
    <Header />
    <div class="content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header/index'
import Footer from '@/components/Footer/index'
export default {
  name: 'OtherLayout',
  components: { Footer, Header }
}
</script>

<style scoped lang="scss">
.other-layout {
  min-width: 1144px;
  .content {
    width: 100%;
  }
}
</style>
