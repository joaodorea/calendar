const API_KEY = '544139715b56435e4a8c64217afbcf2f'
const GEO_URL = (city) => `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
const WEATHER_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`

export const getCityWeatherInDate = async (city, date) => {
  if(!city || !date) return null

  const cityGeoResp = await fetch(GEO_URL(city)).then(r => r.json())
  if(!cityGeoResp.length) return null

  const {lat, lon} = cityGeoResp[0]
  const weatherResp = await fetch(WEATHER_URL(lat, lon)).then(r => r.json())

  return weatherResp.weather[0]
}
