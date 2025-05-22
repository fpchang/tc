<template>
  <view>
    <view>

		<button @click="calculate">开始计算</button>
	</view>
	<view> 
		<view>
			<text v-for="item of next.red">
				<uni-badge class="uni-badge-left-margin" :text="item" size="50"/>
			</text>
			<text>
				<uni-badge class="uni-badge-left-margin" type="primary" :text="next.blue" size="50"/>
			</text>
		</view>
		
	</view>
  </view>
</template>

<script>
import { ref, computed } from "vue";
export default {
  setup() {
    const redball = computed(() => {
      const arr = [];
      let i = 1;
      while (i < 34) {
        arr.push(i);
        i++;
      }
      return arr;
    });
    const blueball = computed(() => {
      const arr = [];
      let i = 1;
      while (i < 17) {
        arr.push(i);
        i++;
      }
      return arr;
    });
	let next=ref({red:[],blue:1});
    return { redball, blueball,next };
  },
  data() {
    return {};
  },
  methods: {
    calculate() {
      console.log("calculate");
     
		uni.showLoading();
      let history = [
		// { id:2025041, red:[6, 10, 17, 19, 25, 31], blue: 6 },
		// { id:2025042, red:[7, 13, 19, 23, 27, 33], blue: 12 },
		// { id:2025043, red:[3, 12, 16, 19, 20, 32], blue: 13 },
		// { id:2025044, red:[2, 3, 7, 8, 14, 28], blue: 11},
		// { id:2025045, red:[2, 14, 19, 24, 29, 33], blue: 13 },
		// { id:2025046, red:[2, 3, 10, 16, 29, 33], blue: 1 },
        // { id:2025047, red:[1, 14, 21, 22, 23, 31], blue: 12 },
        // { id:2025048, red:[16, 21, 22, 23, 27, 31], blue: 10 },
		// { id:2025049, red:[3, 6, 19, 27, 29, 33], blue: 11 },
		// { id:2025050, red:[9, 12, 15, 18, 22, 33], blue: 16 },
		// { id:2025051, red:[1, 2, 3, 4, 17, 22], blue: 1 },
		{ id:2025052, red:[6, 7, 10, 17, 20, 26], blue: 9 },
		{ id:2025053, red:[6, 9, 10, 13, 30, 33], blue: 7 },
		{ id:2025054, red:[5, 7, 10, 21, 24, 27], blue: 16 },
		{ id:2025055, red:[2, 5, 22, 27, 29, 33], blue: 12 },
		{ id:2025056, red:[1, 2, 10, 14, 28, 31], blue: 3 }
      ];
      let hisoryFormat = history.map((item) => {
        return { red: item.red, blue: item.blue };
      });
     
      let target = this.getTarget(history.length+1);
	  
	   
	  let i =0;
	   this.next = target[target.length-1];
	  target.splice(target.length-1,1);
      while(JSON.stringify(target)!=JSON.stringify(hisoryFormat)&&i<9991000){
		target=this.getTarget(history.length+1);
		this.next = target[target.length-1];
		 target.splice(target.length-1,1);
		 if(i%1000000==0){
			 console.log("100万：：",i);
		 }
		 //console.log("ttt",target)
		i++;
		     
      }
	  console.log("循环结束",target,i);
	  uni.hideLoading()
	 
    },
	getTarget(len){
		let compareArr=[];
		for (let i = 0; i <len; i++) {
        let redBallSelect = this.getRandomRedBall();
        let blueBallSelect = this.getRandomBlue();
        compareArr.push({ red: redBallSelect, blue: blueBallSelect });
      }
      return compareArr;
	},
    getRandomFromArray(arr = []) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    getRandomBlue() {
      return this.getRandomFromArray(this.blueball);
    },
    getRandomRedBall() {
      let targetArr = [...this.redball];
      let redBallSelect = [];
      while (redBallSelect.length < 6) {
        let r = this.getRandomFromArray(targetArr);
        let index = targetArr.indexOf(r);
        redBallSelect.push(r);
        targetArr.splice(index, 1);
      }
      return redBallSelect.sort((a,b)=>{return a-b});
    },
  },
};
</script>

<style></style>
