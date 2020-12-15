/**
 * user模块接口列表
 * @author lyh
 * @date 2019-07-08
 */

import axios from '@/utils/request' // 导入http中创建的axios实例

const user = {
  // 注册用户
  userRegister(data) {
    return axios.post(`/user/register`, data)
  },
  // 获取手机号验证码
  sendMobileIdentifyCode(params) {
    return axios.get(`/common/sendMobileIdentifyCode`, { params: params })
  },
  // 用户的登录
  userLogin(data) {
    return axios.post(`/user/pwdLogin`, data)
  },
  // 获取买家信息
  personInfo() {
    return axios.get(`/user/personInfo`)
  },
  // 验证验证码
  validateIdentifyCode(params) {
    return axios.get(`/common/validateIdentifyCode`, { params: params })
  },
  // 忘记密码
  forgetPwd(data) {
    return axios.post(`/user/forgetPwd`, data)
  },
  // 修改手机号码-第一次验证
  modifyMobileOne(data) {
    return axios.post(`/user/modifyMobile/identity`, data)
  },
  // 修改手机号码-第二次验证
  modifyMobileTwo(data) {
    return axios.post(`/user/modifyMobile`, data)
  },
  // 修改密码
  modifyPwd(data) {
    return axios.post(`/user/modifyPwd`, data)
  },

  // 修改个人信息
  modifyPersonInfo(data) {
    return axios.post(`/user/modifyPersonInfo`, data)
  },
  // 图片、文件、视频上传
  uploadPic(image, type) {
    const fd = new FormData()
    fd.append('file', image)
    fd.append('fileType', type)
    return axios.post(`/common/uploadPicture`, fd)
  },
  // 用户购买订单记录
  userOrderList(params) {
    return axios.get(`/userOrder/list`, { params: params })
  },
  // 用户图片下载列表
  userDownloadList(params) {
    return axios.get(`/userDownloadRecord/list`, { params: params })
  },
  // 用户图片收藏列表
  userCollectList(params) {
    return axios.get(`/userCollect/list`, { params: params })
  },
  // 用户图片取消收藏
  cancelCollect(params) {
    return axios.get(`/userCollect/cancel`, { params: params })
  },
  // 用户图片取消收藏多个
  cancelsCollect(params) {
    return axios.get(`/userCollect/cancels`, { params: params })
  },
  // 用户图片下载
  userDownloadRecord(params) {
    return axios.get(`/userDownloadRecord/download`, { params: params })
  },
  // 用户个人认证
  personalAuth(data) {
    return axios.post(`/userAuth/personalAuth`, data)
  },
  // 用户企业认证
  companyAuth(data) {
    return axios.post(`/userAuth/companyAuth`, data)
  },
  // 获取认证信息
  getUserAuthInfo(params) {
    return axios.get(`/userAuth/getUserAuthInfo`, { params: params })
  },
  // 修改认证信息
  modifyUserAuth(data) {
    return axios.post(`/userAuth/modifyUserAuth`, data)
  },
  // 图片分类栏目
  hideList(params) {
    return axios.get(`/column/hideList`, { params: params })
  },
  // 图片发布单图
  publishSingle(data) {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
    return axios.post(`/production/publishSingle`, formData)
  },
  // 图片查询个人展示
  personalList(params) {
    return axios.get(`/production/personal`, { params: params })
  },
  // 图片删除
  deleteProduct(params) {
    return axios.get(`/production/delete`, { params: params })
  },
  // 图片发布单图修改
  modifySingle(data) {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
    return axios.post(`/production/modifySingle`, formData)
  },
  // 图片编辑回显
  getInfoProduct(params) {
    return axios.get(`/production/getInfo`, { params: params })
  },
  // 图片上下架
  upDownProduct(params) {
    return axios.get(`/production/upDown`, { params: params })
  },
  // 图片查询首页
  indexProduct(params) {
    return axios.get(`/production/search`, { params: params })
  },
  // 用户图片收藏
  userCollect(params) {
    return axios.get(`/userCollect/collect`, { params: params })
  },
  // 图片详情
  getDetail(params) {
    return axios.get(`/production/getDetail`, { params: params })
  },
  // 消息
  messageList(params) {
    return axios.get(`/message/list`, { params: params })
  },
  // 用户购买订单
  userOrderSubmit(data) {
    return axios.post(`/userOrder/submit`, data)
  },
  // 查询交易是否成功
  queryOrder(params) {
    return axios.get(`/pay/queryOrder`, { params: params })
  },
  // // 下载购买图片
  // prodMember(params) {
  //   return axios.get(`/user/prodMember`, { params: params })
  // },
  // 个人中心-
  member(params) {
    return axios.get(`/user/member`, { params: params })
  }
}

export default user
