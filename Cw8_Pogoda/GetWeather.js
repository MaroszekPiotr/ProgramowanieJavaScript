class GetWeather {
    constructor(cityName, weatherApp) {
        this.cityId = weatherApp.lenght++;
        this.cityName;
        this.temp;
        this.humidity;
        this.pressure;
        this.image;
        this.pageNode = weatherApp.output;
        this.allDataContainer = document.createElement('div');
        this.GetData(cityName, weatherApp, 'firstTime');
        setInterval(() => {
            this.GetData(cityName);
        }, 120000);
    }
    GetData(cityName, weatherApp, drawData) {
        const apiKey = '50ee075346b7706594ebc360e52ac281';
        const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}&units=metric&lang=pl`;
        const weather = fetch(apiURL)
            .then((respObject) => respObject.json())
            .catch((e) => console.error('Catched exception: ', e));
        const weatherData = weather
            .then((weather) => weather.main)
            .then((weatherMain) => weatherMain)
            .catch((e) => console.error('Catched exception: ', e));
        const weatherIcon = weather
            .then((weather) => weather.weather[0].icon)
            .then((imageId) => `https://openweathermap.org/img/wn/${imageId}@2x.png`)
            .catch((e) => console.error('Catched exception: ', e));
        Promise.all([weather, weatherData, weatherIcon])
            .then((value) => {
                const image = new Image();
                image.src = value[2];
                this.cityName = value[0].name;
                this.temp = value[1].temp;
                this.humidity = value[1].humidity;
                this.pressure = value[1].pressure;
                this.image = image;
                if (drawData === 'firstTime') this.AddDataFields(weatherApp);
                this.RefreshData();
            })
            .catch((e) => console.error('Catched exception: ', e));
    }
    AddDataFields(weatherApp) {
        for (let i = 0; i < 4; i++) {
            const elementName = document.createElement('div');
            this.allDataContainer.appendChild(elementName);
        }
        this.allDataContainer.appendChild(this.image);
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'usuń';
        removeBtn.addEventListener('click', () => {
            weatherApp.RemoveCity(this.cityId);
            weatherApp.LoadFromStorage();
        });
        this.allDataContainer.appendChild(removeBtn);
        this.allDataContainer.classList = 'cities';
        weatherApp.cities.push(this);
        weatherApp.SaveToStorage();
        this.pageNode.appendChild(this.allDataContainer);
    }
    RefreshData() {
        const container = this.allDataContainer.querySelectorAll('div');
        const img = this.allDataContainer.querySelector('img');
        container[0].textContent = this.cityName;
        container[1].textContent = `temp:${this.temp}°C`;
        container[2].textContent = `wilgotność:${this.humidity}%`;
        container[3].textContent = `ciśnienie:${this.pressure}hPa`;
        img.src = this.image.src;
    }
}