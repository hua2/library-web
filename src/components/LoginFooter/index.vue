<template>
  <div class="footer">
    <div class="footer-title flex justify-between">
      <div class="f-t-icon flex items-center">
        <img src="../../assets/img/footer-inquiry.png" alt="" />
        <span>智能询盘</span>
      </div>
      <div class="f-t-icon flex items-center">
        <img src="../../assets/img/footer-inquiry.png" alt="" />
        <span>海量商品</span>
      </div>
      <div class="f-t-icon flex items-center">
        <img src="../../assets/img/footer-inquiry.png" alt="" />
        <span>全线低价</span>
      </div>
      <div class="f-t-icon flex items-center">
        <img src="../../assets/img/footer-inquiry.png" alt="" />
        <span>服务至上</span>
      </div>
    </div>
    <div class="footer-info text-12">
      <ul class="flex justify-between">
        <li>
          <a
            href="https://www.jiaomaenergy.com/about"
            target="_blank"
          >公司简介</a>
        </li>
        <li>
          <a
            href="https://www.jiaomaenergy.com/about#connect"
            target="_blank"
          >联系我们</a>
        </li>
        <li>
          <a
            href="https://www.jiaomaenergy.com/about#connect"
            target="_blank"
          >商务合作</a>
        </li>
        <li>|</li>
        <!--        <li><a href="/help/operate/problem" target="_blank">常见问题</a></li>-->
        <!--        <li><a href="/help/operate/bill" target="_blank">发票须知</a></li>-->
        <!--        <li><a href="/help/operate/payWay" target="_blank">支付方式</a></li>-->
        <!--        <li>|</li>-->
        <!--        <li><a href="/help/delivery/answer" target="_blank">配送答疑</a></li>-->
        <!--        <li><a href="/help/service/suggest" target="_blank">投诉与建议</a></li>-->
      </ul>
      <p class="text-center mt-12">
        京ICP备160522236 | 京ICP证130000号 | 京公网安备11010101010101号
        2019-2020© JM.energy
      </p>
    </div>
  </div>
</template>

<script>
/**
 * footer通用模块
 * @author lyh
 * @date 2019-11-27
 */
export default {
  name: 'LoginFooter'
}
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  margin: 0 auto;
  .footer-title {
    width: 909px;
    margin: 0 auto;
    .f-t-icon {
      height: 96px;
      img {
        width: 38px;
        height: 39px;
      }
      span {
        width: 109px;
        height: 38px;
        margin-left: 22px;
        font-size: 27px;
        font-weight: 800;
        color: rgba(68, 68, 68, 1);
        line-height: 38px;
      }
    }
  }
  .footer-info {
    width: 600px;
    color: #666666;
    margin: 0 auto;
  }
}
</style>
