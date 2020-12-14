<template>
  <div class="footer">
    <ul class="flex justify-center">
      <li>关于我们</li>
      <li>授权信息</li>
      <li>关于我们</li>
    </ul>
    <div class="footer-nav">
      <div class="text-center">
        <p> 地址：北京市东城区广渠门内领行国际3号楼1201</p>
        <p> 邮箱：picture@inengyuan.com   电话：010-67188377</p>
        <p>京ICP备18043511号 Copyright © 2019-2020 北京角马能源科技有限公司</p>
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
      &:nth-child(3){
        margin-right: unset;
      }
    }
  }
  .footer-nav {
    max-width: 1280px;
    margin: 0 auto;
    font-size: 16px;
    p{
      margin-top: 24px;
    }

  }
}
</style>
