const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var request = require("request");

app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "Andrei",
      email: "john@gmail.com",
      entries: 0,
      joined: new Date()
    }
  ],
  secrets: {
    users_id: "123",
    hash: "wghhh"
  }
};
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

var port = 4000;
var server = app.listen(port);
console.log("Listening on port " + port);
