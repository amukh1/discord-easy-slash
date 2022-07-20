const request = require('request');
let express = require('express');
let app = express();
let cors = require('cors');
const { InteractionResponseType, InteractionType, verifyKeyMiddleware } = require("discord-interactions");

app.use(cors());


let package = {

  // login: (p, t, a, g) => {
    
  // },

  PUBLIC_KEY: 'e',
  TOKEN: null,
  APP_ID: null,
  GUILD_ID: null,
  
    command: (name, type, description, options) => {
        let json_data = {
            "name": name,
            "type": type,
            "description": description,
            "options": options
            };
            
            let headers = {
                "Authorization": "Bot " + package.TOKEN,
                "Content-Type": "application/json"
            }
            let uuri
uuri = `https://discord.com/api/v10/applications/${package.APP_ID}/guilds/${package.GUILD_ID}/commands`;
        let option = {
            method: 'POST',
            url: uuri,
            headers: headers,
            // body: json_data,
            json: json_data
        }
// console.log(uuri)
        request(option, function (error, response, body) {
  console.log(name + "(Guild): " + 'errors:', error);
  // console.log('statusCode:', response && response.statusCode); 
  // console.log('body:', body); 
});
let optionz = {
  method: 'POST',
  url:`https://discord.com/api/v10/applications/${package.APP_ID}/commands`,
  headers: headers,
  // body: json_data,
  json: json_data
}
request(optionz, function (error, response, body) {
console.log(name + "(Global): " + 'errors:', error);
});

    },

    listen: (port) => {
        app.post('/event', verifyKeyMiddleware(package.PUBLIC_KEY), (req, res) => {

            const message = req.body
            // if (message.type === InteractionType.APPLICATION_COMMAND) {
            
            //     res.send({
            //         type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            //         data: {
            //           content: 'Hello world',
            //         },
            //       });
            
                // }
                if (message.type === InteractionType.APPLICATION_COMMAND) {
                    // res.send({
                    //   type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    //   data: {
                    //     content: 'Hello world',
                    //   },
                    // });
                  package.slash_event_handler(req.body.data.name, req.body, res, InteractionType)
                  // console.log(req.body)
                  }else {
                res.status(200).send({"type": 1})
            }
            
            });

      app.get('/', (req,res)=>{
        var host = server.address()
        res.send('Listening for commands on port ' + port + ' Using the /event endpoint!')
      })

       var server = app.listen(port, () => {
          var host = server.address()
            console.log('Listening for commands on ' + port + ' using the /event endpoint!');
            console.warn('Remember, discord cannot make requests to localhost!')
        });
    },

    reply: function(res, msg, embed){
        res.send({
               type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
               data: {
                 content: msg,
                   embeds: embed
               },
             });
     },

    slash_event_handler: function(command, message, res, type){
        return null;
    },

    on: function(event, callback){
        if(event == 'slash-event'){
          package.slash_event_handler = callback;
        }
    }
     

    
}

module.exports = package;

     // res.send({
     //      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
     //      data: {
     //        content: 'Hello world 2',
     //      },
     //    });