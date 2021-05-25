// menuRef.once('value', snapshot => {
//   const data = snapshot.val();
//   console.log(data);
// })
const issued = [{code: "abc123", auth_num: 0}];
const newTicket = {code: "def456", auth_num: 1};
const rewriteMenu = () => {
  firebase.database().ref('tickets/menu/' + 0 + '/issued').set(
    [{dummy: "hoge"}]
  );
}
// rewriteMenu();



const menu = [
  {
    name: "唐揚げ定食",
    issued: [{dummy:"hoge"}],
    price: 500
  },
  {
    name: "唐揚げ弁当",
    issued: [{dummy:"hoge"}],
    price: 500
  },
  {
    name: "デイリーランチ",
    issued: [{dummy:"hoge"}],
    price: 370
  },
  {
    name: "デイリーランチライス小",
    issued: [{dummy:"hoge"}],
    price: 350
  },
  {
    name: "デイリーランチライス大",
    issued: [{dummy:"hoge"}],
    price: 420
  },
  {
    name: "唐揚げ丼L",
    issued: [{dummy:"hoge"}],
    price: 470
  },
  {
    name: "唐揚げ丼M",
    issued: [{dummy:"hoge"}],
    price: 390
  },
  {
    name: "カレーライス",
    issued: [{dummy:"hoge"}],
    price: 310
  },
  {
    name: "カレー大盛",
    issued: [{dummy:"hoge"}],
    price: 360
  },
  {
    name: "ミニカレー",
    issued: [{dummy:"hoge"}],
    price: 160
  },
  {
    name: "生卵",
    issued: [{dummy:"hoge"}],
    price: 50
  },
  {
    name: "温泉卵",
    issued: [{dummy:"hoge"}],
    price: 50
  },
  {
    name: "チーズ",
    issued: [{dummy:"hoge"}],
    price: 50
  },
  {
    name: "コロッケ",
    issued: [{dummy:"hoge"}],
    price: 50
  },
  {
    name: "日替わりトッピング",
    issued: [{dummy:"hoge"}],
    price: 80
  },
  {
    name: "特別中華麺",
    issued: [{dummy:"hoge"}],
    price: 540
  },
  {
    name: "日替わり中華麺",
    issued: [{dummy:"hoge"}],
    price: 420
  },
  {
    name: "特別麺そば",
    issued: [{dummy:"hoge"}],
    price: 540
  },
  {
    name: "特別麺うどん",
    issued: [{dummy:"hoge"}],
    price: 540
  },
  {
    name: "日替わりそば",
    issued: [{dummy:"hoge"}],
    price: 300
  },
  {
    name: "日替わりうどん",
    issued: [{dummy:"hoge"}],
    price: 300
  },
  {
    name: "麺大盛+半玉",
    issued: [{dummy:"hoge"}],
    price: 50
  },
  {
    name: "麺ジャンボ+1玉",
    issued: [{dummy:"hoge"}],
    price: 100
  },
  {
    name: "きつね",
    issued: [{dummy:"hoge"}],
    price: 30
  },
  {
    name: "たぬき",
    issued: [{dummy:"hoge"}],
    price: 30
  },
  {
    name: "竹輪天",
    issued: [{dummy:"hoge"}],
    price: 50
  },
  {
    name: "カレーソース",
    issued: [{dummy:"hoge"}],
    price: 90
  },
  {
    name: "かき揚げ",
    issued: [{dummy:"hoge"}],
    price: 50
  },
  {
    name: "小鉢サラダ",
    issued: [{dummy:"hoge"}],
    price: 80
  },
  {
    name: "ライス大",
    issued: [{dummy:"hoge"}],
    price: 150
  },
  {
    name: "ライス中",
    issued: [{dummy:"hoge"}],
    price: 100
  },
  {
    name: "ライス小",
    issued: [{dummy:"hoge"}],
    price: 80
  },
  {
    name: "味噌汁",
    issued: [{dummy:"hoge"}],
    price: 30
  },
  {
    name: "ソフトクリーム",
    issued: [{dummy:"hoge"}],
    price: 200
  }
]
const setMenu = () => {
  firebase.database().ref('tickets/').update({menu});
}
// setMenu();