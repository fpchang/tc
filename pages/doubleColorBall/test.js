const redball = [],
  blueball = [];
let i = 1;
while (i < 34) {
  redball.push(i);
  if (i < 17) {
    blueball.push(i);
  }
  i++;
}

let next = { red: [], blue: 1 };
 let history = [
      { id:2025041, red:[6, 10, 17, 19, 25, 31], blue: 6 },
      { id:2025042, red:[7, 13, 19, 23, 27, 33], blue: 12 },
      { id:2025043, red:[3, 12, 16, 19, 20, 32], blue: 13 },
      { id:2025044, red:[2, 3, 7, 8, 14, 28], blue: 11},
      { id:2025045, red:[2, 14, 19, 24, 29, 33], blue: 13 },
      { id:2025046, red:[2, 3, 10, 16, 29, 33], blue: 1 },
      { id:2025047, red:[1, 14, 21, 22, 23, 31], blue: 12 },
      { id:2025048, red:[16, 21, 22, 23, 27, 31], blue: 10 },
      { id:2025049, red:[3, 6, 19, 27, 29, 33], blue: 11 },
      { id:2025050, red:[9, 12, 15, 18, 22, 33], blue: 16 },
      { id:2025051, red:[1, 2, 3, 4, 17, 22], blue: 1 },
      { id:2025052, red:[6, 7, 10, 17, 20, 26], blue: 9 },
      { id:2025053, red:[6, 9, 10, 13, 30, 33], blue: 7 },
      { id:2025054, red:[5, 7, 10, 21, 24, 27], blue: 16 },
      { id: 2025055, red: [2, 5, 22, 27, 29, 33], blue: 12 },
      { id: 2025056, red: [1, 2, 10, 14, 28, 31], blue: 3 },
      { id: 2025057, red: [4, 9, 15, 16, 25, 30], blue: 14 },
    ];
let redNext=[];
let times=0;
let time = Date.now();
let fnObj = {
	
  calculate() {
    console.log("calculate");

    console.log("开始计算");
    //let target = fnObj.getTarget(history.length + 1);
	let targetRed = fnObj.getTargetRed(history.length + 1);

    let i = 0;
    next = targetRed[targetRed.length - 1];
    targetRed.splice(targetRed.length - 1, 1);
    let time = Date.now();
    while (!fnObj.isequqlRedBall(history, targetRed)) {
      targetRed = fnObj.getTargetRed(history.length + 1);
      next = targetRed[targetRed.length - 1];
      targetRed.splice(targetRed.length - 1, 1);
      if (i % 1000000 == 0) {
        console.log("100万：：", i, "time", Date.now() - time);
      }
      //console.log("ttt",target)
      i++;
    }
    console.log("循环结束", targetRed, i);
    // uni.hideLoading()
  },
 caculateBlue(){
	let nextblue=1;
	let targetBlue=fnObj.getTargetBlue(history.length+1);
		nextblue=targetBlue[targetBlue.length - 1];
		  targetBlue.splice(targetBlue.length - 1, 1);
	leti =0;
	 let time = Date.now();
	let historyBlueArray=history.map(item=>{return item.blue});
	
	while(!fnObj.isEqualArray(historyBlueArray,targetBlue)){
		 targetBlue=fnObj.getTargetBlue(historyBlueArray.length+1);
		nextblue=targetBlue[targetBlue.length - 1];
		  targetBlue.splice(targetBlue.length - 1, 1);
if (i % 10000000 == 0) {
        console.log("1000万：blue", i/10000000, "time", Date.now() - time,"blueball",nextblue);
     
		
	}
	i++;
	}
console.log("蓝色循环结束", targetBlue, i,"blueball",nextblue);

 },
  isequqlRedBall(a = [], b = []) {
	//console.log("1111",a,b)
    let isequal = true;
    for (let i = 0; i < a.length; i++) {
	  if (!fnObj.isEqualArray(a[i].red,b[i])) {
        isequal = false;
        break;
      }
    }
    //console.log(a,b,isequal)
    return isequal;
  },
  isequqlBlueBall(a = [], b = []) {
    let isequal = true;
    for (let i = 0; i < a.length; i++) {
	  if (a[i].blue!=b[i]) {
        isequal = false;
        break;
      }
    }
    //console.log(a,b,isequal)
    return isequal;
  },
  isEqualArray(arr = [], arrt = []) {
    let isequal = true;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != arrt[i]) {
        isequal = false;
        break;
      }
    }
    return isequal;
  },
  getTarget(len) {
    let compareArr = [];
    for (let i = 0; i < len; i++) {
      let redBallSelect = fnObj.getRandomRedBall();
      let blueBallSelect = fnObj.getRandomBlue();
     // compareArr.push({ red: redBallSelect, blue: blueBallSelect });
	  compareArr.push({ red: redBallSelect });
    }
    return compareArr;
  },
   getTargetRed(len) {
    let compareArr = [];
    for (let i = 0; i < len; i++) {
      let redBallSelect = fnObj.getRandomRedBall();
	  compareArr.push(redBallSelect);
    }
    return compareArr;
  },
  getTargetBlue(len) {
    let compareArr = [];
    for (let i = 0; i < len; i++) {
      let redBallSelect = fnObj.getRandomBlue();
	  compareArr.push(redBallSelect);
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
    return fnObj.getRandomElementsUsingShuffle(redball, 6);
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
  },
};
fnObj.caculateBlue();
