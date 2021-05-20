const config = {
  apiKey: "AIzaSyCXkqAFgbz3hP6LLpQt11iJzXcXrc8MDgU",
  authDomain: "mealticket-1585f.firebaseapp.com",
  databaseURL: "https://mealticket-1585f-default-rtdb.firebaseio.com",
  projectId: "mealticket-1585f",
  storageBucket: "mealticket-1585f.appspot.com",
  messagingSenderId: "171132223510",
  appId: "1:171132223510:web:13ea0883b7e66187893537",
  measurementId: "G-MS6L1K17ED"
};

firebase.initializeApp(config);

const writeData = () => {
  firebase.database().ref('tickets/').set({
    menu: [
      {
        name: "唐揚げ定食",
        number: 0,
        price: 500
      },
      {
        name: "唐揚げ弁当",
        number: 0,
        price: 500
      },
      {
        name: "デイリーランチ",
        number: 10,
        price: 370
      },
      {
        name: "デイリーランチライス小",
        number: 10,
        price: 350
      },
      {
        name: "デイリーランチライス大",
        number: 10,
        price: 420
      },
      {
        name: "唐揚げ丼L",
        number: 10,
        price: 470
      },
      {
        name: "唐揚げ丼M",
        number: 10,
        price: 390
      },
      {
        name: "カレーライス",
        number: 10,
        price: 310
      },
      {
        name: "カレー大盛",
        number: 10,
        price: 360
      },
      {
        name: "ミニカレー",
        number: 10,
        price: 160
      },
      {
        name: "生卵",
        number: 10,
        price: 50
      },
      {
        name: "温泉卵",
        number: 10,
        price: 50
      },
      {
        name: "チーズ",
        number: 10,
        price: 50
      },
      {
        name: "コロッケ",
        number: 10,
        price: 50
      },
      {
        name: "日替わりトッピング",
        number: 10,
        price: 80
      },
      {
        name: "特別中華麺",
        number: 10,
        price: 540
      },
      {
        name: "日替わり中華麺",
        number: 10,
        price: 420
      },
      {
        name: "特別麺そば",
        number: 10,
        price: 540
      },
      {
        name: "特別麺うどん",
        number: 10,
        price: 540
      },
      {
        name: "日替わりそば",
        number: 10,
        price: 300
      },
      {
        name: "日替わりうどん",
        number: 10,
        price: 300
      },
      {
        name: "麺大盛+半玉",
        number: 10,
        price: 50
      },
      {
        name: "麺ジャンボ+1玉",
        number: 10,
        price: 100
      },
      {
        name: "きつね",
        number: 10,
        price: 30
      },
      {
        name: "たぬき",
        number: 10,
        price: 30
      },
      {
        name: "竹輪天",
        number: 10,
        price: 50
      },
      {
        name: "カレーソース",
        number: 10,
        price: 90
      },
      {
        name: "かき揚げ",
        number: 10,
        price: 50
      },
      {
        name: "小鉢サラダ",
        number: 10,
        price: 80
      },
      {
        name: "ライス大",
        number: 10,
        price: 150
      },
      {
        name: "ライス中",
        number: 10,
        price: 100
      },
      {
        name: "ライス小",
        number: 10,
        price: 80
      },
      {
        name: "味噌汁",
        number: 10,
        price: 30
      },
      {
        name: "ソフトクリーム",
        number: 10,
        price: 200
      }
    ]
  });
}
// writeData();

const ticketsRef = firebase.database().ref('tickets/menu');
ticketsRef.once('value', snapshot => {
  const data = snapshot.val();
  console.log(data);
  for(let i=0; i<data.length; i++) {
    const wrapper = document.getElementById("menuCard_wrapper");
    const name = document.createElement("p");
    const price = document.createElement("p");
    const card = document.createElement("button");
    name.classList.add("menuCard_name");
    name.innerHTML = data[i].name;
    price.classList.add("menuCard_price");
    price.innerHTML = data[i].price + "円";
    card.classList.add("menuCard");
    card.setAttribute("id", `menuCard-${i}`);
    card.insertAdjacentElement("beforeend", name);
    card.insertAdjacentElement("beforeend", price);
    wrapper.insertAdjacentElement('beforeend', card);
  }
});