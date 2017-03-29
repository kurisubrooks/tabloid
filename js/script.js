var state = false;

function firstCap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function setBookmarks() {
    for (let item of bookmarks) {
        $("#bookmarks").append("<li><a href=\"" + item.hyperlink + "\"><img src=\"" + item.icon + "\"><span>" + item.title + "</span></a></li>")
    };
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

function loop() {
    var hour = moment().format("H");
    $("#clock #time").text(moment().format("h:mm A"));
    $("#clock #date").text(moment().format("dddd, Do MMMM YYYY"));

    if (hour >= 18 && hour <= 23) {
        $("#daygreet").text(dayTimes.evening);
    } else if (hour >= 0 && hour <= 9) {
        $("#daygreet").text(dayTimes.morning);
    } else if (hour >= 10 && hour <= 14) {
        $("#daygreet").text(dayTimes.day);
    } else if (hour >= 15 && hour <= 17) {
        $("#daygreet").text(dayTimes.afternoon);
    } else {
        $("#daygreet").text(dayTimes.generic);
    }
}

function handleRequest(input) {
    let found = false;

    // figure out intent
    const patterns = {
        convert: /((?:\+|-)?\d*\.?\d+)\s?(.+) (?:to|as|in) (.+)/,
        money: /null/,
        url: /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
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
        // + encodeURIComponent($("#text").val()).replace(/%20/g, "+");
}

$(function() {
    loop();
    setBookmarks();
    getWeather();

    $("#name").text(firstCap(name));
    $("#quote").text(randomItem(quotes));
    $("#search input").attr("placeholder", placeholder);

    if (theme === "dark" || theme === "light") {
        $("body").addClass(theme);
    }

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
        $(".search input").attr("placeholder", placeholder);
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
