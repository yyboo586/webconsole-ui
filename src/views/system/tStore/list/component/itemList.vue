<template>
  <div class="system-tProduct-container">
    <el-drawer v-model="isShowDialog" direction="ltr" size="80%">
    <el-card shadow="hover">
        <div class="system-tProduct-search mb15">
            <el-form :model="tableData.param" ref="queryRef" :inline="true" label-width="100px">
            <el-row>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="ID" prop="id">
                    <el-input
                        v-model="tableData.param.id"
                        placeholder="请输入ID"
                        clearable                        
                        @keyup.enter.native="tProductList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="ID" prop="store_id">
                    <el-input
                        v-model="tableData.param.store_id"
                        placeholder="请输入ID"
                        clearable                        
                        @keyup.enter.native="tProductList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="!showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="tProductList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <el-button type="primary" link  @click="toggleSearch">
                      {{ word }}
                      <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
                      <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                    </el-button>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="" prop="gtid">
                    <el-input
                        v-model="tableData.param.gtid"
                        placeholder="请输入"
                        clearable                        
                        @keyup.enter.native="tProductList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="" prop="name">
                    <el-input
                        v-model="tableData.param.name"
                        placeholder="请输入"
                        clearable                        
                        @keyup.enter.native="tProductList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="" prop="save_name">
                    <el-input
                        v-model="tableData.param.save_name"
                        placeholder="请输入"
                        clearable                        
                        @keyup.enter.native="tProductList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="" prop="price">
                    <el-input
                        v-model="tableData.param.price"
                        placeholder="请输入"
                        clearable                        
                        @keyup.enter.native="tProductList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="" prop="image_path">
                    <el-input
                        v-model="tableData.param.image_path"
                        placeholder="请输入"
                        clearable                        
                        @keyup.enter.native="tProductList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="" prop="image_type">
                    <el-select filterable v-model="tableData.param.image_type" placeholder="请选择" clearable style="width:200px;">
                        <el-option label="请选择字典生成" value="" />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="" prop="description">
                    <el-input
                        v-model="tableData.param.description"
                        placeholder="请输入"
                        clearable                        
                        @keyup.enter.native="tProductList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label=": 1=, 2=" prop="status">
                    <el-select filterable v-model="tableData.param.status" placeholder="请选择: 1=, 2=" clearable style="width:200px;">
                        <el-option label="请选择字典生成" value="" />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="" prop="createa_at">
                    <el-date-picker
                        clearable  style="width: 200px"
                        v-model="tableData.param.createa_at"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"                    
                        type="datetime"
                        placeholder="选择"                    
                    ></el-date-picker>
                  </el-form-item>
                </el-col>            
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="tProductList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <el-button type="primary" link  @click="toggleSearch">
                        {{ word }}
                        <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
                        <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                    </el-button>
                  </el-form-item>
                </el-col>            
              </el-row>
            </el-form>
            <el-row :gutter="10" class="mb8">
              <el-col :span="1.5">
                <el-button
                  type="primary"
                  @click="handleAdd(storeID)"
                  v-auth="'api/v1/system/tProduct/add'"
                ><el-icon><ele-Plus /></el-icon>新增</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="success"
                  :disabled="single"
                  @click="handleUpdate(null)"
                  v-auth="'api/v1/system/tProduct/edit'"
                ><el-icon><ele-Edit /></el-icon>修改</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="danger"
                  :disabled="multiple"
                  @click="handleDelete(null)"
                  v-auth="'api/v1/system/tProduct/delete'"
                ><el-icon><ele-Delete /></el-icon>删除</el-button>
              </el-col>            
            </el-row>
        </div>
        <el-table v-loading="loading" :data="tableData.data" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />          
          <!-- <el-table-column label="商品ID" align="center" prop="id"
            min-width="150px"            
             />           -->
          <!-- <el-table-column label="ID" align="center" prop="store_id"
            min-width="150px"            
             />           -->
          <el-table-column label="商品条形码" align="center" prop="gtid"
            min-width="150px"            
             />          
          <el-table-column label="商品名称" align="center" prop="name"
            min-width="150px"            
             />          
          <!-- <el-table-column label="" align="center" prop="save_name"
            min-width="150px"            
             />           -->
          <el-table-column label="商品价格" align="center" prop="price"
            min-width="150px"            
             />          
          <!-- <el-table-column label="" align="center" prop="image_path"
            min-width="150px"            
             />          
          <el-table-column label="" align="center" prop="image_type"
            min-width="150px"            
             />           -->
          <el-table-column label="商品描述" align="center" prop="description"
            min-width="150px"            
             />          
          <el-table-column label="商品状态" align="center" prop="status"
            min-width="150px"            
             />          
          <el-table-column label="创建时间" align="center" prop="created_at"
            min-width="150px"            
            >
          </el-table-column>        
          <el-table-column label="操作" align="center" class-name="small-padding" min-width="160px" fixed="right">
            <template #default="scope">            
              <el-button
                type="primary"
                link
                @click="handleUpdate(scope.row)"
                v-auth="'api/v1/system/tProduct/edit'"
              ><el-icon><ele-EditPen /></el-icon>修改</el-button>
              <el-button
                type="primary"
                link
                @click="handleDelete(scope.row)"
                v-auth="'api/v1/system/tProduct/delete'"
              ><el-icon><ele-DeleteFilled /></el-icon>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
            v-show="tableData.total>0"
            :total="tableData.total"
            v-model:page="tableData.param.pageNum"
            v-model:limit="tableData.param.pageSize"
            @pagination="tProductList"
        />
    </el-card>
    </el-drawer>
  </div>
  <ApiV1SystemTProductCreate :storeID="storeID" ref="createRef"/>
</template>
<script setup lang="ts">
import {ItemOptions} from "/@/api/items";
import {toRefs, reactive, onMounted, ref, defineComponent, computed,getCurrentInstance,toRaw, toRef} from 'vue';
import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
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
} from "/@/views/system/tProduct/list/component/model"
import ApiV1SystemTProductCreate from "/@/views/system/tProduct/list/component/create.vue"
import ApiV1SystemTProductEdit from "/@/views/system/tProduct/list/component/edit.vue"
import ApiV1SystemTProductDetail from "/@/views/system/tProduct/list/component/detail.vue"
import { TStoreInfoData } from "./model";
// import createProduct from './createProduct.vue';
defineOptions({ name: "apiV1SystemTProductList"})
const {proxy} = <any>getCurrentInstance()
const loading = ref(false)
const queryRef = ref()
const createRef = ref();
const editRef = ref();
const detailRef = ref();
const storeID = ref("")
// 是否显示所有搜索选项
const showAll =  ref(false)
// 非单个禁用
const single = ref(true)
// 非多个禁用
const multiple =ref(true)
const handleAdd = (id:string) => {
    createRef.value.openDialog(id)
}
const word = computed(()=>{
    if(showAll.value === false) {
        //对文字进行处理
        return "展开搜索";
    } else {
        return "收起搜索";
    }
})
// 字典选项数据
const {    
} = proxy.useDict(    
)
const state = reactive<any>({
    isShowDialog:false,
    ids:[],
    tableData: {
        data: [],
        total: 0,
        loading: false,
        param: {
            pageNum: 1,
            pageSize: 10,            
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
        },
    },
});
const { tableData } = toRefs(state);
// 页面加载时
// onMounted(() => {
//     // initTableData();
// });
// 初始化表格数据
// const initTableData = () => {    
//     tProductList();
// };
/** 重置按钮操作 */
// const resetQuery = (formEl: FormInstance | undefined) => {
//     if (!formEl) return
//     formEl.resetFields()
//     tProductList()
// };
// const storeID = "1931734836674826240";
// 获取列表数据
const tProductList = ()=>{
  loading.value = true
  listTProduct(storeID,state.tableData.param).then((res:any)=>{
    let list = res.data.products??[];    
    state.tableData.data = list;
    state.tableData.total = res.data.total;
    loading.value = false
  })
};
const toggleSearch = () => {
    showAll.value = !showAll.value;
}
// 多选框选中数据
const handleSelectionChange = (selection:Array<TProductInfoData>) => {
    state.ids = selection.map(item => item.id)
    single.value = selection.length!=1
    multiple.value = !selection.length
}
const openDialog = (row?: TStoreInfoData) => {
  // resetForm();
  state.isShowDialog = true
  if (row) { 
    storeID.value =row.id! 
    listTProduct(row.id!,state.tableData.param).then((res) => {
      let list = res.data.products ?? [];  
      state.tableData.data = list;
      state.tableData.total = res.data.total;
      loading.value = false
    })
  }
}
defineExpose({
  openDialog
})
const { isShowDialog} = toRefs(state)
</script>
<style lang="scss" scoped>
    .colBlock {
        display: block;
    }
    .colNone {
        display: none;
    }
    .ml-2{margin: 3px;}
</style>