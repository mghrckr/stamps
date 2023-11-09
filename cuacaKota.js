require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.SECRET
const city = 'Jakarta';
const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=-6.2088&lon=106.8456&cnt=40&units=metric&appid=${apiKey}`;

async function fetchWeatherData() {
  try {
    const response = await axios.get(apiUrl);

    if (response.data.cod === '200') {
      const dailyForecasts = response.data.list;
      const dailyTemperatures = {};

      dailyForecasts.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toISOString().split('T')[0];

        if (!dailyTemperatures[day]) {
          dailyTemperatures[day] = [];
        }

        dailyTemperatures[day].push(forecast.main.temp);
      });

      const today = new Date();
      for (let i = 0; i < 5; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const day = date.toISOString().split('T')[0];
        const temperatures = dailyTemperatures[day];

        if (temperatures) {
          const averageTemperature = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;

          const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
          const dayOfMonth = date.getDate();
          const month = date.toLocaleDateString('en-US', { month: 'short' });
          const year = date.getFullYear();

          console.log(`${dayOfWeek}, ${dayOfMonth} ${month} ${year} : ${averageTemperature.toFixed(2)} °C`);
        }
      }
    } else {
      console.log('Gagal mengambil data cuaca.');
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
}

fetchWeatherData();
