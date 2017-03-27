var name = "kurisu";

function firstCap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function loop() {
    var hour = moment().format("H");
    $("#clock #time").text(moment().format("h:mm A"));
    $("#clock #date").text(moment().format("dddd, Do MMMM YYYY"));
    $("#name").text(firstCap(name));

    if (hour >= 18 && hour <= 23) {
        $("#daygreet").text("Good Evening");
    } else if (hour >= 0 && hour <= 9) {
        $("#daygreet").text("Good Morning");
    } else if (hour >= 10 && hour <= 14) {
        $("#daygreet").text("Good Day");
    } else if (hour >= 15 && hour <= 17) {
        $("#daygreet").text("Good Afternoon");
    } else {
        $("#daygreet").text("Hello");
    }

    console.log(hour);
}

$(function () {
    $("#search").on("submit", function(event) {
        event.preventDefault();
        window.location.href = "https://www.google.com.au/#q=" + $("#text").val().split(" ").join("+");
        return false;
    });

    loop();

    setInterval(function() {
        loop();
    }, 1000);

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
        $(".toggle").toggleClass("active");
        $(".container").toggleClass("blurred");
        $(".overlay").toggleClass("open");
    });
});