let searchInput = document.getElementById("searchInput")

searchInput.addEventListener("keyup",function(){
    if(searchInput.value !== "" && searchInput.value.length > 2)
    callDis(searchInput.value)
}) 

async function recHttp(code){
    let http = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c605d83b932a4502a7a150827231408&q=${code}&days=3`);
    let apiData = await http.json()
    return apiData;
}

 function display (data){

    // let date = new Date(data.location.localtime)
    let dayNum = new Date(data.location.localtime).getDate()
    let dayName =new Date(data.location.localtime).toLocaleDateString("en-EG",{weekday:"long"})
    let monthName = new Date(data.location.localtime).toLocaleDateString("en-EG",{month:"long"})

    let nextDayIn = new Date(data.forecast.forecastday[1].date).toLocaleDateString("en-EG",{weekday:"long"})
    let thDayIn = new Date(data.forecast.forecastday[2].date).toLocaleDateString("en-EG",{weekday:"long"})


    document.getElementById("boxDay").innerHTML = `${dayName}`;
    document.getElementById("boxMonth").innerHTML = `${dayNum + monthName}`;

    let dataCurr = data.current; // Abbreviation
    document.getElementById("location").innerHTML =  data.location.name;
    document.getElementById("deg").innerHTML =   `${ dataCurr.temp_c}<sup>o</sup>C` ;
    document.getElementById("imgWeth").src =  dataCurr.condition.icon;
    document.getElementById("weatherType").innerHTML = `${ dataCurr.condition.text}`;
    document.getElementById("humidity").innerHTML = `<i class="fa-solid fa-umbrella fs-5"></i> ${ dataCurr.humidity }%`;
    document.getElementById("wind").innerHTML = `<i class="fa-solid fa-wind fs-5"></i> ${ dataCurr.wind_kph }km/h`;
    document.getElementById("windDir").innerHTML = `<i class="fa-solid fa-compass fs-5"></i>  ${ dataCurr.wind_dir}`;
    document.getElementById("nextDay").innerHTML = `${nextDayIn}`;
    document.getElementById("thDay").innerHTML = `${thDayIn}`;


    let dataFore1 = data.forecast.forecastday[1].day; // Abbreviation
    let dataFore2 = data.forecast.forecastday[2].day; // Abbreviation

    // Next Day
    document.getElementById("nextDayImg").src = `${dataFore1.condition.icon}`;
    document.getElementById("tempNextDay").innerHTML = `${dataFore1.maxtemp_c}<sup>o</sup>C` ;
    document.getElementById("tempNextDayNight").innerHTML = `${dataFore1.avgtemp_c}<sup>o</sup>` ;
    document.getElementById("typeNextDay").innerHTML = `${ dataFore1.condition.text}`;
    // End Next Day


    // Third Day
    document.getElementById("tempThDay").innerHTML = `${dataFore2.maxtemp_c}<sup>o</sup>C` ;
    document.getElementById("thDayImg").src = `${dataFore2.condition.icon}`;
    document.getElementById("tempThDayNight").innerHTML = `${dataFore2.avgtemp_c}<sup>o</sup>` ;
    document.getElementById("typeThDay").innerHTML = `${ dataFore2.condition.text}`;

 }

 async function callDis(code = "egypt"){
   display(await recHttp(code))
}
callDis()
