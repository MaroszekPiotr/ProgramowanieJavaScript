// class GetWeather {
//     constructor(cityName, pageNode) {
//         this.cityName;
//         this.temp;
//         this.humidity;
//         this.pressure;
//         this.image;
//         this.pageNode = pageNode;
//         this.allDataContainer = document.createElement('div');
//         this.allDataContainer.classList = 'cities';
//         this.isPrinted = false;
//         this.isPrintedImage = false;
//         this.GetData(cityName, pageNode, this.allDataContainer);
//         setInterval(() => {
//             this.GetData(cityName, pageNode, this.allDataContainer);
//             console.log('ok');

//         }, 300000);
//     }
//     GetData(cityName, pageNode, allDataContainer) {
//         const apiKey = "50ee075346b7706594ebc360e52ac281";
//         const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}&units=metric&lang=pl`;
//         const weather = fetch(apiURL)
//             .then((respObject) => respObject.json())
//             .then((weather) => {
//                 const imageId = weather.weather[0].icon;
//                 getIco(imageId);
//                 return weather.main;
//             })
//             .then((name) => {
//                 this.cityName = cityName;
//                 this.temp = name.temp;
//                 this.humidity = name.humidity;
//                 this.pressure = name.pressure;
//                 if (!(this.isPrinted)) this.DrawData(pageNode, allDataContainer);
//             })
//             .catch((e) => {
//                 console.error('Catched exception: ', e);
//             });
//         const getIco = (imageId) => {
//             fetch(`https://openweathermap.org/img/wn/${imageId}@2x.png`)
//                 .then((respObject) => {
//                     const image = new Image();
//                     image.src = respObject.url;
//                     this.image = image;
//                     if (!(this.isPrintedImage)) {
//                         allDataContainer.appendChild(image);
//                         this.isPrintedImage = true;
//                     }
//                 })
//                 .catch((e) => {
//                     console.error('Catched exception: ', e);
//                 });
//         };
//     }
//     DrawData(pageNode, allDataContainer) {
//         GetWeather.CreateElementAndAddItToNode(allDataContainer, this.cityName);
//         GetWeather.CreateElementAndAddItToNode(allDataContainer, this.temp, 'temperatura');
//         GetWeather.CreateElementAndAddItToNode(allDataContainer, this.humidity, 'wilgotonosc');
//         GetWeather.CreateElementAndAddItToNode(allDataContainer, this.pressure, 'cisnienie');
//         // allDataContainer.classList = 'cities';
//         pageNode.appendChild(allDataContainer);
//         this.isPrinted = true;
//     }
//     static CreateElementAndAddItToNode(nodeName, fieldName, fieldDescribe = '', unit = '') {
//         const elementName = document.createElement('div');
//         elementName.textContent = `${fieldDescribe} ${fieldName} ${unit}`;
//         elementName.classList = fieldDescribe;
//         nodeName.appendChild(elementName);
//     }
// }
// const container = document.querySelector('.container');
// const example = new GetWeather('Kraków', container);