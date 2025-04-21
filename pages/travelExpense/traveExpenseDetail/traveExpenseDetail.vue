<template>
	<view>
			<block v-if="!teDetailList ||teDetailList.length<1">
					<noData text_content="没有账单数据,点击创建" :showControl="true" text_control_add="添加支出" @Event_one="add"></noData>
			</block>
			<block  v-if="teDetailList.length">
				<view style="padding:0 20px">
					
						<view class="menu-list">
							<navigator :url="`/pages/travelExpense/addDetail/addDetail?te_id=${te_id}`">
							<view class="menu-item" > 
								<text class="tx">
									<l-icon name="material-symbols:add-chart-sharp" size="30px" color="#a1a1a1"/>
								</text>
								<text class="tx">添加支出</text>
								
							</view>
							</navigator>
							</view>																	
				</view>
				
				<scroll-view :scroll-x="false" scroll-y="true">
				
						<xt-panal-list :count="2">
							<!-- #ifdef H5 || APP-PLUS -->
							<template v-for="(item,index) of teDetailList" v-slot:[`card${index}`]>
								<view class="menu-list">									
									<view class="menu-item" > 
										<text class="tx"><l-icon name="material-symbols:scan-delete" size="20px" color="#a1a1a1"/></text>
										<text class="tx" @click="deleteItems(item.id)">删除</text>
									</view>									
								  </view>
								<uni-card :title="item.title" extra="" spacing=0 margin=0  :border="false" shadow="0 0">
									<view><text>时间：</text><text>{{new Date(item.time).Format("yyyy-MM-dd")}}</text></view>
									<view><text>类型：</text><text>{{formatType(item.type)}}</text></view>
									<view><text>金额：</text><text>{{item.amount}}(元)</text></view>
									<view><text>备注：</text><text>{{item.mark}}</text></view>
									
								</uni-card>
							</template>
							<!--#edif-->
						</xt-panal-list>
				
				
				</scroll-view>
			</block>
	</view>
</template>

<script lang="ts">
	import { DB } from '@/api/sqlite.js';
	import { ref, computed, watch } from "vue";
	import SQLJSON from "../sql.json";
	export default {
		setup(){
			let te_id=ref(null);
			const teDetailList =ref(null);
			
			const getDetailListById= async (te_id:number)=>{
				const res = await DB.selectTableData("te_detail","te_id",te_id);
				console.log("列表",te_id,res)
				teDetailList.value=res;
			}
			return {te_id,SQLJSON,teDetailList,getDetailListById}
		},
		onLoad(params:object){
			console.log("params",params)
			let te_id=params['te_id'];
			if(te_id){
				this.te_id =te_id;
				this.getDetailListById(te_id)
			}
			
		},
		data() {
			return {
				
			}
		},
		onShow() {
			if(this.te_id){
				this.getDetailListById(this.te_id)
			}
		},
		methods: {
			add(){
				uni.navigateTo({
					url:`/pages/travelExpense/addDetail/addDetail?te_id=${this.te_id}`
				})
			},
			async deleteItems(id:Number){
				const conf = await uni.showModal({
					title: '确认删除此支出项',
					content: '删除后将无法恢复,确认删除吗?',
					cancelText: '取消',
					confirmText: '确认'
				})
				if (conf['cancel']) {
					return;
				}
				console.log(id)
				await DB.deleteTableData("te_detail","id",id);
				this.getDetailListById(this.te_id);
			},
			formatType(v:string){
				const data=[{text:"油费",value:"a"},{text:"餐费",value:"b"},{text:"门票",value:"c"},{text:"交通费",value:"d"},
												{text:"房费",value:"e"},{text:"其它",value:"f"}];
				
				return data.find(item=>item.value==v)['text']||"--"								
			}
		}
	}
</script>

<style lang="scss">
.menu-list{
  	display: flex;
  	gap:10px;
	justify-content: flex-end;
  	.menu-item{
  		display: flex;
  		flex-direction: column;
  		justify-content: center;
  		padding:10px 10px;
  		.tx{
  			text-align: center;
  			font-size: 14px;
  			color: #a1a1a1;
  		}
  	}
  }
</style>
