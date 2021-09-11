
const go = document.querySelector(".submit");
const themes = ["red", "green", "blue"];

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
    fn = getName();
    ln = getName2();
    a = getAmt();
    d = getDate();
    m = getMethod();
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

    color = themes[randInt(3)]

    let line1 = document.createElement("div");
    line1.classList.add("line");
    line1.classList.add(color);
    receipt.appendChild(line1);
    const deets = document.createElement("p")
    deets.innerHTML = "<br><b>Organization:</b> Laugh Out Together Foundation" + "<br>" + 
    "<br><b>Donor Name:</b> " + fname + " " + lname + 
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
}

function printDiv(divId,
    title) {
  
    let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');
  
    mywindow.document.write(`<html><head><title></title>`);
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.querySelector("."+divId).innerHTML);
    mywindow.document.write('</body></html>');
  
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
  
    mywindow.print();
    mywindow.close();

    return true;
  }

go.addEventListener("click", testAll)