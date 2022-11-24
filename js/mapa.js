
//Seleccionamos elementos del documento html
const btnSearch = document.getElementById('btn-search');
const btnClear = document.getElementById('btn-clear');
const inputCity = document.getElementById('input-city');
const containerInfo = document.getElementById('container-info-city');
const containerIcon = document.getElementById('container-info-icon');
const mapa = document.getElementById('map');
const contenedor = document.getElementById('main-container')

//Api key 
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
                let climate = data.main.humidity;                ;
                let description = kelvinToCentigrados(data.main.temp_max
                  );
                let icon = data.weather[0].icon
    
                //Mostramos la informacion en la parte del frontend
                containerInfo.innerHTML = `
                    <h2>${temperature}°C</h2>
                    <h5>Humedad: <span>${climate}</span> </h5>
                    <h5>Temperatura Max: <span>${description}°C</span></h5>
                   
                `
                containerIcon.innerHTML = `
                    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="icon weather">
                `
                //-************  API MAPA *******************************
                //Si la ciudad se encuentra mostramos un mapa de la ciudad para esto utilizamos la libreria LEAFLET
                containerIcon.innerHTML = `
                <div id="map"></div>
                `
                //Una vez encontramos la ciudad extraemos la latitud y longitud 
                //para pasar como parametros a la api de mapas.
                let map = L.map('map').setView([data.coord.lat,data.coord.lon],10)
                //Agregar tilelAyer mapa base desde openstreetmap
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
                  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

            }else{
                //Libreria para lanzar alertas
                //Error ciudad no encontrada
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Ciudad no encontrada',
                    showConfirmButton: false,
                    timer: 2500
                  })
                //---------------------------------------------------
            }
    })
    
}
//Funcion para limpiar la aplicacion
const limpiarApp=()=> {
    containerIcon.innerHTML = ""
    containerInfo.innerHTML = ""
    inputCity.value = ""
}

//Asignamos eventos a los botones de buscar y limpiar
btnSearch.addEventListener('click',consultarTemperatura)
btnClear.addEventListener('click',limpiarApp)



