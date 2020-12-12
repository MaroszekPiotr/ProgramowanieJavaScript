class GetWeather {
    constructor(cityName, pageNode) {
        this.cityName;
        this.temp;
        this.humidity;
        this.pressure;
        this.pageNode = pageNode;
        GetWeather.GetData(cityName, pageNode);
    }
    static GetData(cityName, pageNode) {
        const apiKey = "50ee075346b7706594ebc360e52ac281";
        const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}`;
        const weather = fetch(apiURL)
            .then((respObject) => respObject.json())
            .then((weather) => weather.main)
            .then((name) => {
                this.cityName = cityName;
                this.temp = name.temp;
                this.humidity = name.humidity;
                this.pressure = name.pressure;
                GetWeather.DrawData(pageNode);
            })
            .catch((e) => {
                console.error('Catched exception: ', e);
            });

    }
    static DrawData(pageNode) {
        const allDataContainer = document.createElement('div');
        GetWeather.CreateElementAndAddItToNode(allDataContainer, this.cityName, 'miejscowosc');
        GetWeather.CreateElementAndAddItToNode(allDataContainer, this.temp, 'temperatura');
        GetWeather.CreateElementAndAddItToNode(allDataContainer, this.humidity, 'wilgotonosc');
        GetWeather.CreateElementAndAddItToNode(allDataContainer, this.pressure, 'cisnienie');
        allDataContainer.classList = 'cities';
        pageNode.appendChild(allDataContainer);
    }
    static CreateElementAndAddItToNode(nodeName, fieldName, fieldDescribe, unit = '') {
        const elementName = document.createElement('div');
        elementName.textContent = `${fieldDescribe}: ${fieldName} ${unit}`;
        elementName.classList = fieldDescribe;
        nodeName.appendChild(elementName);
    }
}
const container = document.querySelector('.container');
const example = new GetWeather('Cracow', container);