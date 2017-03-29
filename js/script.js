var state = false;
var name = "kurisu";

var bookmarks = [
    {
        title: "Messenger",
        icon: "messenger",
        hyperlink: "https://www.messenger.com/"
    },
    {
        title: "Twitter",
        icon: "twitter",
        hyperlink: "https://twitter.com/"
    },
    {
        title: "YouTube",
        icon: "youtube",
        hyperlink: "https://www.youtube.com/feed/subscriptions"
    },
    {
        title: "Tumblr",
        icon: "tumblr",
        hyperlink: "https://tumblr.com/dashboard"
    },
    {
        title: "GitHub",
        icon: "github",
        hyperlink: "https://github.com/"
    },
    {
        title: "Reddit",
        icon: "reddit",
        hyperlink: "https://reddit.com/"
    },
    {
        title: "Google Play Music",
        icon: "playmusic",
        hyperlink: "https://play.google.com/music/listen"
    },
    {
        title: "Sherlock",
        icon: "sherlock",
        hyperlink: "https://api.kurisubrooks.com/panel/"
    },
    {
        title: "Mana",
        icon: "mana",
        hyperlink: "http://mana.kurisubrooks.com/"
    },
    {
        title: "DigitalOcean",
        icon: "digitalocean",
        hyperlink: "https://cloud.digitalocean.com/droplets/"
    }
];

var quotes = [
    "You can't win if you don't participate",
    "Try something today that you didn't do yesterday.",
    "Let's make today a good day!",
    "Let's do our best today!",
    "Are you eating enough fiber?",
    "Remember to drink enough water today!",
    "Are you eating enough vegetables?"
]

function firstCap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function toggleBookmarks() {
    state = !state;

    if (!state) {
        $(".overlay").fadeOut(100);
        $(".container").fadeIn(100);
    }

    if (state) {
        $(".overlay").fadeIn(100);
        $(".container").fadeOut(100);
    }

    $(".toggle").toggleClass("active");
}

function setBookmarks() {
    for (let item of bookmarks) {
        $("#bookmarks").append("<li><a href=\"" + item.hyperlink + "\"><img src=\"./bookmarks/" + item.icon + ".png\"><span>" + item.title + "</span></a></li>")
    };
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
}

function handleRequest(input) {
    let found = false;

    // figure out intent
    const patterns = {
        convert: /((?:\+|-)?\d*\.?\d+)\s?(.+) (?:to|as|in) (.+)/,
        radar: /^radar$/,
        weather: /^weather$/
    }

    for (const pattern of Object.keys(patterns)) {
        const match = new RegExp(patterns[pattern], "g");
        const exec = match.exec(input);

        if (!exec) continue;
        found = exec;
        console.log(found);

        $(".omnibox .results").html("");
        $(".omnibox .results").hide();
    }

    if (!found) {
        $(".omnibox .results").show();
        return $(".omnibox .results").html("<span>No Matches Found, Search Google?</span>");
    }

    // return window.location.href = "https://www.google.com.au/#q="
        + encodeURIComponent($("#text").val()).replace(/%20/g, "+");
}

$(function () {
    loop();
    setBookmarks();

    $("#name").text(firstCap(name));
    $("#quote").text(randomItem(quotes));
    $("#search input").attr("placeholder", "How may I help?");

    setInterval(function() {
        loop();
    }, 1000);

    $("#search").on("submit", function(event) {
        event.preventDefault();
        handleRequest($("#text").val());
        return false;
    });

    $("#search").on("focusin", function(event) {
        $(".search").addClass("active");
        $(".search input").attr("placeholder", "");
    });

    $("#search").on("focusout", function(event) {
        $(".search").removeClass("active");
        $(".search input").attr("placeholder", "How may I help?");
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