// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmFj1ri_eCHhG4UXRthYjZXZO5CD5G1ig",
  authDomain: "lotreceipt.firebaseapp.com",
  databaseURL: "https://lotreceipt-default-rtdb.firebaseio.com",
  projectId: "lotreceipt",
  storageBucket: "lotreceipt.appspot.com",
  messagingSenderId: "396882280237",
  appId: "1:396882280237:web:2b96f2343f6e08cc029da4",
  measurementId: "G-FVMQ8WR4LX"
};

var firebase = initializeApp(firebaseConfig);

var config = {
    apiKey: "AIzaSyBmFj1ri_eCHhG4UXRthYjZXZO5CD5G1ig",
    authDomain: "lotreceipt.firebaseapp.com",
    // For databases not in the us-central1 location, databaseURL will be of the
    // form https://[databaseName].[region].firebasedatabase.app.
    // For example, https://your-database-123.europe-west1.firebasedatabase.app
    databaseURL: "https://lotreceipt-default-rtdb.firebaseio.com",
    storageBucket: "lotreceipt.appspot.com"
  };

  // Get a reference to the database service
  const db = getDatabase()
  function uploadReceipt(num, name, amt, date, method) {
    let ID = createID(num);
    set(ref(db, 'receipts/' + num), {
        ID: ID,
        name : name,
        amt : amt,
        date : date,
        method : method
    });
  }



const receiptRef = ref(db,"receipts/");
let curRecNum = 1;
onValue(receiptRef, (snapshot)=>{
    const data = snapshot.val();
    console.log(data)
    console.log(data.length)
    if(data.length == undefined){
        curRecNum = 1;
    } else {
        curRecNum = data.length;
    }
})

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  function createID(number){
      let l = alpha.charAt((number / 999999) | 0);
      return l + pad(number%999999, 6);
  }

const go = document.querySelector(".submit");
const themes = ["red", "green", "blue"];
const checkmark = document.querySelector('.yesid');
function getName(){
    let name = document.querySelector("#name1").value;
    return(name)
}

function getName2(){
    let name = document.querySelector("#name2").value;
    return(name)
}


function getAmt(){
    let amt = document.querySelector("#amt").value;
    return(amt)
}

function getDate(){
    let date = document.querySelector("#date").value;
    return(date)
}

function getMethod(){
    let method = document.querySelector("#method").value;
    return(method)
}

function testAll(){
    let fn = getName();
    let ln = getName2();
    let a = getAmt();
    let d = getDate();
    let m = getMethod();
    clearReceipt();
    createReceipt(fn, ln ,a,d, m);
}

const receipt = document.querySelector(".receipt-container");
receipt.style.margin = "5px";
receipt.style.fontFamily = "'PT Sans', sans-serif";
function clearReceipt(){
    while (receipt.firstChild) {
        receipt.removeChild(receipt.firstChild);
    }
}

function randInt(max){
    return Math.floor(Math.random() * max);
}

var doc = jsPDF();

function createReceipt(fname, lname, amt, date, method){
    const intro = document.createElement("p");
    intro.innerHTML = "<hr><br>Dear " + fname + ",<br> Thank you for your generous donation to the Laugh Out Together Foundation!"+
    "<br><br>Here is a summary of your donation:";
    receipt.appendChild(intro);

    let color = themes[randInt(3)]
    let fullName = fname + " " + lname
    let line1 = document.createElement("div");
    line1.classList.add("line");
    line1.classList.add(color);
    receipt.appendChild(line1);
    const deets = document.createElement("p")
    deets.innerHTML = "<br><b>Organization:</b> Laugh Out Together Foundation" + "<br>" + 
    "<br><b>Donor Name:</b> " + fullName + 
    "<br><br><b>Amount:</b> " + amt + "<br>" + "<br><b>Date:</b> " + date + "<br>" + 
    "<br><b>Method:</b> " + method + "<br>"
    deets.classList.add("details");
    receipt.appendChild(deets);

    let line2 = document.createElement("div");
    line2.classList.add("line");
    line2.classList.add(color);
    receipt.appendChild(line2);

    const final = document.createElement("p");
    final.innerHTML = "<br> With Love,<br>The Laugh Out Together Foundationbr><br>" + 
    "<i>Laugh Out Together is a registered 501(c)(3) non-profit organization #86-2949649. <br>" +
    "Your donation is tax deductible to the extend allowed by law.<br>No goods or services were provided "+
    "by Laugh Out Together in return for this contribution.</i><br><hr>"
    
    receipt.appendChild(final)

    if(checkmark.checked){
        // function uploadReceipt(num, name, amt, date, method)
        const recID = document.createElement("p");
        recID.innerHTML = "Receipt ID : " + createID(curRecNum);
        receipt.appendChild(recID);
        uploadReceipt(curRecNum, fullName, amt, date, method);
        console.log("uploaded to database " + createID(curRecNum));
    }

    
}

go.addEventListener("click", testAll)