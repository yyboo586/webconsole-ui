import request from '/@/utils/request'
// 查询门店信息表列表
export function listTStore(query:object) {
  return request({
    url: 'http://127.0.0.1:9999/api/v1/store_payment/stores',
    method: 'get',
    params: query
  })
}
// 查询门店信息表详细
export function getTStore(id:string) {
  return request({
    url: '/api/v1/system/tStore/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增门店信息表
export function addTStore(data:object) {
  return request({
    url: '/api/v1/system/tStore/add',
    method: 'post',
    data: data
  })
}
// 修改门店信息表
export function updateTStore(data:object) {
  return request({
    url: '/api/v1/system/tStore/edit',
    method: 'put',
    data: data
  })
}
// 删除门店信息表
export function delTStore(ids:string[]) {
  return request({
    url: '/api/v1/system/tStore/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
