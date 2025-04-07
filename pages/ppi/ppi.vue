<template>
	<view>
			
			<xt-panal-list count="1">
				<!-- #ifdef MP -->
				<view v-for="(item) of menuList" slot="card{{index}}">
					<text>{{item.title}}</text>
				
					
				</view>
				<!-- #endif -->
				<!-- #ifdef H5 || APP-PLUS -->
				<template  v-slot:[`card0`]>
					<view class="h">PPI计算</view>
					<view class="content">
						<uni-forms ref="form" label-width="40px">
							<uni-forms-item label="宽度">
								<uni-easyinput type="number" v-model="ppiObj.w" placeholder="请输入屏幕宽度" />
							</uni-forms-item>
							<uni-forms-item label="高度">
								<uni-easyinput type="number" v-model="ppiObj.h" placeholder="请输入屏幕高度" />
							</uni-forms-item>
							<uni-forms-item label="尺寸">
								<uni-easyinput type="digit"  v-model="ppiObj.size" placeholder="请输入尺寸" />
							</uni-forms-item>
							<uni-forms-item label="PPI">
								<text style="line-height:36px;font-weight: bold;">{{r}}</text>
							</uni-forms-item>
						</uni-forms>
						<!-- <button @click="submit">Submit</button> -->
					</view>
				</template>
				<!-- #endif -->
			</xt-panal-list>
			
			<scroll-view scroll-x="false" scroll-y="true">
				<view class="h">常见显示屏PPI</view>
				<view> 
					<uni-table border  emptyText="暂无更多数据">
						<!-- 表头行 -->
						<uni-tr>
							<uni-th align="left">分辨率</uni-th>
							<uni-th align="left">尺寸</uni-th>
							<uni-th align="left">PPI</uni-th>
						</uni-tr>
						<!-- 表格数据行 -->
						<uni-tr v-for="item of listPPI">
							
							<uni-td>{{item.w}}*{{item.h}}</uni-td>
							<uni-td>{{item.size}}</uni-td>
							<uni-td>{{getPPI(item.w,item.h,item.size)}}</uni-td>
						</uni-tr>
			
					
					</uni-table>
				</view>
			</scroll-view>
		
		
		

	</view>
</template>

<script lang="ts">
import {ref,computed} from "vue";
	export default {
		setup(){
			let ppiObj:Object = ref({
				w:1920,
				h:1080,
				size:14				
			});
			const getPPI=(w:number=0,h:number=0,size:number=1)=>{
				if(size==0 || w==0 || h==0){
					return "--";
				}
				return (Math.sqrt(w*w+h*h)/size).toFixed(2);
			}
			let r = computed(()=>{
				let w:number =ppiObj.value.w||0;
				let h:number =ppiObj.value.h||0;
				let size:number =ppiObj.value.size||1;
				return getPPI(w,h,size);
			});
			interface op{w:number,h:number,size:number}
			const listPPI:Array<op>=[
				{w:1920,h:1080,size:14},
				{w:2560,h:1440,size:16},
				{w:3440,h:1440,size:34},
			]
			return {
				ppiObj,r,getPPI,listPPI
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
.h{
	font-size: 35px;
	padding:10px 20px;
}
.content{
	padding:20px;
}

</style>
