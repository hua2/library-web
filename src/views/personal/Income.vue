<template>
  <div class="tip">
    <PersonalHeader text="关于收益" />
    <div class="tip-content">
      <h5>1. 稿费绩效</h5>
      <p>• 按销售额40%返利给投稿人。</p>
      <p>• 投稿人可预览账户单笔以及累计返利金额，但是没有自行提取权。</p>
      <h5>2. 稿费发放周期</h5>
      <p>• 由公司财务按时统计于25日发放。</p>
      <p>• 当月稿费次月发放（例如：9月稿费于10月25日发放）</p>
      <h5>3. 稿费发放方式</h5>
      <p>• 目前是以“银行转账”的方式来支付稿费。</p>
      <p>• 请提供您个人真实、有效的“招商银行”的储蓄卡账号信息，以便能按时收到稿费。</p>
      <h5>4. 稿费相关的个人所得税</h5>
      <p>• 作为代扣代缴义务人，能源图库将按照国家有关法律法规的规定，按照分成后的稿费金额计算并代为扣除和缴纳您的个人所得税。</p>
      <h5>5. 更多常见问题</h5>
      <p>• 撤片: 是指已经在销售报告中体现并支付稿费给您后，客户取消使用相应内容所产生的退款。</p>
    </div>
  </div>
</template>

<script>
/**
 * 个人中心-提示(关于收益)模块
 * @author lyh
 * @date 2021-01-12
 */
import PersonalHeader from '@/components/PersonalHeader/index'
export default {
  name: 'Notice',
  components: { PersonalHeader }
}
</script>

<style scoped>

</style>
