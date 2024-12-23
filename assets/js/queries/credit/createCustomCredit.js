const nameInput = document.getElementById('nameInput');
const creditValueNumber = document.getElementById('creditValue');
const totalCreditValueNumber = document.getElementById('totalCreditValue');
const daysAmountCont = document.getElementById('diaria-container');
const weeksAmountCont = document.getElementById('semanas-container');
const montlyPaymentCont = document.getElementById('unique-payment-date');
const weeksAmount = document.getElementById('weeksAmount');
const daysAmount = document.getElementById('daysAmount');
const firstPaymentDate = document.getElementById('firstPaymentDate');
const nameSpan = document.getElementById('nameAutocomplete');
const idInput = document.getElementById('idInput');
const paymentModel = document.getElementById('paymentModel');
const infoContainer = document.getElementById('info-container');

const Params = new URLSearchParams(window.location.search);
const customerId = Params.get("cid");

console.log(customerId)

// Nome autoexplicativo
function formateAMerdaDaData(data) {
    let newArr = data.split("-"); 
    return `${newArr[2]}/${newArr[1]}/${newArr[0]}`
}

function calculateValue() {

    if (paymentModel.value == 'daily') {
        paymentsAmount = daysAmount.value;
        paymentsAmountDisp = daysAmount.value;
    } else {
        paymentsAmount = weeksAmount.value;
        paymentsAmountDisp = parseInt(paymentsAmount) + 1;
    }

    var finalValue = parseFloat(totalCreditValueNumber.value);
    finalValueSpan.innerHTML = finalValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    var paymentValue = finalValue / paymentsAmountDisp;
    paymentValueSpan.innerHTML = paymentValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

    paymentsAmountSpan.innerHTML = paymentsAmountDisp;
}

function hideDays() {
    if(paymentModel.value == "weekly") {
       weeksAmountCont.classList.remove('hide');
       daysAmountCont.classList.add('hide');
       montlyPaymentCont.classList.add('hide');
       infoContainer.classList.remove('hide');

    } else if(paymentModel.value == "daily") {
        weeksAmountCont.classList.add('hide');
        daysAmountCont.classList.remove('hide');
        montlyPaymentCont.classList.add('hide');
        infoContainer.classList.remove('hide');
    } else if(paymentModel.value == "unique") {
        weeksAmountCont.classList.add('hide');
        daysAmountCont.classList.add('hide');
        montlyPaymentCont.classList.remove('hide');
        infoContainer.classList.add('hide');
    }

    calculateDates();
}

function calculateDates() {

    if (paymentModel.value == 'daily') {
        var weekDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
        var weekDay = weekDays[new Date(firstPaymentDate.value).getDay() + 1];
        var daysToSum = parseInt(paymentsAmount);
        var lastDate = new Date(firstPaymentDate.value);

        switch (weekDay) {
            case 'seg':
                if (daysToSum > 6 && daysToSum < 13) {
                    daysToSum = daysToSum + 1;
                } else if (daysToSum > 13 && daysToSum < 19) {
                    daysToSum = daysToSum + 2;
                } else if (daysToSum > 18) {
                    daysToSum = daysToSum + 3
                }

                lastDate.setDate(lastDate.getDate() + daysToSum);
                break;

            case 'ter':
                if (daysToSum > 5 && daysToSum < 12) {
                    daysToSum = daysToSum + 1;
                } else if (daysToSum > 12 && daysToSum < 18) {
                    daysToSum = daysToSum + 2;
                } else if (daysToSum > 17) {
                    daysToSum = daysToSum + 3
                }

                lastDate.setDate(lastDate.getDate() + daysToSum);
                break;
        
            case 'qua':
                if (daysToSum > 4 && daysToSum < 11) {
                    daysToSum = daysToSum + 1;
                } else if (daysToSum > 11 && daysToSum < 17) {
                    daysToSum = daysToSum + 2;
                } else if (daysToSum > 16) {
                    daysToSum = daysToSum + 3
                }

                lastDate.setDate(lastDate.getDate() + daysToSum);
                break;

            case 'qui':
                if (daysToSum > 3 && daysToSum < 10) {
                    daysToSum = daysToSum + 1;
                } else if (daysToSum > 10 && daysToSum < 16) {
                    daysToSum = daysToSum + 2;
                } else if (daysToSum > 15) {
                    daysToSum = daysToSum + 3
                }

                lastDate.setDate(lastDate.getDate() + daysToSum);
                break;
            
            case 'sex':
                if (daysToSum > 2 && daysToSum < 9) {
                    daysToSum = daysToSum + 1;
                } else if (daysToSum > 9 && daysToSum < 15) {
                    daysToSum = daysToSum + 2;
                } else if (daysToSum > 14) {
                    daysToSum = daysToSum + 3
                }

                lastDate.setDate(lastDate.getDate() + daysToSum);
                break;

            case 'sab':
                if (daysToSum > 1 && daysToSum < 8) {
                    daysToSum = daysToSum + 1;
                } else if (daysToSum > 8 && daysToSum < 14) {
                    daysToSum = daysToSum + 2;
                } else if (daysToSum > 13) {
                    daysToSum = daysToSum + 3
                }

                lastDate.setDate(lastDate.getDate() + daysToSum);
                break;

            default:
                lastDate.setDate(lastDate.getDate() + daysToSum);
                break;
        }
    } else if (paymentModel.value == 'weekly') {
        var weeksAmount = parseInt(paymentsAmount);
        var lastDate = new Date(firstPaymentDate.value);

        if (weekDay == 'seg') {
            lastDate.setDate(lastDate.getDate() + ((weeksAmount * 7) + 1));
        } else {
            lastDate.setDate(lastDate.getDate() + (weeksAmount * 7));
        }
    } else if (paymentModel.value == 'unique') {
        var actualDate = new Date(firstPaymentDate.value);
        var lastDate = new Date();
        lastDate.setDate(actualDate.getDate() + 31);

        console.log({
            actualDate: actualDate.toISOString(),
            paymentDate: lastDate.toISOString()
        })

        document.getElementById('paymentDate').value = lastDate.toISOString().split('T')[0];
    }

    

    //firstPaymentDateSpan.innerHTML = formateAMerdaDaData(firstPaymentDate.value);
    //lastPaymentDateSpan.innerHTML = lastDate.toLocaleString("pt-br").split(' ')[0];
}

// Methods para criação de novo débito

var clientData = {
    name: "",
    clientId: ""
}

async function loadClientData() {
    const response = await fetch(
        `${BASEPATH}/customer/find`,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customerId: customerId })
        }
    )

    let data = await response.json();

    nameSpan.innerText = data.name;
    idInput.value = data._id;
    nameInput.placeholder = "";
    nameInput.value = data.name;

    clientData.name = data.name;
    clientData.clientId = data._id;
}

if (customerId) {
    loadClientData();
}

async function searchCustomers() {
    const customerStr = nameInput.value;

    const searchedCustomers = await fetch(
        `${BASEPATH}/customer/search`,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ queryString: customerStr, sellerId: sellerId })
        }
    )

    let response = await searchedCustomers.json();

    if (customerStr == "") {
        nameSpan.innerText = ""
    }
    else if (response) {
        nameSpan.innerText = response[0].name

        clientData.name = response[0].name;
        clientData.clientId = response[0]._id;
    }
}


async function createCustomCredit() {
    var requestBody = JSON.stringify(
        {
            sellerId: sellerId,
            customerId: clientData.clientId,
            value: parseFloat(creditValueNumber.value),
            totalValue: parseFloat(totalCreditValueNumber.value),
            firstPaymentDate: new Date(firstPaymentDate.value),
            paymentModel: paymentModel.value,
            paymentsAmount: parseInt(daysAmount.value),
            paymentsRemaing: parseInt(daysAmount.value)
        }
    );

    const newCredit = await fetch(
        `${BASEPATH}/debits/custom`,
        {
            method: 'POST', 
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody
        }
    );

    let response = await newCredit.json();

    if (response.debitId) {
        alert("Crédito criado com sucesso! Redirecionando para listagem...");
        window.location.href = "../"
    }
}