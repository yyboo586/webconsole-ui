<template>
  <!-- 商品信息表详情抽屉 -->  
  <div class="system-tProduct-detail">
    <el-drawer v-model="isShowDialog" size="80%" direction="ltr">
      <template #header>
        <h4>商品信息表详情</h4>
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
                  ID
                </div>
              </template>
              {{ formData.id }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  ID
                </div>
              </template>
              {{ formData.store_id }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">                  
                </div>
              </template>
              {{ formData.gtid }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">                  
                </div>
              </template>
              {{ formData.name }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">                  
                </div>
              </template>
              {{ formData.save_name }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">                  
                </div>
              </template>
              {{ formData.price }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">                  
                </div>
              </template>
              {{ formData.image_path }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">                  
                </div>
              </template>
              {{ formData.image_type }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">                  
                </div>
              </template>
              {{ formData.description }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">            
              <template #label>
                <div class="cell-item">
                  : 1=, 2=
                </div>
              </template>
              {{ formData.status }}            
          </el-descriptions-item>        
          <el-descriptions-item :span="1">
            <template #label>
              <div class="cell-item">                
              </div>
            </template>
            {{ proxy.parseTime(formData.createa_at, '{y}-{m}-{d} {h}:{i}:{s}') }}
          </el-descriptions-item>        
      </el-descriptions>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
  import { reactive, toRefs, defineComponent,ref,unref,getCurrentInstance,computed } from 'vue';
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
  defineOptions({ name: "ApiV1SystemTProductDetail"})  
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
      status: false ,      
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
  const { isShowDialog,formData } = toRefs(state);
  // 打开弹窗
  const openDialog = (row?: TProductInfoData) => {
    resetForm();
    if(row) {
      getTProduct(row.id!).then((res:any)=>{
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
      store_id: undefined,      
      gtid: undefined,      
      name: undefined,      
      save_name: undefined,      
      price: undefined,      
      image_path: undefined,      
      image_type: undefined,      
      description: undefined,      
      status: false ,      
      createa_at: undefined,      
      updatedAt: undefined,      
    }
  };  
</script>
<style scoped>  
  .system-tProduct-detail :deep(.el-form-item--large .el-form-item__label){
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