class WeatherApp {
    constructor(inputBtn, inputField, output) {
        this.cities = [];
        this.output = output;
        this.inputField = inputField;
        this.startListen(inputBtn);
    }
    startListen(inputBtn) {
        inputBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.addCityWeather(this.inputField.value, this.output);
        });
    }
    addCityWeather(cityName) {
        const newCity = new GetWeather(`${cityName}`, this.output);
        this.cities.push(newCity);
    }
}

const formBtn = document.querySelector('.form>form>button');
const inputData = document.querySelector('input');
const containerAnchor = document.querySelector('.container');
const ex1 = new WeatherApp(formBtn, inputData, containerAnchor);