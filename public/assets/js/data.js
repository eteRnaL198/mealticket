// const config = {
//   apiKey: "AIzaSyCXkqAFgbz3hP6LLpQt11iJzXcXrc8MDgU",
//   authDomain: "mealticket-1585f.firebaseapp.com",
//   databaseURL: "https://mealticket-1585f-default-rtdb.firebaseio.com",
//   projectId: "mealticket-1585f",
//   storageBucket: "mealticket-1585f.appspot.com",
//   messagingSenderId: "171132223510",
//   appId: "1:171132223510:web:13ea0883b7e66187893537",
//   measurementId: "G-MS6L1K17ED"
// };

// firebase.initializeApp(config);



const writeData = () => {
  menus.map((menu, idx) => {
    firebase.database().ref('tickets/' + idx).set({
      menu
    });
  });
}
// writeData();

// menuRef.once('value', snapshot => {
//   const data = snapshot.val();
//   console.log(data);
// })
const menu = firebase.database().ref('tickets/menu/3');
menu.once('value', snapshot => {
  const data = snapshot.val();
  // console.log(data);
})



const menus = [
  {
    name: "唐揚げ定食",
    issued: 0,
    price: 500
  },
  {
    name: "唐揚げ弁当",
    issued: 0,
    price: 500
  },
  {
    name: "デイリーランチ",
    issued: 0,
    price: 370
  },
  {
    name: "デイリーランチライス小",
    issued: 0,
    price: 350
  },
  {
    name: "デイリーランチライス大",
    issued: 0,
    price: 420
  },
  {
    name: "唐揚げ丼L",
    issued: 0,
    price: 470
  },
  {
    name: "唐揚げ丼M",
    issued: 0,
    price: 390
  },
  {
    name: "カレーライス",
    issued: 0,
    price: 310
  },
  {
    name: "カレー大盛",
    issued: 0,
    price: 360
  },
  {
    name: "ミニカレー",
    issued: 0,
    price: 160
  },
  {
    name: "生卵",
    issued: 0,
    price: 50
  },
  {
    name: "温泉卵",
    issued: 0,
    price: 50
  },
  {
    name: "チーズ",
    issued: 0,
    price: 50
  },
  {
    name: "コロッケ",
    issued: 0,
    price: 50
  },
  {
    name: "日替わりトッピング",
    issued: 0,
    price: 80
  },
  {
    name: "特別中華麺",
    issued: 0,
    price: 540
  },
  {
    name: "日替わり中華麺",
    issued: 0,
    price: 420
  },
  {
    name: "特別麺そば",
    issued: 0,
    price: 540
  },
  {
    name: "特別麺うどん",
    issued: 0,
    price: 540
  },
  {
    name: "日替わりそば",
    issued: 0,
    price: 300
  },
  {
    name: "日替わりうどん",
    issued: 0,
    price: 300
  },
  {
    name: "麺大盛+半玉",
    issued: 0,
    price: 50
  },
  {
    name: "麺ジャンボ+1玉",
    issued: 0,
    price: 100
  },
  {
    name: "きつね",
    issued: 0,
    price: 30
  },
  {
    name: "たぬき",
    issued: 0,
    price: 30
  },
  {
    name: "竹輪天",
    issued: 0,
    price: 50
  },
  {
    name: "カレーソース",
    issued: 0,
    price: 90
  },
  {
    name: "かき揚げ",
    issued: 0,
    price: 50
  },
  {
    name: "小鉢サラダ",
    issued: 0,
    price: 80
  },
  {
    name: "ライス大",
    issued: 0,
    price: 150
  },
  {
    name: "ライス中",
    issued: 0,
    price: 100
  },
  {
    name: "ライス小",
    issued: 0,
    price: 80
  },
  {
    name: "味噌汁",
    issued: 0,
    price: 30
  },
  {
    name: "ソフトクリーム",
    issued: 0,
    price: 200
  }
]