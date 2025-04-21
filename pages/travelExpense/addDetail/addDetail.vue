<template>
	<view class="content">
		<uni-forms ref="scenicSpotRef" :modelValue="teDetail"  label-width="120px">

			<uni-forms-item label="支出时间" required >
						<uni-datetime-picker type="date" return-type="timestamp" :clear-icon="false" v-model="teDetail.time" />
			</uni-forms-item>
						<uni-forms-item label="支出分类" required name="type">
					
									 <uni-data-select
									 v-model="teDetail.type"
									 :localdata="dataSelect"
			
								   ></uni-data-select>
					
							
			 </uni-forms-item>
			<uni-forms-item label="金额" required name="amount">
				<uni-easyinput v-model="teDetail.amount" type="digit" placeholder="金额" />
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
	import {computed,watch, ref} from "vue";
	import { DB } from '@/api/sqlite.js';
	export default {
		setup(){
			let teDetail=ref({
				time:Date.now(),
				type:"b",
				type_zn:"餐费",
				amount:null,
				te_id:null,
				mark:""
			})
			const dataSelect=[{text:"油费",value:"a"},{text:"餐费",value:"b"},{text:"门票",value:"c"},{text:"交通费",value:"d"},
								{text:"房费",value:"e"},{text:"其它",value:"f"}]	
			let submitLoading=ref<boolean>(false);	
			let submitDisabled=computed(()=>{
				return submitLoading.value || !teDetail.value.amount
			});
			const submitForm= async ()=>{
				
				teDetail.value.type_zn=dataSelect.find(item=>item.value==teDetail.value.type)['text'];
				console.log("保存 vvvvv",teDetail.value);
				let sql = `${teDetail.value.te_id},'${teDetail.value.time}','${teDetail.value.type}','${teDetail.value.type_zn}','${teDetail.value.amount}','${teDetail.value.mark}'`;
				let condition = "'te_id','time','type','type_zn','amount', 'mark'";
				// 新增 DB.insertTableData(表名, 对应表头列的数据)
				await DB.insertTableData("te_detail", sql, condition);
					uni.navigateBack();
				
			}
			return {
				submitLoading,submitForm,teDetail,submitDisabled,dataSelect
			}
		},
		data() {
			return {
				
			}
		},
		onLoad(params:object){
			console.log("params",params)
			let {te_id}=params;
			console.log('11111',this.teDetail)
			this.teDetail.te_id=Number(te_id);
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
