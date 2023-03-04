const express = require('express')
const app = express()
const port = 7000
const jsChessEngine = require('js-chess-engine')
const { move, status, moves, aiMove } = jsChessEngine  

//engine.postMessage("uci");

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.get('/', (request, response) => {
  response.send("Hello");
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

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
