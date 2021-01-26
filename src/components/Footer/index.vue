<template>
  <div class="footer">
    <ul class="flex justify-center">
      <li @click="$router.push('/info/about')">关于我们</li>
      <li @click="$router.push('/info/authorize')">授权协议</li>
    </ul>
    <div class="footer-nav">
      <div class="text-center">
        <p> 地址：北京市东城区广渠门内领行国际3-2-1201</p>
        <p> 邮箱：304219360@qq.com  电话：18513394919</p>
        <p><a href="https://beian.miit.gov.cn" target="_blank">京ICP备18043511号</a> Copyright <span>©2019 - {{ new Date().getFullYear() }}</span> 北京角马能源科技有限公司</p>
      </div>
      <el-backtop>
        <img src="../../assets/img/go-back.png" alt="" />
      </el-backtop>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  height: fit-content;
  padding-bottom: 48px;
  color: #FFFFFF;
  background: #1A1A1A;
  ul{
    cursor: pointer;
    font-weight: 500;
    letter-spacing: 1px;
    height: 84px;
    line-height: 84px;
    border-bottom: 1px solid #494949;
    li{
      margin-right: 64px;
      transition: all 0.3s ease;
      &:nth-child(2){
        margin-right: unset;
      }
      &:hover{
        color: #909399;
      }
    }
  }
  .footer-nav {
    max-width: 1280px;
    margin: 0 auto;
    font-size: 16px;
    p{
      margin-top: 24px;
      a {
        transition: all 0.3s ease;
        &:hover{
          color: #909399;
        }
      }
    }

  }
}
</style>
