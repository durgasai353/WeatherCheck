function getCustomIcon(description) {
    const desc = description.toLowerCase();
    if (desc.includes("rain")) return "icons/rainy.svg";
    if (desc.includes("drizzle")) return "icons/drizzle.svg";
    if (desc.includes("snow")) return "icons/snowy.svg";
    if (desc.includes("thunder")) return "icons/thunder.svg";
    if (desc.includes("mist") || desc.includes("fog")) return "icons/mist.svg";
    if (desc.includes("clear")) return "icons/clear-sky.svg";
    if (desc.includes("cloud")) return "icons/cloudy.svg";
    return "icons/default.svg";
}

document.getElementById('weather-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const city = document.getElementById('city').value.trim();
    const apiKey = "a1289e52e8f78a47abb3a378e1f40e7f"; 

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        const weatherMain = data.weather[0].main;
        const description = data.weather[0].description;
        const icon = getCustomIcon(description); // use description instead of weatherMain


        document.getElementById("weather-result").innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="${icon}" alt="${weatherMain}" width="100">
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Condition:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity} %</p>
            <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
        `;
    } catch (err) {
        document.getElementById("weather-result").innerHTML = `<p style="color: red;">Error: ${err.message}</p>`;
    }
});
