<template>
  <div class="system-tStore-container">
    <el-card shadow="hover">
        <!-- <div class="system-tStore-search mb15">
            <el-form :model="tableData.param" ref="queryRef" :inline="true" label-width="100px">
            <el-row>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="门店ID(主键、业务标识)" prop="id">
                    <el-input
                        v-model="tableData.param.id"
                        placeholder="请输入门店ID(主键、业务标识)"
                        clearable                        
                        @keyup.enter.native="tStoreList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" class="colBlock">
                  <el-form-item label="第三方平台门店ID" prop="thirdId">
                    <el-input
                        v-model="tableData.param.thirdId"
                        placeholder="请输入第三方平台门店ID"
                        clearable                        
                        @keyup.enter.native="tStoreList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="!showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="tStoreList"><el-icon><ele-Search /></el-icon>搜索</el-button>
                    <el-button  @click="resetQuery(queryRef)"><el-icon><ele-Refresh /></el-icon>重置</el-button>
                    <el-button type="primary" link  @click="toggleSearch">
                      {{ word }}
                      <el-icon v-show="showAll"><ele-ArrowUp/></el-icon>
                      <el-icon v-show="!showAll"><ele-ArrowDown /></el-icon>
                    </el-button>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="门店名称" prop="name">
                    <el-input
                        v-model="tableData.param.name"
                        placeholder="请输入门店名称"
                        clearable                        
                        @keyup.enter.native="tStoreList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="门店地址" prop="address">
                    <el-input
                        v-model="tableData.param.address"
                        placeholder="请输入门店地址"
                        clearable                        
                        @keyup.enter.native="tStoreList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="门店所有者标识" prop="ownerId">
                    <el-input
                        v-model="tableData.param.ownerId"
                        placeholder="请输入门店所有者标识"
                        clearable                        
                        @keyup.enter.native="tStoreList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="门店所有者姓名" prop="ownerName">
                    <el-input
                        v-model="tableData.param.ownerName"
                        placeholder="请输入门店所有者姓名"
                        clearable                        
                        @keyup.enter.native="tStoreList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="门店所有者电话" prop="ownerPhone">
                    <el-input
                        v-model="tableData.param.ownerPhone"
                        placeholder="请输入门店所有者电话"
                        clearable                        
                        @keyup.enter.native="tStoreList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="客服姓名" prop="customerServiceName">
                    <el-input
                        v-model="tableData.param.customerServiceName"
                        placeholder="请输入客服姓名"
                        clearable                        
                        @keyup.enter.native="tStoreList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="客服联系电话" prop="customerServicePhone">
                    <el-input
                        v-model="tableData.param.customerServicePhone"
                        placeholder="请输入客服联系电话"
                        clearable                        
                        @keyup.enter.native="tStoreList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="客服微信" prop="customerServiceWechat">
                    <el-input
                        v-model="tableData.param.customerServiceWechat"
                        placeholder="请输入客服微信"
                        clearable                        
                        @keyup.enter.native="tStoreList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="支付平台ID" prop="appId">
                    <el-input
                        v-model="tableData.param.appId"
                        placeholder="请输入支付平台ID"
                        clearable                        
                        @keyup.enter.native="tStoreList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="支付平台密钥" prop="appKey">
                    <el-input
                        v-model="tableData.param.appKey"
                        placeholder="请输入支付平台密钥"
                        clearable                        
                        @keyup.enter.native="tStoreList"
                    />                    
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="门店状态: 1=正常营业、2=暂停营业、3=店铺倒闭" prop="status">
                    <el-select filterable v-model="tableData.param.status" placeholder="请选择门店状态: 1=正常营业、2=暂停营业、3=店铺倒闭" clearable style="width:200px;">
                        <el-option label="请选择字典生成" value="" />
                    </el-select>
                  </el-form-item>
                </el-col>                
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item label="门店创建时间" prop="createdAt">
                    <el-date-picker
                        clearable  style="width: 200px"
                        v-model="tableData.param.createdAt"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss"                    
                        type="datetime"
                        placeholder="选择门店创建时间"                    
                    ></el-date-picker>
                  </el-form-item>
                </el-col>            
                <el-col :span="8" :class="showAll ? 'colBlock' : 'colNone'">
                  <el-form-item>
                    <el-button type="primary"  @click="tStoreList"><el-icon><ele-Search /></el-icon>搜索</el-button>
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
                  @click="handleAdd"
                  v-auth="'api/v1/system/tStore/add'"
                ><el-icon><ele-Plus /></el-icon>新增</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="success"
                  :disabled="single"
                  @click="handleUpdate(null)"
                  v-auth="'api/v1/system/tStore/edit'"
                ><el-icon><ele-Edit /></el-icon>修改</el-button>
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="danger"
                  :disabled="multiple"
                  @click="handleDelete(null)"
                  v-auth="'api/v1/system/tStore/delete'"
                ><el-icon><ele-Delete /></el-icon>删除</el-button>
              </el-col>            
            </el-row>
        </div> -->
        <el-table v-loading="loading" :data="tableData.data" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />          
          <!-- <el-table-column label="门店ID(主键、业务标识)" align="center" prop="id"
            min-width="150px"            
             />          
          <el-table-column label="第三方平台门店ID" align="center" prop="thirdId"
            min-width="150px"            
             />           -->
          <el-table-column label="门店名称" align="center" prop="name"
            min-width="150px"            
             />          
          <el-table-column label="门店地址" align="center" prop="address"
            min-width="150px"            
             />          
          <!-- <el-table-column label="门店所有者标识" align="center" prop="ownerId"
            min-width="150px"            
             />           -->
          <el-table-column label="店主姓名" align="center" prop="owner_name"
            min-width="150px"            
             />          
          <el-table-column label="店主电话" align="center" prop="owner_phone"
            min-width="150px"            
             />          
          <el-table-column label="客服姓名" align="center" prop="customer_service_name"
            min-width="150px"            
             />          
          <el-table-column label="客服联系电话" align="center" prop="customer_service_phone"
            min-width="150px"            
             />          
          <el-table-column label="客服微信" align="center" prop="customer_service_wechat"
            min-width="150px"            
             />          
          <!-- <el-table-column label="支付平台ID" align="center" prop="appId"
            min-width="150px"            
             />          
          <el-table-column label="支付平台密钥" align="center" prop="appKey"
            min-width="150px"            
             />           -->
          <el-table-column label="门店状态" align="center" prop="status"
            min-width="150px"            
             />          
          <el-table-column label="创建时间" align="center" prop="created_at"
            min-width="150px"            
            >
            <template #default="scope">
              <span>{{ scope.row.created_at }}</span>
            </template>
          </el-table-column>        
          <el-table-column label="操作" align="center" class-name="small-padding" min-width="160px" fixed="right">
            <template #default="scope">            
              <el-button
                type="primary"
                link
                @click="handleUpdate(scope.row)"
                v-auth="'api/v1/system/tStore/edit'"
              ><el-icon><ele-EditPen /></el-icon>修改</el-button>
              <el-button
                type="primary"
                link
                @click="handleDelete(scope.row)"
                v-auth="'api/v1/system/tStore/delete'"
              ><el-icon><ele-DeleteFilled /></el-icon>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
            v-show="tableData.total>0"
            :total="tableData.total"
            v-model:page="tableData.param.page_num"
            v-model:limit="tableData.param.page_size"
            @pagination="tStoreList"
        />
    </el-card>
    <ApiV1SystemTStoreEdit
       ref="editRef"       
       @tStoreList="tStoreList"
    ></ApiV1SystemTStoreEdit>
    <ApiV1SystemTStoreDetail
      ref="detailRef"      
      @tStoreList="tStoreList"
    ></ApiV1SystemTStoreDetail>    
  </div>
</template>
<script setup lang="ts">
import {ItemOptions} from "/@/api/items";
import {toRefs, reactive, onMounted, ref, defineComponent, computed,getCurrentInstance,toRaw} from 'vue';
import {ElMessageBox, ElMessage, FormInstance} from 'element-plus';
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
} from "/@/views/system/tStore/list/component/model"
import ApiV1SystemTStoreEdit from "/@/views/system/tStore/list/component/edit.vue"
import ApiV1SystemTStoreDetail from "/@/views/system/tStore/list/component/detail.vue"
defineOptions({ name: "apiV1SystemTStoreList"})
const {proxy} = <any>getCurrentInstance()
const loading = ref(false)
const queryRef = ref()
const editRef = ref();
const detailRef = ref();
// 是否显示所有搜索选项
const showAll =  ref(false)
// 非单个禁用
const single = ref(true)
// 非多个禁用
const multiple =ref(true)
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
const state = reactive<TStoreTableDataState>({
    ids:[],
    tableData: {
        data: [],
        total: 0,
        loading: false,
        param: {
            page_num: 1,
            page_size: 10,            
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
        },
    },
});
const { tableData } = toRefs(state);
// 页面加载时
onMounted(() => {
    initTableData();
});
// 初始化表格数据
const initTableData = () => {    
    tStoreList()
};
/** 重置按钮操作 */
const resetQuery = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    tStoreList()
};
// 获取列表数据
const tStoreList = ()=>{
  loading.value = true
  listTStore(state.tableData.param).then((res:any)=>{
    let list = res.data.stores??[];    
    state.tableData.data = list;
    state.tableData.total = res.data.total;
    loading.value = false
  })
};
const toggleSearch = () => {
    showAll.value = !showAll.value;
}
// 多选框选中数据
const handleSelectionChange = (selection:Array<TStoreInfoData>) => {
    state.ids = selection.map(item => item.id)
    single.value = selection.length!=1
    multiple.value = !selection.length
}
const handleAdd =  ()=>{
    editRef.value.openDialog()
}
const handleUpdate = (row: TStoreTableColumns|null) => {
    if(!row){
        row = state.tableData.data.find((item:TStoreTableColumns)=>{
            return item.id ===state.ids[0]
        }) as TStoreTableColumns
    }
    editRef.value.openDialog(toRaw(row));
};
const handleDelete = (row: TStoreTableColumns|null) => {
    let msg = '你确定要删除所选数据？';
    let id:string[] = [] ;
    if(row){
    msg = `此操作将永久删除数据，是否继续?`
    id = [row.id]
    }else{
    id = state.ids
    }
    if(id.length===0){
        ElMessage.error('请选择要删除的数据。');
        return
    }
    ElMessageBox.confirm(msg, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            delTStore(id).then(()=>{
                ElMessage.success('删除成功');
                tStoreList();
            })
        })
        .catch(() => {});
}
const handleView = (row:TStoreTableColumns)=>{
    detailRef.value.openDialog(toRaw(row));
}
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