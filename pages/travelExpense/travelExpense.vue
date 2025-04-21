<template>
	<view>
		<block v-if="!teList ||teList.length<1">
			<noData text_content="没有账单数据,点击创建" :showControl="true" text_control_add="创建" @Event_one="add"></noData>
		</block>
		<block v-if="teList&&teList.length">
			<view style="padding:0 20px">
				
					<view class="menu-list">
						<navigator url="/pages/travelExpense/add/add">
						<view class="menu-item" > 
							<text class="tx">
								<l-icon name="material-symbols:add-card" size="30px" color="#a1a1a1"/>
							</text>
							<text class="tx">创建账单</text>
							
						</view>
						</navigator>
						</view>
					
					
				
			</view>
			<scroll-view :scroll-x="false" scroll-y="true">
				<block v-if="teList">
					<xt-panal-list :count="2">
						<!-- #ifdef H5 || APP-PLUS -->
						<template v-for="(item,index) of teList" v-slot:[`card${index}`]>
							<!-- <view>+增加明细</view>
							<view>{{item.title}}</view>
							<view>{{item.totalAccount}}</view> -->
							<view class="menu-list">
					<!-- 		<navigator :url="`/pages/travelExpense/addDetail/addDetail?te_id=${item.id}`">
								<view class="menu-item" >
									<text class="tx"><l-icon name="material-symbols:add-chart-sharp" size="20px" color="#a1a1a1"/></text>
									<text class="tx">添加</text>
								</view>
							</navigator> -->
								
								<view class="menu-item" @click="deleteItems(item.id)"> 
									<text class="tx"><l-icon name="material-symbols:scan-delete" size="20px" color="#a1a1a1"/></text>
									<text class="tx">删除</text>
								</view>
								<navigator :url="`./traveExpenseDetail/traveExpenseDetail?te_id=${item.id}`">
									<view class="menu-item" >
										<text class="tx"><l-icon name="tdesign:folder-details-filled" size="20px" color="#a1a1a1"/></text>
										<text class="tx">详情</text>
									</view>
								</navigator>
								
							  </view>
							<uni-card :title="item.title" extra="" spacing=0 margin=0  :border="false" shadow="0 0">
								<view><text>金额：</text><text>{{item.totalAmount}}￥</text></view>
								
							</uni-card>
						</template>
						<!--#edif-->
					</xt-panal-list>
				</block>
			
			</scroll-view>
		</block>
	
	</view>

</template>

<script lang="ts">
	import { DB } from '@/api/sqlite.js';
	import { ref, computed, watch } from "vue";
	import SQLJSON from "./sql.json";
	export default {
		setup() {
			// interface teObj{
			//  _id:String,
			//  title:String,
			//  createTime:Number
			//totalAccount:Number
			// }
			let teList : any = ref(null);
			const add = () => {
				uni.navigateTo({
					url: "/pages/travelExpense/add/add"
				})
			}
			return { teList, add ,SQLJSON}
		},
		data() {
			return {
				listData: []
			};
		},
		async onLoad() {
			//await DB.dropTable("te");
			//await DB.dropTable("te_detail");
			await this.openSQL();
			
			await this.createTableTe();
			await this.createTableTeDetail();
			 this.selectTe();
			console.log("创建完成")
		},
		onShow() {
			this.selectTe();
		},
		methods: {
			// 打开数据库
			 openSQL() {
				// 这个是查询有没有打开数据库
				let open = DB.isOpen();
				console.log("数据库状态", open ? "开启" : "关闭");
				if (!open) {
					return DB.openSqlite()
						
				}
				return Promise.resolve()
			},

			// 关闭数据库
			closeSQL() {
				// 这个是查询有没有打开数据库
				let open = DB.isOpen();
				if (open) {
					DB.closeSqlite()
						.then(res => {
							console.log("数据库已关闭");
						})
						.catch(error => {
							console.log("数据库关闭失败");
						});
				}
			},

			// 创建表
			createTableTe() {
			
					this.openSQL();
					let sql =SQLJSON.CREATE_TE;
					return DB.createTable("te", sql)
						
				
			},
			// 创建子表
			createTableTeDetail() {			
					this.openSQL();
					let sql =SQLJSON.CREATE_TEDETAIL;
					return DB.createTable("te_detail", sql);										
			},
		async selectTe(){
			//const sql ="select te.*,(select sum(amount) from te_detail where te.id=te_detail.te_id) as totalAmount  from te";
			const sql2 = "select te.*,ifnull(tt.totalAmount,0)as totalAmount from te left join (select te_id,sum(amount) as totalAmount from te_detail group by te_id)  tt on te.id=tt.te_id";		
			try{
				const res = await DB.selectTableDataSQL(sql2);
					this.teList=res;
			}catch(e){
				console.error(e)
			}
			
		},
		
	async deleteItems(id:Number){
		const conf = await uni.showModal({
			title: '确认删除此账单',
			content: '删除后将无法恢复,确认删除吗?',
			cancelText: '取消',
			confirmText: '确认'
		})
		if (conf['cancel']) {
			return;
		}
		await DB.deleteTableData("te_detail","te_id",id);
		await DB.deleteTableData("te","id",id);
		this.selectTe();
		},
	
			// 修改表数据
			updateTableData() {
				let open = DB.isOpen();
				if (open) {
					let time = this.formatDate(new Date().getTime());
					let data = `content = '我被修改了',time = '${time}'`;
					// 修改表数据 DB.updateTableData(表名, 要修改的列名=修改后列值, 修改条件的列名, 修改条件的列值)
					DB.updateTableData("chat", data, "name", "小明")
						.then(res => {
							this.showToast("更新chat表成功");
							this.selectTableData();
						})
						.catch(error => {
							console.log("修改失败", error);
						});
				} else {
					this.showToast("数据库未打开");
				}
			},

			// 删除表数据
			deleteTableData() {
				let open = DB.isOpen();
				if (open) {
					// 删除表 DB.deleteTableData(表名,查询条件列名,查询条件列值)
					DB.deleteTableData("chat", "name", "小红")
						.then(res => {
							this.showToast("删除表数据成功");
							this.selectTableData();
						})
						.catch(error => {
							console.log("删除失败", error);
						});
				} else {
					this.showToast("数据库未打开");
				}
			},





			// 提示框
			showToast: function (str) {
				uni.showToast({
					icon: "none",
					title: str,
					mask: true
				});
			},

			// 时间戳转年月日
			formatDate(data) {
				let now = new Date(data);
				var year = now.getFullYear(); //取得4位数的年份
				var month =
					now.getMonth() + 1 < 10 ?
						"0" + (now.getMonth() + 1) :
						now.getMonth() + 1;
				var date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
				var hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
				var minute =
					now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
				var second =
					now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
				return (
					year +
					"-" +
					month +
					"-" +
					date +
					" " +
					hour +
					":" +
					minute +
					":" +
					second
				);
			}
		}
	};
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