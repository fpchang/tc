<template>
	<view>
			
			<xt-panal-list :count="2">
				<!-- #ifdef MP -->
				<view  slot="card0">
					<view class="h">投射比xx计算</view>
						<view class="content">
							<uni-forms ref="form" label-width="40px">
								<uni-forms-item label="投射比">
									<uni-easyinput type="number" v-model="pt.pr" placeholder="请输入投射比" />
								</uni-forms-item>
								<uni-forms-item label="尺寸">
									<uni-easyinput type="number" v-model="pt.size" placeholder="请输入投射尺寸" />
								</uni-forms-item>
								<uni-forms-item label="距离">
									<uni-easyinput type="digit"  v-model="pt.distance" placeholder="请输入距离" />
								</uni-forms-item>
							</uni-forms>
						</view>
					
				</view>
				<view  slot="card1">
					<view class="h">常见投影投射比</view>
						<scroll-view :scroll-x="false" :scroll-y="true" style="height:calc(100vh - 440px)">
							<view class="content">
								<uni-table border  emptyText="暂无更多数据">
									<!-- 表头行 -->
									<uni-tr>
										<uni-th align="left" width="80px">投射比</uni-th>
										<uni-th align="left">投射尺寸</uni-th>
										<uni-th align="left" width="60px">距离</uni-th>
									</uni-tr>
									<!-- 表格数据行 -->
									<uni-tr v-for="item of listProjectiveRatio">
										
										<uni-td>{{item.w}}*{{item.h}}</uni-td>
										<uni-td>
								
										  <uni-easyinput type="digit"  v-model="item.distance" placeholder="请输入尺寸" />
										</uni-td>
										<uni-td>{{getDistance(item.w,item.h,item.distance)}}</uni-td>
									</uni-tr>
						
								
								</uni-table>
							</view>
							
						
					</scroll-view>
					
				</view>
				<!-- #endif -->
				<!-- #ifdef H5 || APP-PLUS -->
				<template  v-slot:[`card0`]>
					<view class="h">投射比计算(16:9)</view>
					<view class="content">
						<uni-forms ref="form" label-width="60px">
							<uni-forms-item label="投射比">
								<uni-easyinput type="digital" v-model="pt.pr" placeholder="请输入投射比" />
							</uni-forms-item>
							<uni-forms-item label="尺寸">
								<uni-easyinput type="number" v-model="pt.size" placeholder="请输入投射尺寸" />
							</uni-forms-item>
							<uni-forms-item label="距离">
								<uni-easyinput type="text" disabled :value="distance" placeholder="请输入距离" />
							</uni-forms-item>
						</uni-forms>
					</view>
				</template>
				<template  v-slot:[`card1`]>
					<view class="h">常见投影投射比</view>
					<scroll-view :scroll-x="false" :scroll-y="true" style="height:calc(100vh - 440px)">
						<view class="content">
							<uni-table border  emptyText="暂无更多数据">
								<!-- 表头行 -->
								<uni-tr>
									<uni-th align="left" width="80px">投射比</uni-th>
									<uni-th align="left">尺寸</uni-th>
									<uni-th align="left" width="100px">距离</uni-th>
								</uni-tr>
								<!-- 表格数据行 -->
								<uni-tr v-for="item of listProjectiveRatio">
									
									<uni-td>{{item.pr}}</uni-td>
									<uni-td>
					
									  <uni-easyinput type="digit"  v-model="item.size" placeholder="请输入尺寸" />
									</uni-td>
									<uni-td>{{getDistance(item.pr,item.size)}} cm</uni-td>
								</uni-tr>							
							</uni-table>
						</view>											
				</scroll-view>
				</template>
				<!-- #endif -->
			</xt-panal-list>					
	</view>
</template>

<script lang="ts">
import {ref,computed,watch} from "vue";
	export default {
		setup(){
			let pt:Object = ref({
				pr:0.8,
				distance:1.7772,//m
				screenScale:16/9,
				size:100				
			});
			const getDistance=(pr:number=0,size:number=100,screenScale:number=16/9)=>{
				if(pr<=0 ||size<=0){
					return "--";
				}
				let s = Math.sqrt(size*size/(screenScale*screenScale+1*1));
				let w = screenScale*s*2.54;//一英寸=2.54cm;
				return (w*pr).toFixed(2);
			}
			let distance = computed(()=>{
				return getDistance(pt.value.pr,pt.value.size)+" cm";
			})
			let size = computed((pr:number=0,distance:number=1,screenScale:number=16/9)=>{
				if(pr<=0 ||distance<=0){
					return "--";
				}
				let w = pr*distance;
				let size = Math.sqrt(w*w+(w/screenScale)*(w/screenScale));
				return size.toFixed(2);
			});
			watch(pt,()=>{
				console.log("1111111111")
			},{deep:true});
			interface op{pr:number,size:number,distance:number}
			const listProjectiveRatio:Array<op>= ref([
				{pr:0.2,size:100,distance:13},
				{pr:0.21,size:100,distance:13},
				{pr:0.22,size:100,distance:13},
				{pr:0.23,size:100,distance:13},
				{pr:0.25,size:100,distance:13},
				{pr:0.39,size:100,distance:13},
				{pr:0.8,size:100,distance:13},
				{pr:1.07,size:100,distance:13},
				{pr:1.13,size:100,distance:13},
				{pr:1.15,size:100,distance:13},
				{pr:1.2,size:100,distance:13},
				{pr:1.22,size:100,distance:13},
				{pr:1.25,size:100,distance:13},
				{pr:1.27,size:100,distance:13},
				{pr:1.3,size:100,distance:13},
				{pr:1.34,size:100,distance:13},
				{pr:1.35,size:100,distance:13},
				{pr:1.4,size:100,distance:13},
				{pr:1.47,size:100,distance:13},
				{pr:1.49,size:100,distance:13},
				{pr:1.5,size:100,distance:13},
				{pr:1.72,size:100,distance:13},
				{pr:1.77,size:100,distance:13}
				
			]);
			return {
				pt,getDistance,distance,listProjectiveRatio
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
