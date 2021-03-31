const express = require("express");
const https = require("https");
const ejs = require("ejs");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
// app.use(bodyParser.urlencoded({extended:true}));

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
            const feel = weatherData.main.feels_like;
            const description = weatherData.weather[0].description;
            const img = weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/" + img + "@2x.png";
            const humidity = weatherData.main.humidity;
            const pressure = weatherData.main.pressure;
            const visibility = weatherData.visibility;
            const wind = weatherData.wind.speed;

            res.write("<h1>The weather is currently" + description + "</h1>");      
            res.write("<h1>The temperature in "+ query+ " is " + temp + "&#8451</h1>");
            res.write("<h1> But it feels like "+ feel +"&#8451</h1>");
            res.write("<center><img src="+ imgUrl +"></center>");
            res.write("<h1> Humidity is "+ humidity +"</h1>");
            res.write("<h1> Air Pressure is "+ pressure +"</h1>");
            res.write("<h1> Visibility is "+ visibility +"</h1>");
            res.write("<h1> Wind speed is "+ wind +"</h1>");          
            res.send();
        })
    });

})




app.listen(3000,function(){
    console.log("Server is running at port 3000");
})