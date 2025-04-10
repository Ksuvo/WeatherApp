
const apiKey = "YOUR_KEY";
var currentdate = new Date();
async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
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
                const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
                getData(apiUrl).then(function(result){
                    document.getElementById("town").innerText = result.location.name
                    document.getElementById("tempa").innerText = result.current.temp_c  
                })
        }
    })
};