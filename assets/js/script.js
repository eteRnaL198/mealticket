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

// メニュー表示
const menuRef = firebase.database().ref('tickets/menu');
menuRef.once('value', snapshot => {
  const data = snapshot.val();
  for(let i=0; i<data.length; i++) {
    const wrapper = document.getElementById("js-menuCard_wrapper");
    const name = document.createElement("p");
    const number = document.createElement("p");
    const price = document.createElement("p");
    const card = document.createElement("button");
    name.classList.add("menuCard_name");
    name.innerHTML = data[i].name;
    number.classList.add("menuCard_number");
    number.innerHTML = "未受取数: " + data[i].number;
    price.classList.add("menuCard_price");
    price.innerHTML = data[i].price + "円";
    card.classList.add("menuCard");
    card.setAttribute("id", `menuCard-${i}`);
    const args = [data[i].name, data[i].number, data[i].price]
    card.addEventListener('click', () => displayDetail(args));
    card.insertAdjacentElement("beforeend", name);
    card.insertAdjacentElement("beforeend", number);
    card.insertAdjacentElement("beforeend", price);
    wrapper.insertAdjacentElement('beforeend', card);
  }
});

// メニュー詳細表示
const displayDetail = (args) => {
  const main = document.getElementById('js-main');
  const modal = document.createElement('div');
  const back = document.createElement('div');
  const name = document.createElement('p');
  const num = document.createElement('p');
  const price = document.createElement('p');
  const orderButton = document.createElement('button');
  modal.classList.add("menuDetail");
  modal.setAttribute('id', 'js-menuDetail');
  back.classList.add("menuDetail_backScreen");
  back.setAttribute('id', 'js-backScreen');
  name.classList.add("menuDetail_name");
  name.innerHTML = args[0];
  num.classList.add("menuDetail_num");
  num.innerHTML = "未受取人数" + args[1];
  price.classList.add("menuDetail_price");
  price.innerHTML = args[2] + "円";
  orderButton.classList.add("menuDetail_order");
  orderButton.innerHTML = '注文';
  modal.insertAdjacentElement("beforeend", name);
  modal.insertAdjacentElement("beforeend", num);
  modal.insertAdjacentElement("beforeend", price);
  modal.insertAdjacentElement("beforeend", orderButton);
  main.insertAdjacentElement("beforeend", back);
  main.insertAdjacentElement("beforeend", modal);

  back.addEventListener('click', () => {
    back.remove();
    modal.remove();
  });
  orderButton.addEventListener('click', () => displayTicket(args[0]));
}

//食券表示
const displayTicket = (name) => {
  const back = document.getElementById('js-backScreen');
  const modal = document.getElementById('js-menuDetail');
  const inner = document.getElementById('js-ordered_inner');
  const none = document.getElementById('js-ordered_none');
  const card = document.createElement('div');
  const title = document.createElement('p');
  const button = document.createElement('button');
  none.classList.add('hidden');
  title.classList.add("ordered_title");
  title.innerHTML = name;
  button.classList.add("ordered_button");
  button.innerHTML = '受け取り';
  card.classList.add("ordered_card");
  card.insertAdjacentElement("beforeend",title);
  card.insertAdjacentElement("beforeend",button);
  inner.insertAdjacentElement("beforeend",card);
  if(back !== null & modal !== null) {
    back.remove();
    modal.remove();
  }
  button.addEventListener("click", () => displayReserve(name));
}


//受け取り
const displayReserve = (name) => {
  const wrapper = document.getElementById("js-ordered_wrapper");
  const orderedInner = document.getElementById("js-ordered_inner");
  const reserve = document.createElement("p");
  const back = document.createElement("button");
  const inner = document.createElement("div");
  const menu = document.createElement("p")
  const code = document.createElement("div");
  const title = document.createElement("p");
  const num = document.createElement("p");
  const form = document.createElement("div");
  const input = document.createElement("input");
  const button = document.createElement("button");
  title.classList.add("code_title");
  title.innerHTML = "受け取りコード";
  num.classList.add("code_num");
  num.innerHTML = "w4FimR5u";
  code.classList.add("code");
  code.insertAdjacentElement("beforeend",title);
  code.insertAdjacentElement("beforeend",num);
  input.classList.add("form_input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "確認番号を入力");
  button.classList.add("form_button");
  button.innerHTML = "確認";
  form.classList.add("form");
  form.insertAdjacentElement("beforeend",input);
  form.insertAdjacentElement("beforeend",button);
  menu.classList.add("menu");
  menu.innerHTML = name;
  back.classList.add("reserve_back");
  back.innerHTML = "戻る";
  inner.classList.add("reserve_inner");
  inner.insertAdjacentElement("beforeend", menu);
  inner.insertAdjacentElement("beforeend", code);
  inner.insertAdjacentElement("beforeend", form);
  reserve.classList.add("reserve");
  reserve.insertAdjacentElement("beforeend", back);
  reserve.insertAdjacentElement("beforeend", inner);
  wrapper.insertAdjacentElement("beforeend",reserve);
  orderedInner.classList.add("hidden");
  back.addEventListener('click' ,() => {
    reserve.remove();
    orderedInner.classList.remove("hidden");
  });
}


// タブバー
const tabbar = document.getElementById('js-tabbar');
buttons = tabbar.children;
Array.from(buttons).forEach((elem, idx) => {
  const menu = document.getElementById('js-menuCard_wrapper');
  const ordered = document.getElementById('js-ordered_wrapper');
  const wrappers = [menu, ordered];
  elem.addEventListener("click", () => {
    if (!Array.from(buttons)[idx].classList.contains("pressed")) {
      Array.from(buttons).forEach(elem => {
        elem.classList.remove('pressed');
      })
      elem.classList.add("pressed");
      wrappers.forEach(elem => {
        elem.classList.add('hidden');
      })
      wrappers[idx].classList.remove('hidden');
    }
  })
})