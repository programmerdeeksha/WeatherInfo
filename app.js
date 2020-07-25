const express= require("express");
const https= require("https");
const app= express();
const bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){

  res.sendFile(__dirname+"/index.html");

  app.post("/",function(req,res){
   const query= req.body.Cityname;

const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=3bd7bc83763e250f467965969eccb620";

https.get(url,function(response){
  console.log(response.statusCode);
  response.on("data",function(data){
    const weatherData= JSON.parse(data);
    const temp= weatherData.main.temp;
    const descp=weatherData.weather[0].description;
    const icon= weatherData.weather[0].icon;
    const imageurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
    console.log(descp);
    res.write("<h1>The weather in "+query+" is "+temp+" kelvin</h1>");
    res.write("<p>The weather is "+descp+" </p>");
     res.write("<img src="+imageurl+">");
     res.send();

  });

});

});
});

app.listen(3000,function(){
  console.log("i am server");
});
