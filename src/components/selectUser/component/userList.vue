<template>

  <el-row :gutter="10" style="width: 100%;" v-if="multiple">
    <el-col :span="6">
      <el-form-item>
        <el-button size="default" type="success" class="ml10" @click="confirmUser">确定选取</el-button>
      </el-form-item>
    </el-col>
  </el-row>
	<div class="system-user-list-container"  style="min-height: 600px;">
    <el-table :data="tableData.data" style="width: 100%" v-if="!multiple">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="userNickname" label="姓名" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="100" >
        <template #default="scope">
          <el-button size="small" text type="primary" @click="onOpenSelectUser(scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table ref="tableMultipleRef" :data="tableData.data" style="width: 100%" @selection-change="handleSelectionChange" v-else>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="userNickname" label="姓名" show-overflow-tooltip></el-table-column>
    </el-table>
    <pagination
        v-show="tableData.total>0"
        :total="tableData.total"
        v-model:page="tableData.param.pageNum"
        v-model:limit="tableData.param.pageSize"
        @pagination="setUserList"
    />
	</div>
</template>

<script lang="ts">
import {toRefs, reactive, onMounted, ref, defineComponent, getCurrentInstance} from 'vue';
import {ElMessageBox, ElMessage} from 'element-plus';
import {getUserSelector} from '/@/api/system/user/index';

interface TableDataState {
  ids:number[];
  userItem:any[];
  deptProps:{};
	tableData: {
		data: any[];
		total: number;
		loading: boolean;
		param: TableParam;
	};
}
interface TableParam {
  pageNum: number;
  pageSize: number;
  deptId:string;
  roleId:number | undefined;
  mobile:string;
  status:string;
  keyWords:string;
  dateRange: string[];
}
export default defineComponent({
	name: 'systemUserList',
  props:{
    deptData:{
      type:Array,
      default:()=>[]
    },
    param:{
      type:Object,
      default:()=>{}
    },
    genderData:{
      type:Array,
      default:()=>[]
    },
    multiple:{
      type:Boolean,
      default:false
    }
  },
  emits:['ok'],
	components: {  },
	setup(prop,{emit}) {
    const {proxy,props} = <any>getCurrentInstance();
    const {sys_user_sex} = proxy.useDict('sys_user_sex')
		const tableMultipleRef = ref();
		const state = reactive<TableDataState>({
      ids:[],
      userItem:[],
      deptProps:{
        id:"deptId",
        children: "children",
        label: "deptName"
      },
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
          pageNum: 1,
          pageSize: 10,
          roleId:undefined,
          deptId:'',
          mobile:'',
          status:'',
          keyWords:'',
          dateRange:[]
				},
			},
		});
    const setUserList = ()=>{
      const param = {...state.tableData.param, ...props.param};
      getUserSelector(param).then((res:any)=>{
        state.tableData.data = res.data.userList??[];
        state.tableData.total = res.data.total;
        toggleSelection()
      });
    };
    const toggleSelection = (rows?: any) => {
      if (rows) {
        rows.forEach((row) => {
          tableMultipleRef.value!.toggleRowSelection(row, undefined)
        })
      } else {
        tableMultipleRef.value!.clearSelection()
      }
    }
    const confirmUser =  () => {
      let userItem:any[] = [];
      userItem = state.userItem
      if(userItem.length===0){
        ElMessage.error('请勾选用户');
        return
      }else{
        emit("ok",userItem);
      }

    };
    // 多选框选中数据
    const handleSelectionChange = (selection:any[])=> {
      state.ids = selection.map(item => item.id)
      state.userItem = selection.map(item => item)
    };
    const onOpenSelectUser = (row:any) => {
      emit("ok",row);
    }
		return {
      sys_user_sex,
      setUserList,
      handleSelectionChange,
      onOpenSelectUser,
      confirmUser,
      tableMultipleRef,
			...toRefs(state),
		};
	},
});
</script>
