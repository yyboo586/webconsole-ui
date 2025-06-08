<template>  
  <div class="system-tProduct-create">
    <!-- 添加或修改商品信息表对话框 -->
    <el-drawer v-model="isShowDialog" direction="ltr" size="80%">
      <template #header>
        <div>{{'添加商品'}}</div>
      </template>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px"> 
        <el-form-item label="条形码" prop="gtid">
          <el-input v-model="formData.gtid" placeholder="请输入" />
        </el-form-item>        
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="formData.price" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <el-input v-model="formData.description" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <el-upload
            action="#"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleImageChange"
            :before-upload="beforeUpload"
            accept="image/*"
          >
            <el-button type="primary">选择图片</el-button>
            <div class="image-preview mt10">
                  <img :src="formData.image" alt="商品图片" class="preview-img" />
            </div>
          </el-upload>
        </el-form-item> 
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
// defineOptions({ name: "ApiV1SystemTProductCreate"})
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
    // image: undefined,   
    image_path: undefined,    
    image_type: undefined,    
    description: undefined,    
    status: undefined,    
    createa_at: undefined,    
    updated_at: undefined,    
  },
  // 表单校验
  rules: {        
    gtid : [
        { required: true, message: "不能为空", trigger: "blur" }
    ],    
    name : [
        { required: true, message: "不能为空", trigger: "blur" }
    ],    
    price : [
        { required: true, message: "不能为空", trigger: "blur" }
    ],
  }
});
const props = defineProps<{
  storeID: string;
}>();
const { loading,isShowDialog,formData,rules } = toRefs(state);
// 打开弹窗
const openDialog = (storeID?: string) => {
  storeID = storeID || '';
  resetForm();
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
    console.log(props.storeID);
  const formWrap = unref(formRef) as any;
  if (!formWrap) return;
  formWrap.validate((valid: boolean) => {
    if (valid) {
        state.loading = true;
        const productData: TProductInfoData = {
            gtid: state.formData.gtid,
            name: state.formData.name,
            price: state.formData.price,
            description: state.formData.description,
            image: state.formData.image, // assuming this is base64 or URL
            image_type: "jpg",
        };
        const payload = {
            store_id: props.storeID,
            products: [productData], // encapsulated as a list
        };
        addTProduct(payload).then(()=>{
          ElMessage.success('添加成功');
          closeDialog(); // 关闭弹窗
          emit('tProductList')
        }).finally(()=>{
          state.loading = false;
        })
      }
  });
};
const resetForm = ()=>{
  state.formData = {    
    id: undefined,    
    store_id: undefined,
    gtid: undefined,    
    name: undefined, 
    price: undefined,    
    description: undefined,    
    createa_at: undefined,    
    updated_at: undefined,    
  }  
};
// 校验图片类型和大小（可选）
const beforeUpload = (file: File) => {
  const isValidType = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
  if (!isValidType) {
    ElMessage.error('只能上传 JPG/PNG/GIF 格式的图片');
    return false;
  }

  const isValidSize = file.size / 1024 <= 512; // 限制 512KB
  if (!isValidSize) {
    ElMessage.error('图片大小不能超过 512KB');
    return false;
  }

  return true;
};

// 处理图片上传事件，转为 base64
const handleImageChange = (uploadFile: any) => {
  const file = uploadFile.raw;
  const reader = new FileReader();

  // reader.onload = (e: ProgressEvent<FileReader>) => {
  //   const result = e.target?.result as string;
  //   const base64Data = result.split(',')[1]; // Remove data:image/*;base64, prefix
  //   state.formData.image = result; // 将 base64 存入表单数据
  //   console.log(state.formData.image);
  // };

  reader.readAsDataURL(file); // 开始读取文件
};
</script>
<style scoped>  
  .kv-label{margin-bottom: 15px;font-size: 14px;}
  .mini-btn i.el-icon{margin: unset;}
  .kv-row{margin-bottom: 12px;}
.image-preview {
  margin-top: 10px;
  border: 1px solid #eee;
  padding: 5px;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 图片裁剪以适应容器 */
}
</style>
