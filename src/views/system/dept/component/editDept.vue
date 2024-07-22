<template>
	<div class="system-edit-dept-container">
		<el-dialog :title="(ruleForm.deptId!==0?'修改':'添加')+'部门'" v-model="isShowDialog" width="769px">
			<el-form ref="formRef" :model="ruleForm" :rules="rules" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
						<el-form-item label="上级部门">
							<el-cascader
								:options="deptData"
								:props="{ checkStrictly: true,emitPath: false, value: 'deptId', label: 'deptName' }"
								placeholder="请选择部门"
								clearable
								class="w100"
								v-model="ruleForm.parentId"
							>
								<template #default="{ node, data }">
									<span>{{ data.deptName }}</span>
									<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
								</template>
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="部门名称" prop="deptName">
							<el-input v-model="ruleForm.deptName" placeholder="请输入部门名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="负责人">
              <div   v-if="deptUser.length > 0">
                <el-tag  closable  :disable-transitions="false" class="u-m-r-10" v-for="(item,index) in deptUser"  :key="index" @close="handleClose(item,index)" >{{item.userNickname}}</el-tag>
              </div>
<!--							<el-input v-model="ruleForm.leader" placeholder="请输入负责人" clearable></el-input>-->
              <el-button
                  style="padding-left: 10px;"
                  type="primary"
                  link
                  @click="handleSelectUser" >请选择</el-button>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="手机号">
							<el-input v-model="ruleForm.phone" placeholder="请输入手机号" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="邮箱">
							<el-input v-model="ruleForm.email" placeholder="请输入" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="排序">
							<el-input-number v-model="ruleForm.orderNum" :min="0" :max="999" controls-position="right" placeholder="请输入排序" class="w100" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
						<el-form-item label="部门状态">
							<el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0" inline-prompt active-text="启" inactive-text="禁"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">{{ruleForm.deptId!==0?'修 改':'添 加'}}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
  <select-user   ref="selectUserRef"    @selectUser="confirmUser" :selectedUsers="deptUser"></select-user>
</template>

<script setup lang="ts">
import {reactive, toRefs, defineComponent, getCurrentInstance,ref,unref} from 'vue';
import {addDept,editDept, getDeptList} from "/@/api/system/dept";
import {getUserByIds} from '/@/api/system/user';
import {ElMessage} from "element-plus";
import selectUser from "/@/components/selectUser/index.vue"

// 定义接口来定义对象的类型
interface TableDataRow {
	deptName: string;
	id: number;
  parentId:number;
	children?: TableDataRow[];
}
interface RuleFormState {
  deptId:number;
	parentId: number;
	deptName: string;
  orderNum: number;
  leader: any[];
	phone: string | number;
	email: string;
	status: number;
}
interface DeptSate {
	isShowDialog: boolean;
	ruleForm: RuleFormState;
	deptData: Array<TableDataRow>;
  rules: object;
}
defineOptions({ name: "systemEditDept"})
const emit = defineEmits(['deptList'])
const {proxy} = getCurrentInstance() as any;
const formRef = ref<HTMLElement | null>(null);
const selectUserRef = ref();
const  deptUser = ref([]);
const state = reactive<DeptSate>({
  isShowDialog: false,
  ruleForm: {
    deptId:0,
    parentId: 0, // 上级部门
    deptName: '', // 部门名称
    orderNum:0,
    leader: [],
    phone: '',
    email: '',
    status: 1,
  },
  deptData: [], // 部门数据
  rules: {
    deptName:[
      {required: true, message: "部门名称不能为空", trigger: "blur"},
    ]
  }
});
const { isShowDialog, ruleForm, deptData,rules } = toRefs(state);
// 打开弹窗
const openDialog = (row?: RuleFormState|number) => {
  resetForm()
  getDeptList().then((res:any)=>{
    state.deptData =  proxy.handleTree(res.data.deptList??[], "deptId","parentId");
  });
  if(row && typeof row === "object"){
    state.ruleForm = row;
    let  leaders  = row.leader??[]
    if (leaders.length > 0){
      //获取部门负责人信息
      getUserByIds({ids:leaders}).then((res:any)=>{
            if(res.code === 0){
              deptUser.value = res.data.userList;
            }
      });
    }else{
      //清空 deptUser, 避免缓存影响
      deptUser.value = [];
    }

  }else if(row && typeof row === 'number'){
    state.ruleForm.parentId = row
    deptUser.value = [];
  }else{
    deptUser.value = [];
  }
  state.isShowDialog = true;
};
defineExpose({openDialog})
// 关闭弹窗
const closeDialog = () => {
  state.isShowDialog = false;
};
// 取消
const onCancel = () => {
  closeDialog();
};
// 新增
const onSubmit = () => {
  const formWrap = unref(formRef) as any;
  if (!formWrap) return;
  formWrap.validate((valid: boolean) => {
    if (valid) {
      if(state.ruleForm.deptId===0){
        //添加
        addDept(state.ruleForm).then(()=>{
          ElMessage.success('角色添加成功');
          closeDialog(); // 关闭弹窗
          emit('deptList')
        });
      }else{
        //修改
        editDept(state.ruleForm).then(()=>{
          ElMessage.success('角色修改成功');
          closeDialog(); // 关闭弹窗
          emit('deptList')
        });
      }
    }
  });
};
const resetForm = ()=>{
  state.ruleForm = {
    deptId:0,
    parentId: 0, // 上级部门
    deptName: '', // 部门名称
    orderNum:0,
    leader: [],
    phone: '',
    email: '',
    status: 1,
  }
};

const handleClose = (data:any,key:number) => {
     deptUser.value.splice(key, 1);
     state.ruleForm.leader = deptUser.value.map((item:any) => item.id)
};
const confirmUser = (data:any[]) => {
  let leaderArr = state.ruleForm.leader??[];
  if(data.length>0){
    data.map((item:any)=>{
      // 若存在某个用户 则不添加
      if (!leaderArr.includes(item.id)){
        deptUser.value.push(item as never)
        leaderArr.push(item.id)
      }
    })
    state.ruleForm.leader = leaderArr;
  }else{
    deptUser.value = []
    state.ruleForm.leader = []
  }
};
//选择用户
const  handleSelectUser = () =>{
  selectUserRef.value.openDialog()
};
</script>
<style>
.u-m-r-10{
  margin-right: 8px;
}
</style>
