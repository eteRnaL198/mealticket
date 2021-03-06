"use strict";

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

const getMenuButtons = async () => {
  let buttons;
  await firebase.database().ref('tickets/menu').once('value', snapshot => {
    const data = snapshot.val();
    buttons = data.map((menu, idx) => {
      const inner = document.getElementById('js-menuInner');
      const button = document.createElement('button');
      button.classList.add('menu_button');
      button.innerHTML = menu.name;
      button.addEventListener('click', () => {
        displayTicket(menu.name, idx);
      })
      inner.insertAdjacentElement("beforeend", button);
      return button;
    });
  });
  return buttons;
};

(async () => {
  const buttons = await getMenuButtons();
  console.log(buttons);
  buttons.forEach((button) => {
    const toggleButton = (thisButton) => {
      buttons.forEach(button => {
        button.classList.remove('pressed');
      });
      thisButton.classList.add('pressed');
    }
    button.addEventListener('click', () => toggleButton(button));
  });
})();


const displayTicket = (name, arg_idx) => {
  const title = document.getElementById('js-ticketTitle');
  title.innerHTML = name;
  firebase.database().ref('tickets/menu/'+arg_idx+'/issued').on('value', snapshot => {
    const inner = document.getElementById('js-ticketInner');
    while(inner.firstChild){
      inner.removeChild(inner.firstChild);
    }
    const issued = snapshot.val();
    if(issued.length > 1) {
      issued.forEach((val,idx) => {
        if(idx !== 0) {
          const inner = document.getElementById('js-ticketInner');
          const card = document.createElement('div');
          const codeText = document.createElement('p');
          const code = document.createElement('p');
          const num = document.createElement('p');
          codeText.innerHTML = '?????????????????????: ';
          code.classList.add('ticket_code');
          code.innerHTML = val.code;
          num.innerHTML = '????????????: ' + val.auth_num;
          card.classList.add('ticket_card');
          card.insertAdjacentElement("beforeend", codeText);
          card.insertAdjacentElement("beforeend", code);
          card.insertAdjacentElement("beforeend", num);
          inner.insertAdjacentElement("beforeend",card);
        }
      })
    }
  });
}