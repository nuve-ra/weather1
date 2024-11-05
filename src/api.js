const apiKey = "KXBMNDKSSUK6DYX52YKPY87KV";

const getWeather = async (city) => {
    return await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`)
    .then((res) => res.json())
    .then((json) => {
        return json;
    })
}

export default getWeather;