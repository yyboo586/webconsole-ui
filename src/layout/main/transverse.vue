<template>
	<el-container class="layout-container flex-center layout-backtop">
		<Header />
		<Main />
		<el-backtop target=".layout-backtop .el-main .el-scrollbar__wrap"></el-backtop>
	</el-container>
</template>

<script setup lang="ts">
import Header from '/@/layout/component/header.vue';
import Main from '/@/layout/component/main.vue';
defineOptions({ name: "layoutTransverse"})
</script>
