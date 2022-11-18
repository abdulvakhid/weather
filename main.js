
const elForm = document.querySelector(".form")
const elInput = document.querySelector(".input-search")
const elBox = document.querySelector(".list")
const elSearchBox = document.querySelector(".search-list")
const lastList = document.querySelector(".lasts");
const elTemplate = document.querySelector(".template").content;
const elSearchTemplate = document.querySelector(".search-template").content;
const lastSearch = [];
// default 
async function getWeather(city){
    const fragment = document.createDocumentFragment()
    try {
        const clonedTemplate = elTemplate.cloneNode(true);
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d58eb55b3ee60518eac850fa992dc184&units=metric`)
        const data = await res.json();
        clonedTemplate.querySelector(".city").textContent = data.name;
        clonedTemplate.querySelector(".celcius").textContent = Math.floor(data.main.temp);
        
        
        let arr = data.weather;
        arr.forEach(element => {
            clonedTemplate.querySelector(".weather-type").textContent = element.main;
            if (element.id > 800) {
                clonedTemplate.querySelector(".weather-img").src = "./images/icons/clouds.gif"; //clouds
            }else if (element.id == 800) {
                clonedTemplate.querySelector(".weather-img").src = "./images/icons/sunny.gif"; // clear sky
            }else if (element.id >= 701 && element.id <= 781) {
                clonedTemplate.querySelector(".weather-img").src = "./images/icons/mist.gif"; // atmosphere
            }else if (element.id >= 600 && element.id <= 622) {
                clonedTemplate.querySelector(".weather-img").src = "./images/icons/snow.gif"; // snow
            }else if (element.id >= 500 && element.id <= 531) {
                clonedTemplate.querySelector(".weather-img").src = "./images/icons/rain.gif"; // rain
                document.body.style.backgroundImage = "url(../images/rainy.gif)";
            }else if (element.id >= 300 && element.id <= 321) {
                clonedTemplate.querySelector(".weather-img").src = "./images/icons/drizzle.gif"; // drizzle
            }else if (element.id >= 200 && element.id <= 232) {
                clonedTemplate.querySelector(".weather-img").src = "./images/icons/thunderstorm.gif"; // thunderstorm
            }
        })
        let geolocation = Object.values(data.coord)
        let lat = geolocation[0];
        let lon = geolocation[1];
        
        clonedTemplate.querySelector(".link").href = `https://openweathermap.org/weathermap?basemap=map&cities=false&layer=windspeed&lat=${lon}&lon=${lat}&zoom=5`
        
        fragment.appendChild(clonedTemplate)
        elBox.appendChild(fragment)
        
    } catch (error) {
        console.log(error);
    }   
}

// search render fn 
async function searchRender(city){
    const fragment = document.createDocumentFragment()
    elSearchBox.innerHTML = "";
    try {
        const clonedTemplate = elSearchTemplate.cloneNode(true);
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d58eb55b3ee60518eac850fa992dc184&units=metric`)
        const data = await res.json();
        console.log(data);
        clonedTemplate.querySelector(".search-city").textContent = data.name;
        clonedTemplate.querySelector(".search-celcius").textContent = Math.floor(data.main.temp);
        let sunrize = data.dt;
        var date = new Date(sunrize * 1000);
        clonedTemplate.querySelector(".time").textContent = date.toLocaleTimeString("default")
        let arr = data.weather;
        arr.forEach(element => {
            if (element.id > 800) {
                clonedTemplate.querySelector(".search-item").style.backgroundImage = "url(../images/clouds.gif)"; //clouds
            }else if (element.id == 800) {
                clonedTemplate.querySelector(".search-item").style.backgroundImage = "url(../images/sky.gif)"; // clear sky
            }else if (element.id >= 701 && element.id <= 781) {
                clonedTemplate.querySelector(".search-item").style.backgroundImage = "url(../images/fog.gif)"; // atmosphere
            }else if (element.id >= 600 && element.id <= 622) {
                clonedTemplate.querySelector(".search-item").style.backgroundImage = "url(../images/snow.gif)"; // snow
            }else if (element.id >= 500 && element.id <= 531) {
                clonedTemplate.querySelector(".search-item").style.backgroundImage = "url(../images/rainy.gif)";// rain
            }else if (element.id >= 300 && element.id <= 321) {
                clonedTemplate.querySelector(".search-item").style.backgroundImage = "url(../images/drizzle.gif)"; // drizzle
            }else if (element.id >= 200 && element.id <= 232) {
                clonedTemplate.querySelector(".weather-img").src = "./images/icons/thunderstorm.gif"; // thunderstorm
            }
        })
        let geolocation = Object.values(data.coord)
        let lat = geolocation[0];
        let lon = geolocation[1];
        
        clonedTemplate.querySelector(".search-link").href = `https://openweathermap.org/weathermap?basemap=map&cities=false&layer=windspeed&lat=${lon}&lon=${lat}&zoom=5`
        
        fragment.appendChild(clonedTemplate)
        elSearchBox.appendChild(fragment)
        
    } catch (error) {
        console.log(error);
    }   
    
}

elForm.addEventListener("submit", function(evt){
    evt.preventDefault()
    let value = elInput.value.trim();
    localStorage.setItem("last", value)
    
    if (value != "") {
        searchRender(value);
        lastSearch.push(value)
        lastList.innerHTML = "";
        lastSearch.forEach(item => {
            const newLi = document.createElement("li");
            newLi.classList.add("fs-3", "fw-bold", "text-white", "cursor");
            newLi.textContent = item;
            lastList.appendChild(newLi)
            newLi.addEventListener("click", function(){
                let val = newLi.textContent;
                searchRender(val);
            })
        })
    }else{
        alert("please enter something")
    }
    elInput.value = "";
})

getWeather("Toshkent")
getWeather("New York")
getWeather("Paris")
getWeather("Moscow")
getWeather("Tokio")


