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
    number.innerHTML = "未受取数: " + data[i].issued.length;
    price.classList.add("menuCard_price");
    price.innerHTML = data[i].price + "円";
    card.classList.add("menuCard");
    card.setAttribute("id", `menuCard-${i}`);
    card.insertAdjacentElement("beforeend", name);
    card.insertAdjacentElement("beforeend", number);
    card.insertAdjacentElement("beforeend", price);
    wrapper.insertAdjacentElement('beforeend', card);
    
    card.addEventListener('click', () => {
      displayDetail([data[i].name, data[i].issued, data[i].price, i]);
    });
    firebase.database().ref('tickets/menu/'+i+'/issued').on('value', snapshot => {
      const data = snapshot.val();
      number.innerHTML = "未受取数: " + --data.length;
    });
  }
});


// メニュー詳細表示
const displayDetail = ([arg_name, arg_issued, arg_price, arg_idx]) => {
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
  name.innerHTML = arg_name;
  num.classList.add("menuDetail_num");
  num.innerHTML = "未受取人数" + arg_issued.length;
  price.classList.add("menuDetail_price");
  price.innerHTML = arg_price + "円";
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
  orderButton.addEventListener('click', () => {
    const code = Math.random().toString(32).substring(2,9);
    const auth_num = Math.floor((Math.random() * 9) + 1);
    const newIssued = {code: code, auth_num: auth_num};
    console.log("code: "+code+", auth_num: "+ auth_num);
    displayTicket([arg_name, arg_idx, code, auth_num]);
    firebase.database().ref('tickets/menu/' + arg_idx + '/issued').once('value', snapshot => {
      const data = snapshot.val();
      arg_issued = data;
    });
    firebase.database().ref('tickets/menu/' + arg_idx + '/issued').set(
        [...arg_issued, newIssued]
    );
    const orderedTickets = JSON.parse(localStorage.getItem('tickets'));
    const newTicket = {
      name: arg_name,
      idx: arg_idx,
      code: code,
      auth_num: auth_num
    };
    const newOrderedTickets = (orderedTickets !== null) ? [...orderedTickets, newTicket] : [newTicket];
    localStorage.setItem('tickets', JSON.stringify(newOrderedTickets));
  });
  firebase.database().ref('tickets/menu/'+arg_idx+'/issued').on('value', snapshot => {
    const data = snapshot.val();
    num.innerHTML = "未受取数: " + --data.length
  });
}

//食券表示
const displayTicket = ([arg_name, arg_idx, arg_code, arg_auth_num]) => {
  const back = document.getElementById('js-backScreen');
  const modal = document.getElementById('js-menuDetail');
  const inner = document.getElementById('js-ordered_inner');
  const none = document.getElementById('js-ordered_none');
  const card = document.createElement('div');
  const title = document.createElement('p');
  const button = document.createElement('button');
  none.classList.add('hidden');
  title.classList.add("ordered_title");
  title.innerHTML = arg_name;
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
  button.addEventListener("click", () => 
    displayReserve([arg_name, arg_idx, arg_code, arg_auth_num, card])
  );
}
(() => {
  const tickets = JSON.parse(localStorage.getItem('tickets'));
  console.log(tickets);
  if(tickets !== null) {
    tickets.map((ticket) => {
      displayTicket([ticket.name, ticket.idx, ticket.code, ticket.auth_num]);
    });
  }
})();


//受け取り
const displayReserve = ([arg_name, arg_idx, arg_code, arg_auth_num, arg_elem]) => {
  const wrapper = document.getElementById("js-ordered_wrapper");
  const orderedInner = document.getElementById("js-ordered_inner");
  const none = document.getElementById("js-ordered_none");
  const reserve = document.createElement("div");
  const back = document.createElement("button");
  const inner = document.createElement("div");
  const menu = document.createElement("p")
  const code = document.createElement("div");
  const title = document.createElement("p");
  const num = document.createElement("p");
  const form = document.createElement("div");
  const text = document.createElement("p");
  const select = document.createElement("select");
  const button = document.createElement("button");
  title.classList.add("code_title");
  title.innerHTML = "受け取りコード";
  num.classList.add("code_num");
  num.innerHTML = arg_code;
  code.classList.add("code");
  code.insertAdjacentElement("beforeend",title);
  code.insertAdjacentElement("beforeend",num);
  text.classList.add("form_text");
  text.innerHTML = "確認番号を選択";
  select.classList.add("form_select");
  for(let i=0; i<9; i++) {
    const option = document.createElement("option");
    option.setAttribute("value", i+1);
    option.innerHTML = i+1;
    select.insertAdjacentElement("beforeend", option);
  }
  button.classList.add("form_button");
  button.innerHTML = "確認";
  form.classList.add("form");
  form.insertAdjacentElement("beforeend",text);
  form.insertAdjacentElement("beforeend",select);
  form.insertAdjacentElement("beforeend",button);
  menu.classList.add("menu");
  menu.innerHTML = arg_name;
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
  button.addEventListener('click', () => {
    if(parseInt(select.value) === arg_auth_num) {
      console.log("受け取り完了");
      orderedInner.classList.remove("hidden");
      arg_elem.remove();
      reserve.remove();
      if(orderedInner.children.length === 1) none.classList.remove("hidden");
      let issued;
      firebase.database().ref('tickets/menu/'+ arg_idx + '/issued').once('value', snapshot => {
        const data = snapshot.val();
        issued = data;
        issued.pop();
      });
      firebase.database().ref('tickets/menu/' + arg_idx + '/issued').set(
        issued
      );
      const orderedTickets = JSON.parse(localStorage.getItem('tickets'));
      const newOrderedTickets = orderedTickets.filter(ticket => ticket.code !== arg_code)
      localStorage.setItem('tickets', JSON.stringify(newOrderedTickets));
    };
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