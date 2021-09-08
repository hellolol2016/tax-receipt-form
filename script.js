const go = document.querySelector(".submit");


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
    createReceipt(fn, ln ,a,d, m);
}

const receipt = document.querySelector(".receipt-container");

function createReceipt(fname, lname, amt, date, method){
    const intro = document.createElement("p");
    intro.innerHTML = "Dear " + fname + ",<br> Here is your receipt for your generous donation to the Laugh Out Together Foundation"+
    "<br><br>Here is a summary of your donation:";
    receipt.appendChild(intro);

    let line1 = document.createElement("div");
    line1.classList.add("line");

    receipt.appendChild(line1);
    const deets = document.createElement("p")
    deets.innerHTML = "Organization: Laugh Out Together Foundation" + "<br>" + 
    "Donor Name: " + fname + " " + lname + 
    "<br>Amount: " + amt + "<br>" + "Date: " + date + "<br>" + 
    "Method" + ": " + method + "<br>"

    receipt.appendChild(deets);

    let line2 = document.createElement("div");
    line2.classList.add("line");
    receipt.appendChild(line2);

    const final = document.createElement("p");
    final.innerHTML = "<br> With Love,<br>The Laugh Out Together Finance Team <br><br>" + 
    "Laugh Out Together is a registered 501(c)(3) non-profit organization #86-2949649. <br>" +
    "Your donation is tax deductible to the extend allowed by law.<br>No goods or services were provided "+
    "by Laugh Out Together in return for this contribution."
    
    receipt.appendChild(final)


}



go.addEventListener("click", testAll)