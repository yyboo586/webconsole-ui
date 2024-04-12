<template>
	<div class="system-user-list-container"  style="min-height: 600px;">
    <el-table :data="tableData.data" style="width: 100%" >
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="userNickname" label="姓名" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="100" >
        <template #default="scope">
          <el-button size="small" text type="primary" @click="onOpenSelectUser(scope.row)">选择</el-button>
        </template>
      </el-table-column>
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
import {toRefs, reactive, defineComponent, getCurrentInstance} from 'vue';
import {getUserSelector} from '/@/api/system/user';

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
    }
  },
  emits:['ok'],
	components: {  },
	setup(prop,{emit}) {
    const {proxy,props} = <any>getCurrentInstance();
    const {sys_user_sex} = proxy.useDict('sys_user_sex')
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
      });
    };
    const onOpenSelectUser = (row:any) => {
      emit("ok",row);
    }
		return {
      sys_user_sex,
      setUserList,
      onOpenSelectUser,
			...toRefs(state),
		};
	},
});
</script>
