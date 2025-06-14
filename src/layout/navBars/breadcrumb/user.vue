<template>
	<div class="layout-navbars-breadcrumb-user pr15" :style="{ flex: layoutUserFlexNum }">
		<el-dropdown :show-timeout="70" :hide-timeout="50" trigger="click" @command="onComponentSizeChange">
			<div class="layout-navbars-breadcrumb-user-icon">
				<i class="iconfont icon-ziti" :title="$t('message.user.title0')"></i>
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="large" :disabled="disabledSize === 'large'">{{ $t('message.user.dropdownLarge') }}</el-dropdown-item>
					<el-dropdown-item command="default" :disabled="disabledSize === 'default'">{{ $t('message.user.dropdownDefault') }}</el-dropdown-item>
					<el-dropdown-item command="small" :disabled="disabledSize === 'small'">{{ $t('message.user.dropdownSmall') }}</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<el-dropdown :show-timeout="70" :hide-timeout="50" trigger="click" @command="onLanguageChange">
			<div class="layout-navbars-breadcrumb-user-icon">
				<i class="iconfont" :class="disabledI18n === 'en' ? 'icon-fuhao-yingwen' : 'icon-fuhao-zhongwen'" :title="$t('message.user.title1')"></i>
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="zh-cn" :disabled="disabledI18n === 'zh-cn'">简体中文</el-dropdown-item>
					<el-dropdown-item command="en" :disabled="disabledI18n === 'en'">English</el-dropdown-item>
					<el-dropdown-item command="zh-tw" :disabled="disabledI18n === 'zh-tw'">繁體中文</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<div class="layout-navbars-breadcrumb-user-icon" @click="onSearchClick">
			<el-icon :title="$t('message.user.title2')">
				<ele-Search />
			</el-icon>
		</div>
		<div class="layout-navbars-breadcrumb-user-icon" @click="onLayoutSetingClick">
			<i class="icon-skin iconfont" :title="$t('message.user.title3')"></i>
		</div>
    <div class="layout-navbars-breadcrumb-user-icon" @click="removeCacheClick">
      <i class="fa-trash fa" title="清除缓存"></i>
    </div>
		<div class="layout-navbars-breadcrumb-user-icon">
			<el-popover  ref="newPopoverRef"  placement="bottom" trigger="click" transition="el-zoom-in-top" :width="500" :persistent="false">
				<template #reference>
					<el-badge :is-dot="true">
						<el-icon :title="$t('message.user.title4')">
							<ele-Bell />
						</el-icon>
					</el-badge>
				</template>
				<template #default>
					<UserNews @hideNews="hideNews" />
				</template>
			</el-popover>
		</div>
		<div class="layout-navbars-breadcrumb-user-icon mr10" @click="onScreenfullClick">
			<i
				class="iconfont"
				:title="isScreenfull ? $t('message.user.title6') : $t('message.user.title5')"
				:class="!isScreenfull ? 'icon-fullscreen' : 'icon-tuichuquanping'"
			></i>
		</div>
		<el-dropdown :show-timeout="70" :hide-timeout="50" @command="onHandleCommandClick">
			<span class="layout-navbars-breadcrumb-user-link">
				<img :src="userInfos.avatar" class="layout-navbars-breadcrumb-user-link-photo mr5" />
				{{ userInfos.userName === '' ? 'common' : userInfos.userName }}
				<el-icon class="el-icon--right">
					<ele-ArrowDown />
				</el-icon>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="/home">{{ $t('message.user.dropdown1') }}</el-dropdown-item>
					<el-dropdown-item command="wareHouse">{{ $t('message.user.dropdown6') }}</el-dropdown-item>
					<el-dropdown-item command="/personal">{{ $t('message.user.dropdown2') }}</el-dropdown-item>
					<el-dropdown-item command="/404">{{ $t('message.user.dropdown3') }}</el-dropdown-item>
					<el-dropdown-item command="/401">{{ $t('message.user.dropdown4') }}</el-dropdown-item>
					<el-dropdown-item divided command="logOut">{{ $t('message.user.dropdown5') }}</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<Search ref="searchRef" />
	</div>
</template>

<script setup lang="ts">
import {ref, getCurrentInstance, computed, reactive, toRefs, onMounted, defineComponent, watch} from 'vue';
import { useRoute,useRouter } from 'vue-router';
import {ElMessageBox, ElMessage, ElNotification} from 'element-plus';
import screenfull from 'screenfull';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useUserInfo } from '/@/stores/userInfo';
import { useThemeConfig } from '/@/stores/themeConfig';
import other from '/@/utils/other';
import { Session, Local } from '/@/utils/storage';
import UserNews from '/@/layout/navBars/breadcrumb/userNews.vue';
import Search from '/@/layout/navBars/breadcrumb/search.vue';
import {logout} from "/@/api/login";
import {removeCache} from "/@/api/system/cache";
import {noticeStore} from "/@/stores/noticeStore";

defineOptions({ name: "layoutBreadcrumbUser"})
const { t } = useI18n();
const { proxy } = <any>getCurrentInstance();
const router = useRouter();
const route = useRoute();
const stores = useUserInfo();
const storesThemeConfig = useThemeConfig();
const { userInfos } = storeToRefs(stores);
const { themeConfig } = storeToRefs(storesThemeConfig);
const searchRef = ref();
const newPopoverRef=ref();
const state = reactive({
  isScreenfull: false,
  disabledI18n: 'zh-cn',
  disabledSize: 'large',
});
const {isScreenfull, disabledI18n, disabledSize} = toRefs(state)
// 设置分割样式
const layoutUserFlexNum = computed(() => {
  let num: string | number = '';
  const { layout, isClassicSplitMenu } = themeConfig.value;
  const layoutArr: string[] = ['defaults', 'columns'];
  if (layoutArr.includes(layout) || (layout === 'classic' && !isClassicSplitMenu)) num = '1';
  else num = '';
  return num;
});
// 全屏点击时
const onScreenfullClick = () => {
  if (!screenfull.isEnabled) {
    ElMessage.warning('暂不不支持全屏');
    return false;
  }
  screenfull.toggle();
  screenfull.on('change', () => {
    if (screenfull.isFullscreen) state.isScreenfull = true;
    else state.isScreenfull = false;
  });
};
// 布局配置 icon 点击时
const onLayoutSetingClick = () => {
  proxy.mittBus.emit('openSetingsDrawer');
};
//清除缓存
const removeCacheClick = ()=>{
  //清除浏览器缓存
  Session.remove('userMenu');
  localStorage.clear();
  //清除后端缓存
  removeCache().then(()=>{
    ElMessage.success('缓存清除成功');
    window.location.reload();
  })
};
// 下拉菜单点击时
const onHandleCommandClick = (path: string) => {
  if (path === 'logOut') {
    ElMessageBox({
      closeOnClickModal: false,
      closeOnPressEscape: false,
      title: t('message.user.logOutTitle'),
      message: t('message.user.logOutMessage'),
      showCancelButton: true,
      confirmButtonText: t('message.user.logOutConfirm'),
      cancelButtonText: t('message.user.logOutCancel'),
      buttonSize: 'default',
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          //后端退出
          logout().then(()=>{
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = t('message.user.logOutExit');
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 500);
          })
        } else {
          done();
        }
      },
    })
      .then(async () => {
        // 清除缓存/token等
        Session.clear();
        // 使用 reload 时，不需要调用 resetRoute() 重置路由
        window.location.reload();
      })
      .catch(() => {});
  } else if (path === 'wareHouse') {
    window.open('https://gitee.com/tiger1103/gfast');
  } else {
    router.push(path);
  }
};
// 菜单搜索点击
const onSearchClick = () => {
  searchRef.value.openSearch();
};
const  hideNews=()=>{
  debugger
  newPopoverRef.value.hide()
}
// 组件大小改变
const onComponentSizeChange = (size: string) => {
  Local.remove('themeConfig');
  themeConfig.value.globalComponentSize = size;
  Local.set('themeConfig', themeConfig.value);
  initComponentSize();
  window.location.reload();
};
// 语言切换
const onLanguageChange = (lang: string) => {
  Local.remove('themeConfig');
  themeConfig.value.globalI18n = lang;
  Local.set('themeConfig', themeConfig.value);
  proxy.$i18n.locale = lang;
  initI18n();
  other.useTitle();
};
// 设置 element plus 组件的国际化
const setI18nConfig = (locale: string) => {
  proxy.mittBus.emit('getI18nConfig',proxy.i18n.global.messages.value[locale]);
};
// 初始化言语国际化
const initI18n = () => {
  switch (Local.get('themeConfig').globalI18n) {
    case 'zh-cn':
      state.disabledI18n = 'zh-cn';
      setI18nConfig('zh-cn');
      break;
    case 'en':
      state.disabledI18n = 'en';
      setI18nConfig('en');
      break;
    case 'zh-tw':
      state.disabledI18n = 'zh-tw';
      setI18nConfig('zh-tw');
      break;
  }
};
// 初始化全局组件大小
const initComponentSize = () => {
  switch (Local.get('themeConfig').globalComponentSize) {
    case 'large':
      state.disabledSize = 'large';
      break;
    case 'default':
      state.disabledSize = 'default';
      break;
    case 'small':
      state.disabledSize = 'small';
      break;
  }
};
// 页面加载时
onMounted(() => {
  if (Local.get('themeConfig')) {
    initI18n();
    initComponentSize();
  }
});
const noticeStoreAct = noticeStore()
const getMessages = computed(() => {
  return noticeStoreAct.message;
});
watch(getMessages,(nv,ov)=>{
  if (!nv || !nv.id) {
    return;
  }
  showNotice(nv)
},{ immediate: true, deep: true })
const showNotice = (data:any) => {
  const eln = ElNotification({
    title: '新消息',
    message: `您有一条新消息：【${data.title}】，请点击查看详情。`,
    type: 'warning',
    duration:3600000,
    onClick(){
      if(route.fullPath=="/system/sysNotice/show?type="+data.type){
        router.go(0)
      }else{
        router.push("/system/sysNotice/show?type="+data.type)
      }
      eln.close()
    }
  })
}
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-user {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	&-link {
		height: 100%;
		display: flex;
		align-items: center;
		white-space: nowrap;
		&-photo {
			width: 25px;
			height: 25px;
			border-radius: 100%;
		}
	}
	&-icon {
		padding: 0 10px;
		cursor: pointer;
		color: var(--next-bg-topBarColor);
		height: 50px;
		line-height: 50px;
		display: flex;
		align-items: center;
		&:hover {
			background: var(--next-color-user-hover);
			i {
				display: inline-block;
				animation: logoAnimation 0.3s ease-in-out;
			}
		}
	}
	:deep(.el-dropdown) {
		color: var(--next-bg-topBarColor);
	}
	:deep(.el-badge) {
		height: 40px;
		line-height: 40px;
		display: flex;
		align-items: center;
	}
	:deep(.el-badge__content.is-fixed) {
		top: 12px;
	}
}
</style>
