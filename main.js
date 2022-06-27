// fetch('https://www.cbr-xml-daily.ru/daily_json.js').then(function (result) {
//     return result.json();
// }).then(function (data) {
//     console.log(data);
// });






// ================================================================================================





// async - асинхронная функция
// Функция получения курса валют и отображения их на странице 
async function getCurrencies() {
    // await - подождать пока fetch выполнится, записать в переменную и двигаться дальше
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;
    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);


    if (rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('top');
        elementUSD.classList.remove('bottom');
    } else {
        elementUSD.classList.add('bottom');
        elementUSD.classList.remove('top');
    }

    if (rates.EUR.Value > rates.EUR.Previous) {
        elementEUR.classList.add('top');
        elementEUR.classList.remove('bottom');
    } else {
        elementEUR.classList.add('bottom');
        elementEUR.classList.remove('top');
    }

    if (rates.GBP.Value > rates.GBP.Previous) {
        elementGBP.classList.add('top');
        elementGBP.classList.remove('bottom');
    } else {
        elementGBP.classList.add('bottom');
        elementGBP.classList.remove('top');
    }
}
getCurrencies();
setInterval(getCurrencies, 10000);
// Объект с курсами 3-х валют
const rates = {};

// элементы для отображения курса валют
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

// элементы формы
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

// Функция ковертации
function convertValue() {
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
}

input.oninput = convertValue;
select.oninput = convertValue;