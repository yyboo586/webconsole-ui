<template>
  <!-- 门店信息表详情抽屉 -->  
  <div class="system-tStore-detail">
    <el-drawer v-model="isShowDialog" size="80%" direction="ltr">
      <template #header>
        <h4>门店信息表详情</h4>
      </template>
      <el-descriptions
              class="margin-top"
              :column="3"
              border
              style="margin: 8px;"
      >        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  门店ID
                </div>
              </template>
              {{ formData.id }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  第三方平台门店ID
                </div>
              </template>
              {{ formData.thirdId }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  门店名称
                </div>
              </template>
              {{ formData.name }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  门店地址
                </div>
              </template>
              {{ formData.address }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  门店所有者标识
                </div>
              </template>
              {{ formData.ownerId }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  门店所有者姓名
                </div>
              </template>
              {{ formData.ownerName }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  门店所有者电话
                </div>
              </template>
              {{ formData.ownerPhone }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  客服姓名
                </div>
              </template>
              {{ formData.customerServiceName }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  客服联系电话
                </div>
              </template>
              {{ formData.customerServicePhone }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  客服微信
                </div>
              </template>
              {{ formData.customerServiceWechat }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  支付平台ID
                </div>
              </template>
              {{ formData.appId }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  支付平台密钥
                </div>
              </template>
              {{ formData.appKey }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  门店状态: 1=正常营业、2=暂停营业、3=店铺倒闭
                </div>
              </template>
              {{ formData.status }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">
            <template #label>
              <div class="cell-item">
                门店创建时间
              </div>
            </template>
            {{ proxy.parseTime(formData.createdAt, '{y}-{m}-{d} {h}:{i}:{s}') }}
          </el-descriptions-item>        
      </el-descriptions>
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