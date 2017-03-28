var state = false;
var name = "kurisu";

var quotes = [
    "You can't win if you don't participate",
    "Try something today that you didn't do yesterday.",
    "Remember to drink enough water today!",
    "Let's make today a good day!",
    "Let's do our best today!"
]

function firstCap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function toggleBookmarks() {
    state = !state;
    $("body").toggleClass("focused");
    $(".toggle").toggleClass("active");
    $(".overlay").toggleClass("open");
}

function loop() {
    var hour = moment().format("H");
    $("#clock #time").text(moment().format("h:mm A"));
    $("#clock #date").text(moment().format("dddd, Do MMMM YYYY"));

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
    loop();

    $("#name").text(firstCap(name));
    $("#quote").text(randomItem(quotes));

    setInterval(function() {
        loop();
    }, 1000);

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
        $("#weather #icon").attr("src", "./icons/weather/" + data.weather.icon + "_light.png");

        return false;
    });

    $("#show").on("click", function(event) {
        toggleBookmarks();
    });

    $(".overlay").on("click", function(event) {
        toggleBookmarks();
    });

    $(document).on("keyup", function(event) {
        if (event.keyCode === 27 || event.keyCode === 192) toggleBookmarks();
    });
});