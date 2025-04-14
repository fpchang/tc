<template>
	<view class="content">
		<uni-forms ref="scenicSpotRef" :modelValue="te"  label-width="120px">
			<uni-forms-item label="标题" required name="title">
				<uni-easyinput v-model="te.title" placeholder="账单名称" />
			</uni-forms-item>
			<uni-forms-item label="备注" name="mark">
				<uni-easyinput v-model="te.mark" type="textarea" />
			</uni-forms-item>
			<uni-forms-item>
					
				<button type="primary"  @click="submitForm()" :disabled="submitDisabled"
				:loading="submitLoading">保存</button>
			</uni-forms-item>
		
		</uni-forms>
	</view>
</template>

<script lang="ts">
	import {computed, ref} from "vue";
	import { DB } from '@/api/sqlite.js';
	export default {
		setup(){
			let te=ref({
				title:"",
				mark:""
			})
				
			let submitLoading=ref<boolean>(false);	
			let submitDisabled=computed(()=>{
				return submitLoading.value || !te.value.title
			});
			
			const add=  ()=>{
				let time = new Date().getTime();
				let sql = `'${te.value.title}','${time}','${te.value.mark}'`;
				let condition = "'title','createTime','mark'";
				// 新增 DB.insertTableData(表名, 对应表头列的数据)
				 return DB.insertTableData("te", sql, condition)
			}
			const submitForm= async ()=>{
				console.log("保存",te.value);
				await add();
				uni.navigateBack();
				
			}
			return {
				submitLoading,submitForm,te,submitDisabled
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
				async add(){
					
						
								
						},
		}
	}
</script>

<style lang="scss">
	.content{
		padding:20px;
	}
</style>
