<template>
  <div class="system-tStore-detail">
    <!-- 左侧弹出抽屉 -->
    <el-drawer v-model="isShowDialog" direction="ltr" size="80%">
      <template #header>
        <div>{{ '门店信息' }}</div>
      </template>
      <el-form ref="formRef" :model="formData" label-width="180px" style="margin-top: 20px;">       
        <el-form-item label="门店ID" prop="id">
          <el-input v-model="formData.id" readonly/>
        </el-form-item>        
        <el-form-item label="第三方ID" prop="thirdId">
          <el-input v-model="formData.third_id" readonly/>
        </el-form-item>        
        <el-form-item label="门店名称" prop="name">
          <el-input v-model="formData.name" readonly/>
        </el-form-item>        
        <el-form-item label="门店地址" prop="address">
          <el-input v-model="formData.address" readonly/>
        </el-form-item>        
        <el-form-item label="门店所有者标识" prop="owner_id">
          <el-input v-model="formData.owner_id" readonly/>
        </el-form-item>        
        <el-form-item label="门店所有者姓名" prop="owner_name">
          <el-input v-model="formData.owner_name" readonly/>
        </el-form-item>        
        <el-form-item label="门店所有者电话" prop="owner_phone">
          <el-input v-model="formData.owner_phone" readonly/>
        </el-form-item>        
        <el-form-item label="客服姓名" prop="customer_service_name">
          <el-input v-model="formData.customer_service_name" readonly/>
        </el-form-item>        
        <el-form-item label="客服联系电话" prop="customer_service_phone">
          <el-input v-model="formData.customer_service_phone" readonly/>
        </el-form-item>        
        <el-form-item label="客服微信" prop="customer_service_wechat">
          <el-input v-model="formData.customer_service_wechat" readonly/>
        </el-form-item>        
        <el-form-item label="支付平台ID" prop="app_id">
          <el-input v-model="formData.app_id" readonly/>
        </el-form-item>        
        <el-form-item label="支付平台密钥" prop="app_key">
          <el-input v-model="formData.app_key" readonly/>
        </el-form-item>        
        <el-form-item label="门店状态" prop="status">
          <el-input v-model="formData.status" readonly/>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
  import { reactive, toRefs, defineComponent,ref,unref,getCurrentInstance,computed } from 'vue';
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
    TStoreEditState
  } from "/@/views/system/tStore/list/component/model"
  defineOptions({ name: "ApiV1SystemTStoreDetail"})  
  const {proxy} = <any>getCurrentInstance()
  const formRef = ref<HTMLElement | null>(null);
  const menuRef = ref();  
  const state = reactive<TStoreEditState>({
    loading:false,
    isShowDialog: false,
    formData: {      
      id: undefined,      
      thirdId: undefined,      
      name: undefined,      
      address: undefined,      
      ownerId: undefined,      
      ownerName: undefined,      
      ownerPhone: undefined,      
      customerServiceName: undefined,      
      customerServicePhone: undefined,      
      customerServiceWechat: undefined,      
      appId: undefined,      
      appKey: undefined,      
      status: false ,      
      createdAt: undefined,      
      updatedAt: undefined,      
    },
    // 表单校验
    rules: {      
      id : [
          { required: true, message: "门店ID", trigger: "blur" }
      ],      
      thirdId : [
          { required: true, message: "第三方平台门店ID不能为空", trigger: "blur" }
      ],      
      name : [
          { required: true, message: "门店名称", trigger: "blur" }
      ],      
      address : [
          { required: true, message: "门店地址", trigger: "blur" }
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
      status : [
          { required: true, message: "门店状态: 1=正常营业、2=暂停营业、3=店铺倒闭不能为空", trigger: "blur" }
      ],      
    }
  });
  const { isShowDialog,formData } = toRefs(state);
  // 打开弹窗
  const openDialog = (row?: TStoreInfoData) => {
    resetForm();
    if(row) {
      getTStore(row.id!).then((res:any)=>{
        const data = res.data;        
        state.formData = data;
      })
    }
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
  const resetForm = ()=>{
    state.formData = {      
      id: undefined,      
      thirdId: undefined,      
      name: undefined,      
      address: undefined,      
      ownerId: undefined,      
      ownerName: undefined,      
      ownerPhone: undefined,      
      customerServiceName: undefined,      
      customerServicePhone: undefined,      
      customerServiceWechat: undefined,      
      appId: undefined,      
      appKey: undefined,      
      status: false ,      
      createdAt: undefined,      
      updatedAt: undefined,      
    }
  };  
</script>
<style scoped>  
  .system-tStore-detail :deep(.el-form-item--large .el-form-item__label){
    font-weight: bolder;
  }
  .pic-block{
    margin-right: 8px;
  }
  .file-block{
    width: 100%;
    border: 1px solid var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    margin-bottom: 5px;
    padding: 3px 6px;
  }
  .ml-2{margin-right: 5px;}
</style>