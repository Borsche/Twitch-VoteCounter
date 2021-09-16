import express from 'express';
import WebSocket from 'ws';
import path from 'path';

import Window from './app';
import Poll from './poll/poll';
import './twitchBot';

const app = express();
const port = 3000;

const window = Window.getInstance();
const poll = Poll.getInstance();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/savepoll', (req, res) => {
    res.send();
    
    poll.resetPoll();
    poll.setOptions(req.body.options);
    window.registerPollResetKey(req.body.hotkey);
    poll.setActive(true);
    
    console.log(req.body);
})

app.listen(port, err => {
    if(err){
        return console.error(err);
    }
    return console.log(`server ist listening on ${port}`);
})

const wss = new WebSocket.Server({
    port: 3001
});

const ws = new WebSocket('ws://localhost:3001');

wss.on('connection', (ws) => {
    ws.send(JSON.stringify(poll.getResult()));

    // register this ws for update function
    // needs to be reworked
    poll.onPollUpdate((result) => {
        console.log("Sending updated Result");
        ws.send(JSON.stringify(result));
    })
})

