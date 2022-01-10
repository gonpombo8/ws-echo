import WebSocket, { Server } from 'ws';
const wss = new Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    const message = JSON.parse(data.toString())

    if (!message.key || !message.data || !message.timestamp) {
      return
    }

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    })
  })
})

wss.on('error', (error) => {
  console.log(error)
})


wss.once("listening", ()=>{
  console.log("Listening on port 8080")
})