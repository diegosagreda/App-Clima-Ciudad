//Seleccionamos elementos del documento html
const btnSearch = document.getElementById('btn-search');
const inputCity = document.getElementById('input-city');
const containerInfo = document.getElementById('container-info-city');
const containerIcon = document.getElementById('container-info-icon');

const API_KEY = "3e3d2abf4a842d3b71843412ba54b8dc"

//La api nos da la temperatura en grados kelvin por lo tanto crearemos una funcion para pasar la temperatura a centigrados
const kelvinToCentigrados = (temp) => Math.round(temp - 273.15);

//Funcion para consultar la  temperatura de la ciudad
const consultarTemperatura = () =>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&APPID=${API_KEY}`)
        .then(response => response.json())
        .then(data => {

            //validamos el status de la respuesta que nos envia la api
            //Si todo va OK tenemos:
            if (data.cod === 200){
                //Extraemos de la respuesta la informacion importante para el ejercicio
                let temperature = kelvinToCentigrados(data.main.temp);
                let climate = data.weather[0].main;
                let description = data.weather[0].description;
                let icon = data.weather[0].icon
    
                //Mostramos la informacion en la parte del frontend
                containerInfo.innerHTML = `
                    <h2>${temperature}°C</h2>
                    <h5>Climate: <span>${climate}</span> </h5>
                    <h5>Description: <span>${description}</span></h5>
                   
                `
                containerIcon.innerHTML = `
                    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="icon weather">
                `

            }else{
                //Limpiamos html---------------
                containerInfo.innerHTML = ""
                containerIcon.innerHTML = ""
                //------------------------------
                containerInfo.innerHTML = `
                    <p>City not found !!!</p>
                `
                setTimeout(()=>{
                    containerInfo.innerHTML = ""
                },2000)
            }
    })
    
}

btnSearch.addEventListener('click',consultarTemperatura)



