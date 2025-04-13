const apiKey = "YOUR_KEY";
var currentdate = new Date();
async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json)
    return json;
  } catch (error) {
    console.error(error.message);
  }
}
window.onload = (e) =>{
    console.log(currentdate.toLocaleTimeString());
    document.getElementById("gorod").addEventListener('keyup', (e) =>{
        if (e.key == 'Enter'){
                let city = document.getElementById('gorod').value
                const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=yes`
                getData(apiUrl).then(function(result){
                    document.getElementById("town").innerText = result.location.name
                    document.getElementById("tempa").innerText = Math.round(result.current.temp_c)+" °C"
                    document.getElementById("h2").innerText = result.location.localtime
                    document.getElementById("icon").style.backgroundImage=`url(${result.current.condition.icon})`
                    for (let i = 0; i < 7; i++) {
                      document.getElementById(`${i}`).firstChild.innerText = result.forecast.forecastday[i].date.substr(8, 9 )
                      document.getElementById(`${i}`).firstChild.innerText += " "+Math.round(result.forecast.forecastday[i].day.avgtemp_c)+" °C"
                      document.getElementById(`icon${i}`).style.backgroundImage=`url(${result.forecast.forecastday[i].day.condition.icon})`
                    }
                })
        }
    })
};