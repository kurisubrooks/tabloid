var icons = {
    "showers_rain": "🌧",
    "flurries": "🌨",
    "wintry_mix_rain_snow": "🌨",
    "snow_showers_snow": "🌨",
    "isolated_scattered_tstorms_day": "⛈",
    "isolated_scattered_tstorms_night": "⛈",
    "clear_day": "☀️",
    "clear_night": "🌙",
    "cloudy": "☁️",
    "haze_fog_dust_smoke": "🌫",
    "mostly_cloudy_day": "🌥",
    "mostly_cloudy_night": "🌥",
    "mostly_sunny": "🌤",
    "partly_sunny": "🌥",
    "partly_cloudy_day": "🌤️",
    "partly_cloudy_night": "🌤️",
    "unknown": "❔"
};

$(function () {
    var state = false;

    $("#search").on("submit", function(event) {
        event.preventDefault();
        window.location.href = "https://www.google.com.au/#q=" + $("#text").val().split(" ").join("+");
        return false;
    });

    $.getJSON("https://api.kurisubrooks.com/api/weather", function(data) {
        if (!data.ok) {
            $("#weather #details").text("Error");
            $("#weather #condition").text(data.error);
            $("#weather #hilo").text("Try again later");
            $("#weather #icon").attr("src", "./icons/weather/unknown.png");
            return false;
        }

        var icon = data.weather.image,
            temp = data.weather.temperature,
            city = data.location.city,
            condition = data.weather.condition,
            forecast = data.forecast[0];
        
        $("#weather #details").text(temp + "° in " + city);
        $("#weather #condition").text(condition);
        $("#weather #hilo").text("Hi: " + forecast.high + "° Lo: " + forecast.low + "°");
        $("#weather #icon").attr("src", "./icons/weather/" + data.weather.icon + "_dark.png");

        return false;
    });

    $("#show").on("click", function(event) {
        state = !state;

        if (state) {
            console.log("open");
            $(".ghost").show();
            $(".links").addClass("open");
            $("#show img").attr("src", "./icons/up.svg");
        } else {
            console.log("close");
            $(".ghost").hide();
            $(".links").removeClass("open");
            $("#show img").attr("src", "./icons/down.svg");
        }
    });
});