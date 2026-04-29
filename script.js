let mode = "login";

/* =========================
   LOAD USER (SESSION)
========================= */
window.onload = function(){

  let user = JSON.parse(localStorage.getItem("user"));

  if(user){

    document.getElementById("logo").innerText =
      "✈️ Welcome " + user.name;

    document.getElementById("heroText").innerText =
      "✈️ სად მიდიხარ, " + user.name + "?";

    document.getElementById("nav").innerHTML = `
      <button onclick="location.href='profile.html'">Profile 👤</button>
      <button onclick="location.href='about.html'">About 🌍</button>
      <button onclick="logout()">Logout 🚪</button>
    `;
  }
};

function openAuth(){
  document.getElementById("auth").classList.remove("hidden");
  switchAuth("login");
}

function closeAuth(){
  document.getElementById("auth").classList.add("hidden");
}

function switchAuth(type){

  mode = type;

  document.getElementById("title").innerText =
    type === "login" ? "Login" : "Register";

  document.getElementById("loginTab").classList.remove("active");
  document.getElementById("registerTab").classList.remove("active");

  if(type === "login"){
    document.getElementById("loginTab").classList.add("active");
  } else {
    document.getElementById("registerTab").classList.add("active");
  }
}

function auth(){

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let pass = document.getElementById("password").value.trim();

  if(!email || !pass){
    alert("Fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  if(mode === "register"){

    if(!name){
      alert("Enter name");
      return;
    }

    let exists = users.find(u => u.email === email);

    if(exists){
      alert("User already exists ❌");
      return;
    }

    users.push({name,email,pass});
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered ✔️ Welcome " + name);
  }

  else{

    let found = users.find(u => u.email === email && u.pass === pass);

    if(found){

      localStorage.setItem("user", JSON.stringify(found));

      alert("Login success ✔️ Hello " + found.name);

      location.reload();

    } else {
      alert("Wrong credentials ❌");
    }
  }

  closeAuth();
}

function logout(){
  localStorage.removeItem("user");
  location.reload();
}

function search(){

  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;
  let date = document.getElementById("date").value;

  if(!date){
    alert("Choose date");
    return;
  }

  let box = document.getElementById("results");
  box.innerHTML = "";

  for(let i=0;i<5;i++){

    let price = Math.floor(Math.random()*400)+100;
    let time = (Math.floor(Math.random()*12)+1)+":00";

    let flight = {from,to,date,price,time};

    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      ✈️ ${from} → ${to}<br>
      📅 ${date}<br>
      🕒 ${time}<br>
      💰 ${price}₾<br><br>

      <button onclick='book("${encodeURIComponent(JSON.stringify(flight))}")'>
        BOOK ✈️
      </button>
    `;

    box.appendChild(div);
  }
}
========================= */
function book(f){

  let flight = JSON.parse(decodeURIComponent(f));

  localStorage.setItem("selected", JSON.stringify(flight));

  window.location = "payment.html";
}
