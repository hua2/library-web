<template>
  <div class="prompt w-full">
    <div class="prompt-info">
      <h2>请尽快完善基本信息</h2>
      <p>如有疑问或需要帮助，客服联系方式：<span>1501085963</span></p>
      <div class="p-i-btn">
        <el-button type="primary" size="small" @click="$router.push('/personal/account')">下一步</el-button>
        <el-button size="small" @click="$router.push('/')">稍后设置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Prompt'
}
</script>

<style scoped lang="scss">
.prompt{
  display: flex;
  align-items: center;
  justify-content: center;
  .prompt-info{
    width: 472px;
    height: auto;
    text-align: center;
    color: #000000;
    h2{
      font-size: 20px;
    }
    p{
      font-size: 12px;
      margin: 24px auto 32px;
      span{
      color: #D7262E;
      }
    }
    .p-i-btn{
      .el-button{
        width: 104px;
      }
    }
  }
}
</style>
