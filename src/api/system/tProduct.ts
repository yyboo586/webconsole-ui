import request from '/@/utils/request'
// 查询tProduct列表
export function listTProduct(id:string,query:object) {
  return request({
    url: '/api/v1/store_payment/'+id+'/products?type=internal',
    method: 'get',
    params: query
  })
}
// 查询tProduct详细
export function getTProduct(id:string) {
  return request({
    url: '/api/v1/store_payment/products/'+id,
    method: 'get',
  })
}
// 新增tProduct
export function addTProduct(data:object) {
  return request({
    url: '/api/v1/store_payment/products',
    method: 'post',
    data: data
  })
}
// 修改tProduct
export function updateTProduct(id:string,data:object) {
  return request({
    url: '/api/v1/store_payment/products/'+id,
    method: 'patch',
    data: data
  })
}
// // 删除tProduct
// export function delTProduct(ids:string[]) {
//   return request({
//     url: '/api/v1/system/tProduct/delete',
//     method: 'delete',
//     data:{
//       ids:ids
//     }
//   })
// }
