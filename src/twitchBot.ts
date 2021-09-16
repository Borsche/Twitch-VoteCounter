import tmi from 'tmi.js';
import Poll from './poll/poll';

const poll = Poll.getInstance();

// generate oauth here:
// https://twitchapps.com/tmi/
// To-Do: automated oauth generation
const opts = {
    identity: {
        username: "Darthnv4deBot",
        password: "oauth:v0diiudmj105ete2vjixzgtsbhmlgf",
    },
    channels: [
      'darthnv4deher'
    ]
}

const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const message = msg.trim();

  // If the command is known, let's execute it
  if(poll.isActive()) {
    assignVote(message, context.username);
  }
}

function assignVote(message: string, username: string) {
  console.log("Assigning Message");
  poll.getOptions().forEach(option => {
    if(message.startsWith(option.value)){
      console.log("Message does inlcude: "+ option.value);
      poll.addVote({username: username, vote: option.value});
    }
  })
}

function containsOnly(msg: string, match: string) {
  for(let i = 0; i < msg.length; i++){
    msg[i] != match;
    return false;
  }
  return true
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  client.say("darthnv4deher", "Hello HeyGuys");
}