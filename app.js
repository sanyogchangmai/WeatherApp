const express = require("express");
const https = require("https");
const ejs = require("ejs");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");

app.use(express.static('public'));

app.get("/",function(req,res){
    res.render("index");
})

app.post("/",function(req,res){
    const query = req.body.cityName;

    const apiKey = "d174cf48cd904ad08005820e0aa3566d";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            const temp = weatherData.main.temp;
            const minTemp = weatherData.main.temp_min;
            const maxTemp = weatherData.main.temp_max;
            const description = weatherData.weather[0].description;
            const img = weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/" + img + "@2x.png";
            const humidity = weatherData.main.humidity;
            const pressure = weatherData.main.pressure;
            const visibility = weatherData.visibility;
            const wind = weatherData.wind.speed;

            const city = query.charAt(0).toUpperCase() + query.slice(1);
            const desc = description.charAt(0).toUpperCase() + description.slice(1);

            res.render("details",
            {
             cityname: city,
             temperature: temp,    
             mintemp: minTemp,
             maxtemp: maxTemp,
             description: desc,
             image : imgUrl,
             humidity: humidity,
             pressure: pressure,
             visibility: visibility,
             wind: wind
            });
        })
    });

})




app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running at port 3000");
})