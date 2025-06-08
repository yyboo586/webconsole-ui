<template>  
  <div class="system-tStore-edit">
    <!-- 添加或修改门店信息表对话框 -->
    <el-dialog v-model="isShowDialog" width="800px" :close-on-click-modal="false" :destroy-on-close="true">
      <template #header>
        <div v-drag="['.system-tStore-edit .el-dialog', '.system-tStore-edit .el-dialog__header']">{{(!formData.id || formData.id==0?'添加':'修改')+'门店信息表'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">      
        <el-form-item label="门店ID" prop="id">
          <el-input v-model="formData.id" placeholder="请输入门店ID" v-bind:disabled="this.currentOp === 'edit'" />
        </el-form-item>        
        <el-form-item label="第三方平台门店ID" prop="thirdId">
          <el-input v-model="formData.thirdId" placeholder="请输入第三方平台门店ID" />
        </el-form-item>        
        <el-form-item label="门店名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入门店名称" />
        </el-form-item>        
        <el-form-item label="门店地址" prop="address">
          <el-input v-model="formData.address" placeholder="请输入门店地址" />
        </el-form-item>        
        <el-form-item label="门店所有者标识" prop="ownerId">
          <el-input v-model="formData.ownerId" placeholder="请输入门店所有者标识" />
        </el-form-item>        
        <el-form-item label="门店所有者姓名" prop="ownerName">
          <el-input v-model="formData.ownerName" placeholder="请输入门店所有者姓名" />
        </el-form-item>        
        <el-form-item label="门店所有者电话" prop="ownerPhone">
          <el-input v-model="formData.ownerPhone" placeholder="请输入门店所有者电话" />
        </el-form-item>        
        <el-form-item label="客服姓名" prop="customerServiceName">
          <el-input v-model="formData.customerServiceName" placeholder="请输入客服姓名" />
        </el-form-item>        
        <el-form-item label="客服联系电话" prop="customerServicePhone">
          <el-input v-model="formData.customerServicePhone" placeholder="请输入客服联系电话" />
        </el-form-item>        
        <el-form-item label="客服微信" prop="customerServiceWechat">
          <el-input v-model="formData.customerServiceWechat" placeholder="请输入客服微信" />
        </el-form-item>        
        <el-form-item label="支付平台ID" prop="appId">
          <el-input v-model="formData.appId" placeholder="请输入支付平台ID" />
        </el-form-item>        
        <el-form-item label="支付平台密钥" prop="appKey">
          <el-input v-model="formData.appKey" placeholder="请输入支付平台密钥" />
        </el-form-item>        
        <el-form-item label="门店状态: 1=正常营业、2=暂停营业、3=店铺倒闭" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio>请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>       
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="onSubmit" :disabled="loading">确 定</el-button>
          <el-button @click="onCancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
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
  TStoreEditState
} from "/@/views/system/tStore/list/component/model"
defineOptions({ name: "ApiV1SystemTStoreEdit"})
const emit = defineEmits(['tStoreList'])
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
    status: undefined,    
    createdAt: undefined,    
    updatedAt: undefined,    
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
    status : [
        { required: true, message: "门店状态: 1=正常营业、2=暂停营业、3=店铺倒闭不能为空", trigger: "blur" }
    ],    
  }
});
const { loading,isShowDialog,formData,rules } = toRefs(state);
// 打开弹窗
const openDialog = (row?: TStoreInfoData) => {
  resetForm();
  if(row) {
    getTStore(row.id!).then((res:any)=>{
      const data = res.data;      
      data.status = parseInt(data.status)      
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
// 提交
const onSubmit = () => {
  const formWrap = unref(formRef) as any;
  if (!formWrap) return;
  formWrap.validate((valid: boolean) => {
    if (valid) {
      state.loading = true;
      if(!state.formData.id || state.formData.id===0){
        //添加
      addTStore(state.formData).then(()=>{
          ElMessage.success('添加成功');
          closeDialog(); // 关闭弹窗
          emit('tStoreList')
        }).finally(()=>{
          state.loading = false;
        })
      }else{
        //修改
      updateTStore(state.formData).then(()=>{
          ElMessage.success('修改成功');
          closeDialog(); // 关闭弹窗
          emit('tStoreList')
        }).finally(()=>{
          state.loading = false;
        })
      }
    }
  });
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
    status: '' ,    
    createdAt: undefined,    
    updatedAt: undefined,    
  }  
};
</script>
<style scoped>  
  .kv-label{margin-bottom: 15px;font-size: 14px;}
  .mini-btn i.el-icon{margin: unset;}
  .kv-row{margin-bottom: 12px;}
</style>