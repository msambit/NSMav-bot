var builder = require('botbuilder');
var restify = require('restify');
const config = require('./config.js');
//const recast = require('recastai').default;
//const client = new recast(config.recast)
//var request = client.request

//const getGreetings = require('./intents/greetings.js')
//const getBye = require('./intents/bye.js')
//const getpositiveC = require('./intents/positive.js')
//const getChemistry= require('./intents/chemistry.js')

// Setup Restify Server
const server = restify.createServer();
server.listen(8080, function () {
    console.log('%s listening to %s', server.name, server.url);
});


// Create chat bot and listen for messages
const connector = new builder.ChatConnector({
    appId: config.appId,
    appPassword: config.appPassword,
});
server.post('/', connector.listen());

var userStore = [];
var n;
var bot = new builder.UniversalBot(connector, function (session) {
    // store user's address
    var address = session.message.address;
    userStore.push(address);
    n = address.user.name;
    console.log('Starting survey for address:', address);
    console.log(n);

    session.beginDialog('survey');

    
});
//const INTENTS = {
  //  greetings: getGreetings,
    //bye:getBye,
    //positive:getpositiveC,
    //chemistry:getChemistry
 // }

       
bot.dialog('survey', [
    function (session) 
    {
        session.send( 'नमस्ते '+ n +' आपका हमारे क्लास में स्वागत है|');
        session.sendTyping();
        session.send(' हम आपको भौतिक विज्ञान, रसायन विज्ञान, जीव विज्ञान और कृषि विज्ञान सिखायेंगे |');
        
        
        
        
     
        var cards = getCardsAttachments();
        // create reply with Carousel AttachmentLayout
        var reply = new builder.Message(session)
                 .attachmentLayout(builder.AttachmentLayout.carousel)
                 .attachments(cards);
         
        session.send(reply);
        session.sendTyping();
        builder.Prompts.choice(session, 'आप किस विषय से शुरू करना चाहते हैं? ', ['भौतिक विज्ञान', 'रसायन विज्ञान', 'जीव विज्ञान', 'कृषि विज्ञान']);
        
 },
function(session,results)
{
         session.userData.subject= results.response.entity;
         session.sendTyping();
         session.send('समझ गया... ' + n +
         '  आप '  + session.userData.subject +  ' सीखना चाहते हैं '+'.');
         session.send('इस  विषय में  निम्नलिखित अध्याय  हैं: '+'\n' );
         switch(session.userData.subject)
         {
             case 'भौतिक विज्ञान':
             session.beginDialog('Physics');
             break;

             case 'रसायन विज्ञान':
             session.beginDialog('Chemistry');
             break;

             case 'जीव विज्ञान':
             session.beginDialog('Biology');
             break;

             case 'कृषि विज्ञान':
             session.beginDialog('Agriculture');
             break;
        }
}
     

 
 ]);

 function getCardsAttachments(session) {
     return [
         new builder.HeroCard(session)
           .title(' भौतिक विज्ञान ')
           .subtitle('भौतिक विज्ञान अब फेसबुक पे !')
           .text('आप हमारे साथ भौतिक विज्ञान सीख सकते हैं')
          .images([
                builder.CardImage.create(session, 'https://i.ytimg.com/vi/ICV0HETkslI/maxresdefault.jpg')
            ])
             .buttons([
               builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/storage/', 'Learn More')
             ]),
 
 
         new builder.ThumbnailCard(session)
             .title('रसायन विज्ञान')
             .subtitle('रसायन विज्ञान अब फेसबुक पे !')
             .text('आप हमारे साथ रसायन विज्ञान सीख सकते हैं')
             .images([
                 builder.CardImage.create(session, 'https://d1tdgg3smcq7nz.cloudfront.net/2031_image_72.jpg')
             ])
             .buttons([
                 builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/documentdb/', 'Learn More')
             ]),
 
         new builder.HeroCard(session)
         .title('जीवविज्ञान')
         .subtitle('जीवविज्ञान अब फेसबुक पे !')
         .text('आप हमारे साथ जीवविज्ञान सीख सकते हैं')
             .images([
                 builder.CardImage.create(session, 'http://static.upscportal.com/images/books//NCERT-Hindi-Books-Class-11-Biology-jeev-vigyan.jpg')
             ])
             .buttons([
                 builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/functions/', 'Learn More')
             ]),
 
         new builder.ThumbnailCard(session)
         .title('कृषि विज्ञान')
         .subtitle('कृषि विज्ञान अब फेसबुक पे !')
         .text('आप हमारे साथ कृषि विज्ञान सीख सकते हैं')
             .images([
                 builder.CardImage.create(session, 'https://images-na.ssl-images-amazon.com/images/I/51gMLymnYiL._SX258_BO1,204,203,200_.jpg')
             ])
             .buttons([
                 builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/cognitive-services/', 'Learn More')
             ])
         ];
     }
     //dialogs
     bot.dialog('Physics', [
        function (session) {
            session.endDialog('दबाव समझना , कंडक्टर और इन्सुलेटर , उष्ण ऊर्जा');
        }
    ]);
     
    bot.dialog('Chemistry', [
        function (session) {
            session.sendTyping();
            session.send('धातु और अधातु , रसायन विज्ञान की भाषा , कार्बन यौगिकों की अद्भुत दुनिया');
            session.sendTyping();
            session.send('प्रत्येक अध्याय के पूरा होने के बाद अध्याय वार एक परीक्षण किया जाएगा');
            session.sendTyping();
            session.send('और पूरे पाठ्यक्रम के पूरा होने के बाद एक अंतिमपरीक्षा होगी');
            session.sendTyping();
            session.send('तो चलो धातु और अधातुओं के साथ शुरू करे!');
            session.sendTyping();
            session.send('अब धातु क्या है?');
            session.sendTyping();
            session.send('एक ठोस सामग्री जो कि अच्छी बिजली और तापीय चालकता , आम तौर पर कठिन, चमकदार, ट्यूबल, फाउज़ीबल और नमनीय है।');
            session.send('धातु के उदाहरण हैं सोना, चांदी, एल्यूमीनियम,तांबा, आदि');
            session.sendTyping();
            session.send('चलो धातु के कुछ भौतिक गुणों को समझते हैं');
            session.send('धातु (बुध को छोड़कर) ठोस हैं.');
            session.send('धातु कठोर (सोडियम, पोटेशियम आदि को छोड़कर) हैं');
            session.send('धातुओं मे चमक है.');
            session.sendTyping();
            session.send('धातुओं में उच्च पिघलने बिंदु और उच्च उबलते बिंदु हैं');
            session.send('धातु नमनीय  (पतली चादर जैसा  किया जा सकता है).');
            session.send('धातु तन्य हैं (पतले तारों में बनाया जा सकता है).');
            session.sendTyping();
            session.send('धातु गर्मी और बिजली के अच्छे कंडक्टर हैं.');
            session.endDialog('धातु मधुर ध्वनि का उत्पादक हैं.');
           // builder.Prompts.text(session,'क्या ऐसा कुछ है जो आपको समझ में नहीं आया, इसके बारे में मुझे बताएं');
            
            


           
        }
        /*function (session, results) {
            
            request.analyseText(results.response)
            .then(function(res){
                var intent = res.intent();
                if (intent.slug === 'chemistry' && intent.confidence > 0.7) {
                    session.send("i got the topic and i will explain in detail");
                    session.send('मुझे खुशी हुई');
                    
                  }
                  
                  
            })
            .catch(function(err) {
                session.send('I am Sleeping');
              })
              
              
            },
            function(session)
            {
                builder.Prompts.text(session, "क्या यह पाठ अब तक अच्छा लगा ?");

            },
            function(session,results)
            {
                request.analyseText(results.response).then(function(res)
                {
                    var intent= res.intent();
                    if(intent.slug=== 'chemistry'&& intent.confidence>0.7)
                    {
                        session.send("i got the topic and i will explain in detail");
                    }
                } )
            }*/
        
    ]);

    bot.dialog('Biology', [
        function (session) {
            session.endDialog('नियंत्रण और समन्वय , जीवन का चक्र , दिल का कार्य');
        }
    ]);
    bot.dialog('Agriculture', [
        function (session) {
            session.endDialog('वायु और जल प्रदूषण , खाद्य उत्पादन में प्रौद्योगिकी , कृषि में प्रगति');
        }
    ]);
    
    