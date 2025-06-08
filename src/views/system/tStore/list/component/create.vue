<template>
  <div class="system-tStore-create">
    <!-- 左侧弹出抽屉 -->
    <el-drawer v-model="isShowDialog" direction="ltr" size="80%">
      <template #header>
        <div>{{ '添加门店' }}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">      
        <!-- <el-form-item label="门店ID" prop="id">
          <el-input v-model="formData.id" placeholder="请输入门店ID" v-bind:disabled="this.currentOp === 'edit'" />
        </el-form-item>  -->      
        <el-form-item label="第三方平台门店ID" prop="third_id">
          <el-input v-model="formData.third_id" placeholder="请输入第三方平台门店ID" />
        </el-form-item>
        <el-form-item label="门店名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入门店名称" />
        </el-form-item>        
        <el-form-item label="门店地址" prop="address">
          <el-input v-model="formData.address" placeholder="请输入门店地址" />
        </el-form-item>        
        <el-form-item label="门店所有者标识" prop="owner_id">
          <el-input v-model="formData.owner_id" placeholder="请输入门店所有者标识" />
        </el-form-item>        
        <el-form-item label="门店所有者姓名" prop="owner_name">
          <el-input v-model="formData.owner_name" placeholder="请输入门店所有者姓名" />
        </el-form-item>        
        <el-form-item label="门店所有者电话" prop="owner_phone">
          <el-input v-model="formData.owner_phone" placeholder="请输入门店所有者电话" />
        </el-form-item>        
        <el-form-item label="客服姓名" prop="customer_service_name">
          <el-input v-model="formData.customer_service_name" placeholder="请输入客服姓名" />
        </el-form-item>        
        <el-form-item label="客服联系电话" prop="customer_service_phone">
          <el-input v-model="formData.customer_service_phone" placeholder="请输入客服联系电话" />
        </el-form-item>        
        <el-form-item label="客服微信" prop="customer_service_wechat">
          <el-input v-model="formData.customer_service_wechat" placeholder="请输入客服微信" />
        </el-form-item>        
        <el-form-item label="支付平台ID" prop="app_id">
          <el-input v-model="formData.app_id" placeholder="请输入支付平台ID" />
        </el-form-item>        
        <el-form-item label="支付平台密钥" prop="app_key">
          <el-input v-model="formData.app_key" placeholder="请输入支付平台密钥" />
        </el-form-item>        
        <!-- <el-form-item label="门店状态" prop="status">
            <el-select v-model="formData.status" placeholder="请选择门店状态" style="width: 100%;">
            <el-option label="正常营业" :value="1" />
            <el-option label="暂停营业" :value="2" />
            <el-option label="店铺倒闭" :value="3" />
          </el-select>
        </el-form-item> -->
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="onSubmit" :disabled="loading">确 定</el-button>
          <el-button @click="onCancel">取 消</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs, ref,unref,getCurrentInstance,computed } from 'vue';
import {ElMessageBox, ElMessage, FormInstance,UploadProps} from 'element-plus';
import {
  listTStore,
  getTStore,
  delTStore,
  addTStore,
  updateTStore,  
} from "/@/api/system/tStore";
import {
  TStoreTableColumns,
  TStoreInfoData,
  TStoreTableDataState,
  TStoreCreateState
} from "/@/views/system/tStore/list/component/model"
defineOptions({ name: "ApiV1SystemTStoreCreate"})
const emit = defineEmits(['tStoreList'])
const {proxy} = <any>getCurrentInstance()
const formRef = ref<HTMLElement | null>(null);
const menuRef = ref();
const state = reactive<TStoreCreateState>({
  loading:false,
  isShowDialog: false,
  formData: {    
    id: undefined,    
    third_id: undefined,    
    name: undefined,    
    address: undefined,    
    owner_id: undefined,    
    owner_name: undefined,    
    owner_phone: undefined,    
    customer_service_name: undefined,    
    customer_service_phone: undefined,    
    customer_service_wechat: undefined,    
    app_id: undefined,    
    app_key: undefined,    
    status: undefined,    
    created_at: undefined,    
    updated_at: undefined,    
  },
  // 表单校验
  rules: {    
    id : [
        { required: true, message: "门店ID不能为空", trigger: "blur" }
    ],    
    thirdId : [
        { required: true, message: "第三方平台门店ID不能为空", trigger: "blur" }
    ],    
    name : [
        { required: true, message: "门店名称不能为空", trigger: "blur" }
    ],    
    address : [
        { required: true, message: "门店地址不能为空", trigger: "blur" }
    ],    
    ownerId : [
        { required: true, message: "门店所有者标识不能为空", trigger: "blur" }
    ],    
    ownerName : [
        { required: true, message: "门店所有者姓名不能为空", trigger: "blur" }
    ],    
    ownerPhone : [
        { required: true, message: "门店所有者电话不能为空", trigger: "blur" }
    ],    
    customerServiceName : [
        { required: true, message: "客服姓名不能为空", trigger: "blur" }
    ],    
    // status : [
    //     { required: true, message: "门店状态: 正常营业、暂停营业、店铺倒闭", trigger: "blur" }
    // ],    
  }
});
const { loading,isShowDialog,formData,rules } = toRefs(state);
// 打开弹窗
const openDialog = (row?: TStoreInfoData) => {
  resetForm();
//   if(row) {
//     getTStore(row.id!).then((res:any)=>{
//       const data = res.data;      
//       // data.status = parseInt(data.status)      
//       state.formData = data;
//     })
//   }
  state.isShowDialog = true;
};
// 关闭弹窗
const closeDialog = () => {
  state.isShowDialog = false;
};
defineExpose({
  openDialog,
});
// 取消
const onCancel = () => {
  closeDialog();
};
// 提交
const onSubmit = () => {
  const formWrap = unref(formRef) as any;
  if (!formWrap) return;
  formWrap.validate((valid: boolean) => {
    if (valid) {
      state.loading = true;
      addTStore(state.formData).then(()=>{
          ElMessage.success('添加成功');
          closeDialog(); // 关闭弹窗
          emit('tStoreList')
        }).finally(()=>{
          state.loading = false;
        })
    }
  });
};
const resetForm = ()=>{
  state.formData = {    
    id: undefined,    
    third_id: undefined,    
    name: undefined,    
    address: undefined,    
    owner_id: undefined,    
    owner_name: undefined,    
    owner_phone: undefined,    
    customer_service_name: undefined,    
    customer_service_phone: undefined,    
    customer_service_wechat: undefined,    
    app_id: undefined,    
    app_key: undefined,    
    status: '' ,    
    created_at: undefined,    
    updated_at: undefined,    
  }  
};
</script>
<style scoped>  
  .kv-label{margin-bottom: 15px;font-size: 14px;}
  .mini-btn i.el-icon{margin: unset;}
  .kv-row{margin-bottom: 12px;}
</style>