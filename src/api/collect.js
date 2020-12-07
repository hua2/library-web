/**
 * collect模块接口列表
 * @author lyh
 * @date 2019-11-12
 */

import axios from '@/utils/request'

const collect = {
  // 买家商品收藏-统一查询接口
  productCollectList(data) {
    return axios.post(`/buyer/productCollect/list`, data)
  },
  // 买家商品收藏-添加接口
  productCollectInsert(params) {
    return axios.get(`/buyer/productCollect/collect`, { params: params })
  },
  // 买家商品收藏-取消接口
  productCollectCancel(params) {
    return axios.get(`/buyer/productCollect/cancel`, { params: params })
  },
  // 买家商品收藏-统一删除接口
  productCollectDelete(params) {
    return axios.get(`/buyer/productCollect/cancels`, { params: params })
  },

  // 买家工厂收藏-统一查询接口
  factoryCollectList(data) {
    return axios.post(`/buyer/factoryCollect/list`, data)
  },
  // 买家工厂收藏-添加接口
  factoryCollectInsert(params) {
    return axios.get(`/buyer/factoryCollect/collect`, { params: params })
  },
  // 买家工厂收藏-取消接口
  factoryCollectCancel(params) {
    return axios.get(`/buyer/factoryCollect/cancel`, { params: params })
  },
  // 买家工厂收藏-统一删除接口
  factoryCollectDelete(params) {
    return axios.get(`/buyer/factoryCollect/cancels`, { params: params })
  },

  // 买家询盘收藏-统一查询接口
  enquiryCollectList(data) {
    return axios.post(`/buyer/enquiryCollect/list`, data)
  },
  // 买家询盘收藏-添加接口
  enquiryCollectInsert(params) {
    return axios.get(`/buyer/enquiryCollect/collect`, { params: params })
  },
  // 买家询盘收藏-取消接口
  enquiryCollectCancel(params) {
    return axios.get(`/buyer/enquiryCollect/cancel`, { params: params })
  },
  // 买家询盘收藏-统一删除接口
  enquiryCollectDelete(params) {
    return axios.get(`/buyer/enquiryCollect/cancels`, { params: params })
  }
}
export default collect
