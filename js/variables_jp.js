window.name = "クリス";
window.theme = "dark";
window.placeholder = "どんな御用でしょうか？";

window.dayTimes = {
    morning: "おはよう",
    day: "こんにちは",
    afternoon: "こんにちは",
    evening: "こんばんは",
    generic: "どうも"
};

window.quotes = [
    "今日は頑張りましょうね！"
];

window.bookmarks = [
    {
        title: "Messenger",
        icon: "./bookmarks/messenger.png",
        hyperlink: "https://www.messenger.com/"
    },
    {
        title: "Twitter",
        icon: "./bookmarks/twitter.png",
        hyperlink: "https://twitter.com/"
    },
    {
        title: "YouTube",
        icon: "./bookmarks/youtube.png",
        hyperlink: "https://www.youtube.com/feed/subscriptions"
    },
    {
        title: "Tumblr",
        icon: "./bookmarks/tumblr.png",
        hyperlink: "https://tumblr.com/dashboard"
    },
    {
        title: "GitHub",
        icon: "./bookmarks/github.png",
        hyperlink: "https://github.com/"
    },
    {
        title: "Reddit",
        icon: "./bookmarks/reddit.png",
        hyperlink: "https://reddit.com/"
    },
    {
        title: "Google Play Music",
        icon: "./bookmarks/playmusic.png",
        hyperlink: "https://play.google.com/music/listen"
    },
    {
        title: "Sherlock",
        icon: "./bookmarks/sherlock.png",
        hyperlink: "https://api.kurisubrooks.com/panel/"
    },
    {
        title: "Mana",
        icon: "./bookmarks/mana.png",
        hyperlink: "http://mana.kurisubrooks.com/"
    },
    {
        title: "DigitalOcean",
        icon: "./bookmarks/digitalocean.png",
        hyperlink: "https://cloud.digitalocean.com/droplets/"
    }
];

window.getWeather = function() {
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

        $("#weather #details").text("ペンリスでは " + temp + "℃");
        $("#weather #condition").text("ときどきくもり");
        $("#weather #icon").attr("src", "./icons/weather/" + data.weather.icon + "_light.png");

        return false;
    });
};