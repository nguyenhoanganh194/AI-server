const express = require('express')
const app = express()
const port = 7000
const jsChessEngine = require('js-chess-engine')
const { move, status, moves, aiMove } = jsChessEngine  
const axios = require('axios')
const LoadServerURL = "http://127.0.0.1:8001/";

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (request, response) => {
  response.send("AI server");
});



app.post('/', (request, response) => {
  try{
    var nextMove = aiMove(request.body.fen);
    console.log(nextMove);
    var stringMove = Object.keys(nextMove)[0] + "-" + nextMove[Object.keys(nextMove)[0]];
    response.send(stringMove);
  }
  catch{
    response.send("Fail");
  }
});
app.post("/status",(request, response) => {
  response.send("Oke");
});


app.post('/possibleMove', (request, response) => {
  try{
    var nextMove = moves(request.body.fen);
    response.send(JSON.stringify(nextMove));
  }
  catch{
    response.send("Fail");
  }
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
}

  console.log(`server is listening on ${port}`)
})

SendUpdateToLoadbalancer();

async function SendUpdateToLoadbalancer(){
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'valid_token',
    'Port': port
  };
  while(true){
    axios.post(LoadServerURL + 'aiserver', {
    }, { headers })
    .then((serverRespond) => {
    })
    .catch((error) => {
    });
    await new Promise(resolve => setTimeout(resolve, 10*1000));
  }
};