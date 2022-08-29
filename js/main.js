let today = document.getElementById("today");
let todayDate = document.getElementById("todayDate");
let cityLocation = document.getElementById("cityLocation");
let todayDegree = document.getElementById("todayDegree");
let todayIcon = document.getElementById("todayIcon");
let todayStatus = document.getElementById("todayStatus");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("windSpeed");
let windDirection = document.getElementById("windDirection");
let date = new Date();  // Today
let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let months=["Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
let currentCity = "Cairo";
let responseContainer;

let nextDay = document.getElementsByClassName("next-day"),
    nextDate = document.getElementsByClassName("next-date"),
    nextDayIcon = document.getElementsByClassName("nextDay-icon"),
    maximum = document.getElementsByClassName("maximum"),
    minimum = document.getElementsByClassName("minimum"),
    nextDayStatus = document.getElementsByClassName("nextDay-status");


// Fetch data from API
async function getWeatherDetails(){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3d5135c152244ec1aee224825222607&q=${currentCity}&days=3`);
    responseContainer = await response.json();
    console.log(responseContainer);
    displayTodayTemp();
    displayNextDayTemp();
};

// Display today's temperature
function displayTodayTemp(){
    let tDate = responseContainer.forecast.forecastday[0].date;
    let dateFormat = tDate.split("-");
    let todayNum = dateFormat[2];
    today.innerHTML =days[date.getDay()];
    todayDate.innerText = `${todayNum} ${months[date.getMonth()]}`;
    cityLocation.innerHTML = responseContainer.location.name;
    todayDegree.innerHTML = Math.round(responseContainer.current.temp_c);
    todayIcon.setAttribute("src",`https:${responseContainer.current.condition.icon}`);
    todayStatus.innerHTML = responseContainer.current.condition.text;
    humidity.innerHTML = responseContainer.current.humidity;
    windSpeed.innerHTML = responseContainer.current.wind_kph;
    windDirection.innerText = responseContainer.current.wind_dir;
}

//Next day functions
function getNextDays(nextDays){
    let nDays = new Date(nextDays);
    return nDays && days[nDays.getDay()];
};

function getNextDayMonth(nextDays){
    let nDaysMonth = new Date(nextDays);
    return nDaysMonth && months[nDaysMonth.getMonth()];
};

function displayNextDayTemp(){
    for(let i=0 ; i<nextDay.length ; i++){
        let nextDays = responseContainer.forecast.forecastday[i+1].date;
        let nextDateFormat = nextDays.split("-");
        let nextDayNum = nextDateFormat[2];
        nextDay[i].innerHTML = getNextDays(nextDays);
        nextDate[i].innerHTML = `${nextDayNum} ${getNextDayMonth(nextDays)}`;
        nextDayIcon[i].setAttribute("src",`http:${responseContainer.forecast.forecastday[i+1].day.condition.icon}`);
        maximum[i].innerHTML = Math.round(responseContainer.forecast.forecastday[i+1].day.maxtemp_c);
        minimum[i].innerHTML = Math.round(responseContainer.forecast.forecastday[i+1].day.mintemp_c);
        nextDayStatus[i].innerHTML = responseContainer.forecast.forecastday[i+1].day.condition.text;
    };
};

// search function   
searchInput.addEventListener("keyup",function(){
    currentCity  = searchInput.value;
    getWeatherDetails();
});

getWeatherDetails();
