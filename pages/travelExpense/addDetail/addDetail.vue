<template>
	<view class="content">
		<uni-forms ref="scenicSpotRef" :modelValue="teDetail"  label-width="120px">
			<uni-forms-item label="标题" required name="title">
				<uni-easyinput v-model="teDetail.title" placeholder="账单名称" />
			</uni-forms-item>
			<uni-forms-item label="金额" required name="amount">
				<uni-easyinput v-model="teDetail.amount" placeholder="金额" />
			</uni-forms-item>
			<uni-forms-item label="备注" name="mark">
				<uni-easyinput v-model="teDetail.mark" type="textarea" />
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
	export default {
		setup(){
			let teDetail=ref({
				title:"",
				amount:null,
				mark:""
			})
				
			let submitLoading=ref<boolean>(false);	
			let submitDisabled=computed(()=>{
				return submitLoading.value || !teDetail.value.title
			});
			const submitForm=()=>{
				console.log("保存",teDetail.value)
			}
			return {
				submitLoading,submitForm,teDetail,submitDisabled
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.content{
		padding:20px;
	}
</style>
