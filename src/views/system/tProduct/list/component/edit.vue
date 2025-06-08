<template>  
  <div class="system-tProduct-edit">
    <!-- 添加或修改商品信息表对话框 -->
    <el-dialog v-model="isShowDialog" width="800px" :close-on-click-modal="false" :destroy-on-close="true">
      <template #header>
        <div v-drag="['.system-tProduct-edit .el-dialog', '.system-tProduct-edit .el-dialog__header']">{{(!formData.id || formData.id==0?'添加':'修改')+'商品信息表'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">         
        <el-form-item label="" prop="name">
          <el-input v-model="formData.name" placeholder="请输入" />
        </el-form-item>        
        <el-form-item label="" prop="price">
          <el-input v-model="formData.price" placeholder="请输入" />
        </el-form-item>                
        <el-form-item label="" prop="description">
          <el-input v-model="formData.description" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="商品状态" prop="status"></el-form-item>
        <el-form-item label=": 1=, 2=" prop="status">
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
  listTProduct,
  getTProduct,
  // delTProduct,
  addTProduct,
  updateTProduct,  
} from "/@/api/system/tProduct";
import {
  TProductTableColumns,
  TProductInfoData,
  TProductTableDataState,
  TProductEditState
} from "/@/views/system/tProduct/list/component/model"
defineOptions({ name: "ApiV1SystemTProductEdit"})
const emit = defineEmits(['tProductList'])
const {proxy} = <any>getCurrentInstance()
const formRef = ref<HTMLElement | null>(null);
const menuRef = ref();
const state = reactive<TProductEditState>({
  loading:false,
  isShowDialog: false,
  formData: {    
    id: undefined,    
    store_id: undefined,    
    gtid: undefined,    
    name: undefined,    
    save_name: undefined,    
    price: undefined,    
    image_path: undefined,    
    image_type: undefined,    
    description: undefined,    
    status: undefined,    
    createa_at: undefined,    
    updatedAt: undefined,    
  },
  // 表单校验
  rules: {    
    id : [
        { required: true, message: "ID不能为空", trigger: "blur" }
    ],    
    store_id : [
        { required: true, message: "ID不能为空", trigger: "blur" }
    ],    
    gtid : [
        { required: true, message: "不能为空", trigger: "blur" }
    ],    
    name : [
        { required: true, message: "不能为空", trigger: "blur" }
    ],    
    save_name : [
        { required: true, message: "不能为空", trigger: "blur" }
    ],    
    price : [
        { required: true, message: "不能为空", trigger: "blur" }
    ],    
    status : [
        { required: true, message: ": 1=, 2=不能为空", trigger: "blur" }
    ],    
  }
});
const { loading,isShowDialog,formData,rules } = toRefs(state);
// 打开弹窗
const openDialog = (row?: TProductInfoData) => {
  resetForm();
  if(row) {
    getTProduct(row.id!).then((res:any)=>{
      const data = res.data;      
      data.image_type = ''+data.image_type      
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
      addTProduct(state.formData).then(()=>{
          ElMessage.success('添加成功');
          closeDialog(); // 关闭弹窗
          emit('tProductList')
        }).finally(()=>{
          state.loading = false;
        })
      }else{
        //修改
      updateTProduct(state.formData).then(()=>{
          ElMessage.success('修改成功');
          closeDialog(); // 关闭弹窗
          emit('tProductList')
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
    store_id: undefined,    
    gtid: undefined,    
    name: undefined,    
    save_name: undefined,    
    price: undefined,    
    image_path: undefined,    
    image_type: undefined,    
    description: undefined,    
    status: '' ,    
    createa_at: undefined,    
    updatedAt: undefined,    
  }  
};
</script>
<style scoped>  
  .kv-label{margin-bottom: 15px;font-size: 14px;}
  .mini-btn i.el-icon{margin: unset;}
  .kv-row{margin-bottom: 12px;}
</style>