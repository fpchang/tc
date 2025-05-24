
const redball=[],blueball=[];
let i = 1;
while (i < 34) {
    redball.push(i);
    if(i<17){
        blueball.push(i)
    }
    i++;
}

let next={red:[],blue:1};
let fnObj={
      
	
    calculate() {
      console.log("calculate");
     
		console.log("开始计算")
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
		//{ id:2025052, red:[6, 7, 10, 17, 20, 26], blue: 9 },
		//{ id:2025053, red:[6, 9, 10, 13, 30, 33], blue: 7 },
		//{ id:2025054, red:[5, 7, 10, 21, 24, 27], blue: 16 },
		{ id:2025055, red:[2, 5, 22, 27, 29, 33], blue: 12 },
		{ id:2025056, red:[1, 2, 10, 14, 28, 31], blue: 3 },
		{ id:2025057, red:[4, 9, 15, 16, 25, 30], blue: 14}
      ];
      let hisoryFormat = history.map((item) => {
        return { red: item.red, blue: item.blue };
      });
     
      let target = fnObj.getTarget(history.length+1);
	  
	   
	  let i =0;
        next = target[target.length-1];
	  target.splice(target.length-1,1);
	  let time = Date.now();
		while(!fnObj.isequqlBall(hisoryFormat,target)){
		target=fnObj.getTarget(history.length+1);
		next = target[target.length-1];
		 target.splice(target.length-1,1);
		 if(i%1000000==0){
			 console.log("100万：：",i,"time",Date.now()-time);
			
		 }
		 //console.log("ttt",target)
		i++;
		     
      }
	  console.log("循环结束",target,i);
	 // uni.hideLoading()
	 
    },
	isequqlBall(a=[],b=[]){
		let isequal=true;
		for(let i =0;i<a.length;i++){
			if(!fnObj.isEqualArray(a[i].red,b[i].red) || a[i].blue!=b[i].blue){
				isequal=false;
				break; 
			}
		}
		//console.log(a,b,isequal)
		return isequal;
	},
	isEqualArray(arr=[],arrt=[]){
		let isequal =true;
		for(let i = 0;i<arr.length;i++){
			if(arr[i]!=arrt[i]){
				isequal=false;
				break;
			}
		}
		return isequal;
	},
	getTarget(len){
		let compareArr=[];
		for (let i = 0; i <len; i++) {
        let redBallSelect = fnObj.getRandomRedBall();
        let blueBallSelect = fnObj.getRandomBlue();
        compareArr.push({ red: redBallSelect, blue: blueBallSelect });
      }
      return compareArr;
	},
    getRandomFromArray(arr = []) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    getRandomBlue() {
      return fnObj.getRandomFromArray(blueball);
    },
    getRandomRedBall() {
    //   let targetArr = [...redball];
    //   let redBallSelect = [];
    //   while (redBallSelect.length < 6) {
    //     let r = fnObj.getRandomFromArray(targetArr);
    //     let index = targetArr.indexOf(r);
    //     redBallSelect.push(r);
    //     targetArr.splice(index, 1);
    //   }
    //   return redBallSelect.sort((a,b)=>{return a-b});
	return fnObj.getRandomElementsUsingShuffle(redball, 6)
    },
	shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {


    const j = Math.floor(Math.random() * (i + 1));


    [arr[i], arr[j]] = [arr[j], arr[i]];


  }
  return arr;


},


 getRandomElementsUsingShuffle(arr, n) {


  let shuffledArray = fnObj.shuffleArray(arr.slice());


  return shuffledArray.slice(0, n);


}
  }
 fnObj.calculate();