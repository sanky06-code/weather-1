const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherbox = document.querySelector('.weather-box');
const weatherdetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityhide = document.querySelector('.city-hide');

search.addEventListener('click', () => {

    const APIKey = 'f7832fcc785d2e03f0caeb4c6ce2fe19';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                cityhide.textContent = city;
                container.style.height = '400px';
                weatherbox.classList.remove('active');
                weatherdetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityhide.textContent === city) {
                return;
            } else {
                cityhide.textContent = city;

                container.style.height = '555px';
                container.classList.add('active');
                weatherbox.classList.add('active');
                weatherdetails.classList.add('active');

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'img/clear.png';
                        break;

                    case 'Rain':
                        image.src = 'img/rain.png';
                        break;

                    case 'Snow':
                        image.src = 'img/snow.png';
                        break;

                    case 'Clouds':
                        image.src = 'img/cloud.png';
                        break;

                    case 'Mist':
                    case 'Haze':
                        image.src = 'img/mist.png';
                        break;

                    default:
                        image.src = 'img/cloud.png';
                }

                temperature.innerHTML = `${parseInt(json.main.temp)}<span>C°</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

                // Reactivate the animation for weather details
                setTimeout(() => {
                    container.classList.add('active');
                }, 2500);
            }
        });
});
