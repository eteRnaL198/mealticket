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
      }
    ]
  });
}
// writeData();

const ticketsRef = firebase.database().ref('tickets/menu');
ticketsRef.once('value', snapshot => {
  const data = snapshot.val();
  console.log(data);
  console.log(data.length);
  for(let i=0; i<data.length; i++) {
    const wrapper = document.getElementById("menuCard_wrapper");
    const card = document.createElement("div");
    const name = document.createElement("p");
    const number = document.createElement("p");
    const price = document.createElement("p");
    card.classList.add("menuCard");
    card.setAttribute("id", `menuCard-${i}`);
    name.classList.add("menuCard_name");
    name.innerHTML = data[i].name;
    number.classList.add("menuCard_number");
    number.innerHTML = data[i].number;
    price.classList.add("menuCard_price");
    price.innnerHTML = data[i].price;
    wrapper.insertAdjacentElement('beforeend', number);
  }
});