class WeatherApp {
    constructor(inputBtn, inputField, output) {
        this.lenght = 0; //potrzebne do id identyfikacji konkretnych obiektów w celu usunięcia;
        this.cities = [];
        this.output = output;
        this.inputField = inputField;
        this.StartListen(inputBtn);
        this.LoadFromStorage();

    }
    StartListen(inputBtn) {
        inputBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.AddCityWeather(this.inputField.value, this.output);
            this.inputField.value = '';
        });
    }
    AddCityWeather(cityName) {
        const newCity = new GetWeather(`${cityName}`, this);
    }
    SaveToStorage() {
        localStorage.setItem('cities', JSON.stringify(this.cities));
    }
    LoadFromStorage() {
        if (JSON.parse(localStorage.getItem('cities')) == null) return;
        const cities = [...JSON.parse(localStorage.getItem('cities'))];
        this.output.textContent = '';
        this.cities.length = 0;
        cities.forEach((city) => {
            new GetWeather(`${city.cityName}`, this);
        });
    }
    RemoveCity(id) {
        let positionToRemove;
        for (let i = 0; i < this.cities.length; i++) {
            if (this.cities[i].cityId === id) {
                positionToRemove = i;
                break;
            }
        }
        this.cities.splice(positionToRemove, 1);
        this.SaveToStorage();
    }
}