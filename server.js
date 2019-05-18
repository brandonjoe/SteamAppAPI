const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var request = require("request");

app.use(cors());

app.get("/:id/", (req, res) => {
  let url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=29EF7EEC8C71AF5CE31F515CFFCC2956&steamid=${
    req.params.id
  }&format=json`;
  let gamepool = []
  request.get(url, function(error, steamreq, steamres) {
    data = JSON.parse(steamres);
    data = data.response.games;
    data.forEach(game => {
        if(game.playtime_forever < 1){
            gamepool.push(game.appid);
        }
        
    })
    console.log(gamepool)
    res.setHeader("Content-Type", "application/json");
    res.send(steamres);
  });
});

app.use("/", express.static("public"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));