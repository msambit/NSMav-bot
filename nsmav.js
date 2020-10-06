// nsmav.js:

// Acquiring Configurations File

const config = require('./config.js')
// Requiring Restify API for the bot
const restify = require('restify')
// Requiring Bot Builder for the bot
const builder = require('botbuilder')
// Acquiring apiai recognizer 
var apiaiRecognizer = require('./apiai_recognizers.js');
var scraper = require('google-search-scraper');

// Acquiring all bot based mateial
var subjects = require('./subjects');
var physics = require('./physics');
var biology = require('./biology');
var chemistry = require('./chemistry');
var agriculture = require('./agriculture');

//---------------------------------------------------------------------------
// savedAddress variable for proactive messaging
// var savedAddress;
var message;
var maxRetries;
var retryPrompt;

// Acquiring NLP module from RecastAI
// const recastai = require('recastai').default
// Configuring Clients from Recast
// const recastClient = new recastai(config.recast)

// Connection to Microsoft Bot Framework
//---------------------------------------------------------------------------

const connector = new builder.ChatConnector({
  appId: config.appId,
  appPassword: config.appPassword,
})

// Universal Bot connector variable
const bot = new builder.UniversalBot(connector, {
    persistConversationData: true
});

var intents = new builder.IntentDialog({
    recognizers: [
        apiaiRecognizer
    ],
    intentThreshold: 0.2,
    recognizeOrder: builder.RecognizeOrder.series
});

//---------------------------------------------------------------------------
/*
function startProactiveDialog(address) {
  bot.beginDialog(address, "*:/survey");  
}
*/
//---------------------------------------------------------------------------

// Providing ids to various matches of intents
intents.matches('subject.info', '/subject.info');
intents.matches('physics.info', '/physics.info')
intents.matches('physics1.info','/physics1.info')
intents.matches('biology.info', '/biology.info')
intents.matches('biology1.info', '/biology1.info')
intents.matches('chemistry.info', '/chemistry.info')
intents.matches('chemistry1.info','/chemistry1.info')
intents.matches('chemistry1.quiz','/chemistry1.quiz')
intents.matches('agriculture.info', '/agriculture.info')
intents.matches('agriculture1.info', '/agriculture1.info')
intents.matches('queries.info', '/queries.info')





bot.dialog('/', intents);

//---------------------------------------------------------------------------
/*
// Handle the proactive initiated dialog
bot.dialog('/survey', [
  function (session, args, next) {
    var prompt = ('Hello, I\'m the survey dialog. I\'m interrupting your conversation to ask you a question. Type "done" to resume');
    builder.Prompts.choice(session, prompt, "done");
  },
  function (session, results) {
    session.send("Great, back to the original conversation");
    session.endDialog();
  }
]);
*/
//---------------------------------------------------------------------------

// DIALOG : Subject.info
bot.dialog('/subject.info', [
    function(session, args, next) {
        var cards = [];

        subjects.forEach(function(menu) {
            var card = new builder.HeroCard(session)
                .title(menu.name)
                .subtitle(menu.subtitle)
                .text(menu.text)
                .images([
                    builder.CardImage.create(session, menu.image)
                ]);               

            cards.push(card);
        })

        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);

        //session.endDialog(reply);
        session.send(reply);
        builder.Prompts.choice(session, 'Which subject do you want to start with ',
         ['Physics', 'Chemistry', 'Biology','Agriculture'],{ listStyle: 3},
         {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
        session.endDialog();
    }   

]);

//----------------------------------------------PHYSICS--------------------------------------------------
// DIALOG : Physics.info
bot.dialog('/physics.info', [
    function(session, args, next) {
        var cards = [];

        physics.forEach(function(menu) {
            var card = new builder.HeroCard(session)
                .title(menu.name)
                .subtitle(menu.subtitle)
                .text('menu.text')
                .images([
                    builder.CardImage.create(session, menu.image)
                ]);               

            cards.push(card);
        })

        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);

        //session.endDialog(reply);
        session.send(reply);
        builder.Prompts.choice(session, 'Which subject do you want to start with ',
         ['Newton\'s Laws of Motion', 'PHYSICS2', 'PHYSICS3','PHYSICS4'],{ listStyle: 3},
         {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
        session.endDialog();
    }

]);
//----------------------------------------------PHYSICS1
// DIALOG :  Physics1.info [Newton's Laws of Motion]
bot.dialog('/physics1.info', [
  function(session) {
    session.send('Hello, you have chosen your preferred topic of study in physics to be Newton\'s Laws of Motion.');
    builder.Prompts.confirm(session, 'Shall i begin?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results,next) {
    if(!results.response)
      session.endDialog('Exiting');
    else {
      session.send('Very Well,Lets begin');
      next();
    }    
  },

  function(session) {
    message = 'This is the lesson plan:'
    session.send(message);
    session.sendTyping();
    message = '1.Precursor to the Laws of Motion\n\n\
2.First Law of Motion\n\n\
3.Second Law of Motion\n\n\
4.Third Law of Motion\n\n\
5.Real world applications of the Laws of Motion\n';
    session.send(message);
    session.sendTyping();
    message = '[Precursor to the Laws of Motion]';
    session.send(message);
    session.sendTyping();
    message = 'The motion of an aircraft through the air can be explained and described by physical principals \
discovered over 300 years ago by Sir Isaac Newton. Newton worked in many areas of mathematics and physics. \
He developed the theories of gravitation in 1666, when he was only 23 years old.';
    session.send(message); 
    session.sendTyping(); 
    message = 'Some twenty years later, in 1686, he presented his three laws of motion \
in the "Principia Mathematica Philosophiae Naturalis.';
    session.send(message);
    session.sendTyping();
    builder.Prompts.confirm(session, 'Understanding?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results,next) {
    if(!results.response) {
      session.send('Resources');
      next();
    }
    else {
      session.send('Very Good. Continuing');
      next();
    }    
  },

  function(session) {
    message = '[First Law of Motion]'
    session.send(message);
    session.sendTyping();
    message = 'What is Newton\'s First Law Of Motion?';
    session.send(message);
    session.sendTyping();
    message = 'Newton\'s first law states that every object will remain at rest or in \
uniform motion in a straight line unless compelled to change its state by the action \
of an external force. This is normally taken as the definition of inertia. The key point \
here is that if there is no net force acting on an object (if all the external forces cancel \
each other out) then the object will maintain a constant velocity. If that velocity is zero, then \
the object remains at rest. If an external force is applied, the velocity will change because of the force.';
    session.send(message);
    session.sendTyping();
    builder.Prompts.confirm(session, 'Understanding?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results,next) {
    if(!results.response) {
      session.send('Resources');
      next();
    }
    else {
      session.send('Very Good. Continuing');
      next();
    }    
  },

  function(session) {
    message = '[Second Law of Motion]'
    session.send(message);
    session.sendTyping();
    message = 'What is Newton\'s Second Law Of Motion?';
    session.send(message);
    session.sendTyping();
    message = 'The second law explains how the velocity of an object changes when it is \
subjected to an external force. The law defines a force to be equal to change in momentum \
(mass times velocity) per change in time. Newton also developed the calculus of mathematics, \
and the "changes" expressed in the second law are most accurately defined in differential forms. \
(Calculus can also be used to determine the velocity and location variations experienced by an object \
subjected to an external force.) For an object with a constant mass m, the second law states that the force \
F is the product of an object\'s mass and its acceleration a:';
    session.send(message);
    session.sendTyping();
    message = 'F = m * a'
    session.send(message);
    session.sendTyping();
    message = 'For an external applied force, the change in velocity depends on the mass of \
the object. A force will cause a change in velocity; and likewise, a change in velocity will \
generate a force. The equation works both ways.'
    session.send(message);
    session.sendTyping();
    builder.Prompts.confirm(session, 'Understanding?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results,next) {
    if(!results.response) {
      session.send('Resources');
      next();
    }
    else {
      session.send('Very Good. Continuing');
      next();
    }    
  },

  function(session) {
    message = '[Third Law of Motion]'
    session.send(message);
    session.sendTyping();
    message = 'What is Newton\'s Third Law Of Motion?';
    session.send(message);
    session.sendTyping();
    message = 'The third law states that for every action (force) in nature there is an equal \
and opposite reaction. In other words, if object A exerts a force on object B, then object B \
also exerts an equal force on object A. Notice that the forces are exerted on different objects. \
The third law can be used to explain the generation of lift by a wing and the production of thrust by a jet engine.';
    session.send(message);
    session.sendTyping();
    builder.Prompts.confirm(session, 'Understanding?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results,next) {
    if(!results.response) {
      session.send('Resources');
      next();
    }
    else {
      session.send('Very Good. Continuing');
      next();
    }    
  },

  function(session) {
    message = '[Real world applications of the Laws of Motion]'
    session.send(message);
    session.sendTyping();
    message = 'Every little thing happening in this earth is governed by Newton\'s \
law. For example, let\'s assume that we need to move a rock from a point to another point. \
We need to apply some force. And if we need to move a car or any object, it requires some external push or \
pull to move. Newton\'s law gives us the force which is actually required to move the objects.';
    session.send(message);
    session.sendTyping();
    message = 'Let me give you another example, if you want to launch a rocket to Mars, \
you should be knowing the power required to launch it against the gravitational force. \
His second law answers our question. ';
    session.send(message);
    session.sendTyping();
    message = 'Every little thing happening in this earth is governed by Newton\'s \
law. For example, let\'s assume that we need to move a rock from a point to another point. \
We need to apply some force. And if we need to move a car or any object, it requires some external push or \
pull to move. Newton\'s law gives us the force which is actually required to move the objects.';
    session.send(message);
    session.sendTyping();
    builder.Prompts.confirm(session, 'Understanding?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results,next) {
    if(!results.response) {
      session.send('Resources');
      next();
    }
    else {
      session.send('Very Good. Continuing');
      next();
    }    
  }

  ])
  .reloadAction('startOver', 'Ok, starting over.', {
      matches : /^start over$/i,
      confirmPrompt : "Are you sure?"
  })
  .endConversationAction('endConversationAction', 'Ok, goodbye!', {
      matches: /^goodbye$/i,
      confirmPrompt: "Are you sure?"
  })
  .cancelAction('cancelAction', 'Ok, cancel order.', {
      matches: /^nevermind$|^cancel$|^cancel.*order/i,
      onSelectAction: (session, args) => {
        session.endConversation(`Operation cancelled.`);
      },
      confirmPrompt: "Are you sure?"
});

//----------------------------------------------CHEMISTRY--------------------------------------------------
// DIALOG :  Chemistry.info
bot.dialog('/chemistry.info', [
    function(session, args, next) {
        var cards = [];

        chemistry.forEach(function(menu) {
            var card = new builder.HeroCard(session)
                .title(menu.name)
                .subtitle(menu.subtitle)
                .text('menu.text')
                .images([
                    builder.CardImage.create(session, menu.image)
                ]);               

            cards.push(card);
        })

        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);

        //session.endDialog(reply);
        session.send(reply);
        builder.Prompts.choice(session, 'Which chemistry subject do you want to start with ',
         ['Metals and Non-metals', 'Pollution','CHEMISTRY3','CHEMISTRY4'],{ listStyle: 3},
         {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
        session.endDialog();
    }   

]);

//----------------------------------------------CHEMISTRY1
// DIALOG :  Chemistry1.info [Metals and Non-metals]
bot.dialog('/chemistry1.info', [
  function(session) {
    session.send('Hello, you have chosen your preferred topic of study in chemistry to be Metals and Non-metals.');
    builder.Prompts.confirm(session, 'Shall i begin?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results,next) {
    if(!results.response)
      session.endDialog('Exiting');
    else {
      session.send('Very Well,Lets begin');
      next();
    }    
  },

  function(session) {
    message = 'This is the lesson plan:'
    session.send(message);
    session.sendTyping();
    message = '1.Introduction to Metals and nonmetals\n\n\
2.Metals and their properties\n\n\
3.Non-metals and their properties\n\n\
4.Metallurgy and its terms and processes\n\n\
5.Uses of Metals\n\n\
6.Uses of Non-metals\n';
    session.send(message);
    session.sendTyping();
    message = '[Introduction to Metals and nonmetals]';
    session.send(message);
    session.sendTyping();
    message = 'An element is the simplest form of matter \
that cannot be split into simpler substances or built \
from simpler substances by any ordinary chemical or \
physical method. There are 110 elements known to us, \
out of which 92 are naturally occurring, while the \
rest have been prepared artificially. Elements are \
further classified into metals, non-metals, and metalloids.';
    session.send(message); 
    session.sendTyping(); 
    message = 'Out of the 92 naturally occurring elements, 70 are metals and about 22 are nonmetals.';
    session.send(message);
    session.sendTyping();
    builder.Prompts.confirm(session, 'Understanding?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results,next) {
    if(!results.response) {
      session.send('Resources');
      next();
    }
    else {
      session.send('Very Good. Continuing');
      next();
    }    
  },

  function(session) {
    message = '[Metals and their properties]';
    session.send(message);
    session.sendTyping();
    message = 'What are Metals?';
    session.send(message);
    session.sendTyping();
    message = 'All elements except hydrogen, which form positive \
ions by losing electrons during chemical reactions are called \
metals. Thus metals are electropositive elements. They are \
characterized by bright luster, hardness, ability to resonate \
sound and are excellent conductors of heat and electricity. \
Metals are solids under normal conditions except for Mercury. \
Most metals are malleable and ductile and are, in general, \
denser than the other elemental substances.';
    session.send(message);
    session.sendTyping();
    message = 'What are the properties of Metals?';
    session.send(message);
    session.sendTyping();
    message = 'State: Metals are solids at room temperature with the exception of mercury, \
which is liquid at room temperature (Gallium is liquid on hot days).\n\n\
Luster: Metals have the quality of reflecting light from its surface and can be polished e.g., gold, silver and copper.\n\n\
Malleability: Metals have the ability to withstand hammering and \
can be made into thin sheets known as foils \
(a sugar cube chunk of gold can be pounded into a thin sheet which will cover a football field).\n\n\
Ductility: Metals can be drawn into wires. 100 gm of silver can be drawn into a thin wire about 200 meters long.\n\n\
Hardness: All metals are hard except sodium and potassium, which are soft and can be cut with a knife.\n\n\
Valency: Metals have 1 to 3 electrons in the outermost shell of their atoms.\n\n\
Conduction: Metals are good conductors because they have free electrons. \
Silver and copper are the two best conductors of heat and electricity. \
Lead is the poorest conductor of heat. Bismuth, mercury and iron are also poor conductors.\n\n\
Density: Metals have high density and are very heavy. \
Iridium and osmium have the highest densities where as lithium has the lowest density.\n\n\
Melting and Boiling Points: Metals have high melting and boiling point. \
Tungsten has the highest melting point where as silver has low boiling point. \
Sodium and potassium have low melting points.';
    session.send(message);
    session.sendTyping();
    builder.Prompts.confirm(session, 'Understanding?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results,next) {
    if(!results.response) {
      session.send('Resources');
      next();
    }
    else {
      session.send('Very Good. Continuing');
      next();
    }    
  }, 

  function(session) {
    message = '[Non-metals and their properties]';
    session.send(message);
    session.sendTyping();
    message = 'What are Non-metals?';
    session.send(message);
    session.sendTyping();
    message = 'Elements that tend to gain electrons to form anions \
during chemical reactions are called non-metals. \
These are electronegative elements. They are non-lustrous, \
brittle and poor conductors of heat and electricity (except graphite). \
    Non-metals can be gaseous, liquids or solids.';
    session.send(message);
    session.sendTyping();
    message = 'What are the properties of Non-metals?';
    session.send(message);
    session.sendTyping();
    message = 'Physical State: Most of the non-metals exist in two of \
the three states of matter at room temperature: gases (oxygen) and solids (carbon).\n\
Non-Malleable and Ductile: Non-metals are very brittle, and cannot be rolled into wires or pounded into sheets.\n\
Conduction: They are poor conductors of heat and electricity.\n\
Luster: These have no metallic luster and do not reflect light\n\
Conductivity: Poor conductors of heat and electricity\n\
Melting and Boiling Points: The melting points of non-metals are generally lower than metals\n\
Seven non-metals exist under standard conditions as diatomic molecules:\n\n\
H2(g)\n\n\
N2(g)\n\n\
O2(g)\n\n\
F2(g)\n\n\
Cl2(g)\n\n\
Br2(l)\n\n\
I2(l) (volatile liquid - evaporates readily)\n';
    session.send(message);
    session.sendTyping();
    builder.Prompts.confirm(session, 'Understanding?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results,next) {
    if(!results.response) {
      session.send('Resources');
      next();
    }
    else {
      session.send('Very Good. Continuing');
      next();
    }    
  }, 

  function(session) {
    message = '[Metallurgy and its terms and processes]';
    session.send(message);
    session.sendTyping();
    message = 'What is Metallurgy?';
    session.send(message);
    session.sendTyping();
    message = 'Metallurgy is defined as a process that is used for the extraction of metals in their pure form. \
The compounds of metals mixed with soil, limestone, sand, and rocks are known as minerals. Metals are \
commercially extracted from minerals at low cost and minimum effort. These minerals are known as ores. \
A substance which is added to the charge in the furnace to remove the gangue (impurities) is known as \
flux. Metallurgy deals with the process of purification of metals and the formation of alloys.';
    session.send(message);
    session.sendTyping();
    message = 'What are the terms associated with Metallurgy?';
    session.send(message);
    session.sendTyping();
    message = 'Minerals : are naturally occurring substances containing one or more elements or their compounds.';
    session.send(message);
    session.sendTyping();
    message = 'Ore : is a mineral from which one or more metals can be extracted profitably.';
    session.send(message);
    session.sendTyping();
    message = 'What are the processes associated with Metallurgy?';
    session.send(message);
    session.sendTyping();
    message = 'The metallurgical process can be classified as the following: \n\n\
Crushing and grinding:\n\n\
The first process in metallurgy is crushing of ores into a fine powder in a crusher or ball mill. \
This process is known as pulverization. \n\n\
\n\n\
The concentration of ores: \n\n\
The process of removing impurities from ore is known as a concentration of minerals or ore dressing. \
In metallurgy, we concentrate the ores mainly by the following methods. \n\n\
\n\n\
Hydrolytic method: \n\n\
In this method, we pour the ore over a sloping, vibrating corrugated table with grooves. \
A jet of water is allowed to flow over the surface. The denser ore particles settle in the grooves, and \
the impurities are washed away by water. \n\n\
\n\n\
Magnetic separation: \n\n\
In this case, the crushed ore is placed on a conveyer belt. This belt rotates around two \
wheels in which one of the wheels is magnetic, and therefore the magnetic particles get attracted \
to the magnetic wheel and fall apart from the non-magnetic particles. \n\n\
\n\n\
Froth floatation: \n\n\
In this process, we take the crushed ore in a large tank which contains \
oil and water. A current of compressed air is passed through it. The ore gets wet by oil and \
is separated from the impurities in the form of froth. Ore is lighter, and so it comes on the surface \
and impurities are left behind. \n\n\
\n\n\
Roasting and calcination: \n\n\
In metallurgy, the process of heating a concentrated ore in the presence of oxygen \
is known as roasting. This process is applied in a case of sulfide ores. For ores \
containing carbonate or hydrated oxides, heating is done in the absence of air to melt \
the ores, and this process is known as calcination.';
    session.send(message);
    session.sendTyping();
    builder.Prompts.confirm(session, 'Understanding?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results,next) {
    if(!results.response) {
      session.send('Resources');
      next();
    }
    else {
      session.send('Very Good. Continuing');
      next();
    }    
  }, 

  function(session) {
    message = '[Uses of Metals]';
    session.send(message);
    session.sendTyping();
    message = 'Copper is used in making electrical wire cables, sockets, etc. because copper is good conductor of electricity. \n\n\
Iron is used to make iron nails, iron sheets, horseshoes etc. It is also used for making furnaces, grates, engine blocks etc. \n\n\
Zinc is used in making dry cells, galvanizing iron sheets to prevent rusting. \n\n\
German silver is used in making silver coins. \n\n\
Bronze is used in making gears, ships propellers, bearings etc. \n\n\
Brass is used in making gears, ship radders, bearings and statues. \n\n\
Aluminium is used in the manufacture of utensils which is corrosion resistant. \n\n\
It is also used in making aircraft parts because it is light.';
    session.send(message);
    session.sendTyping();
    builder.Prompts.confirm(session, 'Understanding?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results,next) {
    if(!results.response) {
      session.send('Resources');
      next();
    }
    else {
      session.send('Very Good. Continuing');
      next();
    }    
  },

  function(session) {
    message = '[Uses of Non-metals]';
    session.send(message);
    session.sendTyping();
    message = 'Oxygen is used in : \n\n\
>combustion \n\n\
>rockets as fuel \n\n\
>in fuel cells together with hydrogen for production of electricity \n\n\
>in respiration \n\n\
>in welding \n\n\
\n\n\
Carbon has various allotropes  like amorphous carbon, diamond and graphite just to mention a few. \n\n\
>Amorphous carbon is mainly use as a fuel e.g coal \n\n\
>Diamond is very hard but not the hardest substance( there is a Material Harder Than Diamond Created) \
is used in making drilling bits and jewelry. \n\n\
>Graphite is used in pencils and making electrodes because it is not very reactive and can conduct electricity. \n\n\
\n\n\
Nitrogen can be used as food preservative and in bulbs because of its inert nature. \n\n\
When in liquid form it can be used as a refrigerant and in opening safes. It is also used in making nitric acid. \n\n\
\n\n\
Sulfur is used in\n\n\
>making black gunpowder, matches, and fireworks; \n\n\
>vulcanization of rubber; as a fungicide, insecticide, and fumigant \n\n\
>manufacture of phosphate fertilizers; \n\n\
>in traditional skin treatment before the modern era of scientific medicine, elemental sulfur was used, mainly in creams, \
to alleviate conditions such as scabies, ringworm, psoriasis, eczema, and acne. \n\n\
>making of compounds e.g. sulfuric acid, sulfur (IV) oxide which both have many uses. \n\n\
\n\n\
Chlorine can be used \n\n\
>as a bleaching agent in the presence of moisture. \n\n\
>in treatment and softening of water \n\n\
>in manufacture of chlorine compounds and hydrochloric acid. \n\n\
\n\n\
Hydrogen is unique because it can behave both as a metal (loose electrons) and as a halogen (gain electron) \
to become stable. It can be used in the following ways: \n\n\
\
>The element is often used as fuel because of its high calorific value. Combustion generates plenty of energy.\n\n\
>As mentioned earlier hydrogen fuel cells generate electricity from oxygen and hydrogen. These electrochemical \
cells generate only water vapor so it is considered as environment friendly. \n\n\
>When in liquid form, it is used as rocket fuel. \n\n\
>Deuterium is heavy hydrogen. This isotope is used for nuclear fusion reaction in nuclear reactors. \n\n\
>It is the primary part of all acids but in ion form and also forms part of the hydroxyl ion found in bases.\n\n\
\n\n\
The nobal/inert gases are normally used in electric bulbs and tubes to produce different colors which can be used in advertisements.';
    session.send(message);
    session.sendTyping();
    builder.Prompts.confirm(session, 'Understanding?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results) {
    if(!results.response) {
      session.send('Resources');
      session.endDialog();
    }
    
      session.send('Very Good. ');
      builder.Prompts.confirm(session, 'Do you have any queries?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function (session, results) {
      if(!results.response) {
      session.send('Good, Lets conduct a short quiz on what we have studied so far');
      session.beginDialog('/chemistry1.quiz')
      
    }
    else {
      session.beginDialog('/queries.info');
    }    
  }
  ])
  .reloadAction('startOver', 'Ok, starting over.', {
      matches : /^start over$/i,
      confirmPrompt : "Are you sure?"
  })
  .endConversationAction('endConversationAction', 'Ok, goodbye!', {
      matches: /^goodbye$/i,
      confirmPrompt: "Are you sure?"
  })
  .cancelAction('cancelAction', 'Ok, cancel order.', {
      matches: /^nevermind$|^cancel$|^cancel.*order/i,
      onSelectAction: (session, args) => {
        session.endConversation(`Operation cancelled.`);
      },
      confirmPrompt: "Are you sure?"
});    


bot.dialog('/chemistry1.quiz', [
  function(session,args,next) {
    message = 'Let\'s begin the quiz';
    session.send(message);
    message = 'Of these, the most ductile metal is ___________. \n\n\
1. Al \n\n\
2. Au \n\n\
3. Cu \n\n\
4. Ag';
    session.send(message);
    builder.Prompts.number(session, "Please write the correct number of the answer.",
         {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,result,next) {
    if(result.response != 2)
      session.send('Wrong Answer, The correct answer is Au(2). Next Question.');
    else
      session.send('Right Answer!! Next Question.');

    message = 'Which oxide of a metal gets reduced only by coke and not by H2 gas or CO gas? \n\n\
1. Fe2O3 \n\n\
2. PbO \n\n\
3. ZnO \n\n\
4. CuO ';
    session.send(message);
    builder.Prompts.number(session, "Please write the correct number of the answer.",
         {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,result) {
    if(result.response != 3)
      session.send('Wrong Answer, The correct answer is ZnO(3).');
    else
      session.send('Right Answer!!');
    
    session.endDialog();
  }
  ]);
//----------------------------------------------BIOLOGY-------------------------------------------------
// DIALOG : Biology.info
bot.dialog('/biology.info', [
    function(session, args, next) {
        var cards = [];

        biology.forEach(function(menu) {
            var card = new builder.HeroCard(session)
                .title(menu.name)
                .subtitle(menu.subtitle)
                .text('menu.text')
                .images([
                    builder.CardImage.create(session, menu.image)
                ]);               

            cards.push(card);
        })

        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);

        //session.endDialog(reply);
        session.send(reply);
        builder.Prompts.choice(session, 'Which subject do you want to start with ',
         ['Flora and Fauna', 'BIOLOGY2', 'BIOLOGY3','BIOLOGY4'],{ listStyle: 3},
         {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
        session.endDialog();
    } 
]);
 
//----------------------------------------------BIOLOGY1
// DIALOG :  Biology1.info [Flora and Fauna]
bot.dialog('/biology1.info', [
  function(session) {
    session.send('Hello, you have chosen your preferred topic of study in biology to be Flora and Fauna.');
    builder.Prompts.confirm(session, 'Shall i begin?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results,next) {
    if(!results.response)
      session.endDialog('Exiting');
    else {
      session.send('Very Well,Lets begin');
      next();
    }    
  },

  function(session) {
    message = 'This is the lesson plan:'
    session.send(message);
    session.sendTyping();
    message = '1.Brief Introduction to Flora and Fauna\n\n\
2.Flora\n\n\
3.Fauna\n\n\
4.Importance of Flora and Fauna\n\n\
5.Examples of Flora and Fauna\n';
    session.send(message);
    session.sendTyping();
    message = '[Brief Introduction to Flora and Fauna]';
    session.send(message);
    session.sendTyping();
    message = 'The planet Earth is a beautiful place to live in. Life has flourished on the planet, \
thanks to the bountiful sun and vast oceans of water. No matter where we go on the planet, \
there are stunning plants, flowers and animals that catch are attention. \
They are two very important aspects of any eco-system. ';
    session.send(message); 
    session.sendTyping(); 
    message = 'Of all the living organisms on the planet, the most commonly seen by us are the plant life \
and the animal life. Apart from these two, more forms of life abound in the earth, but are harder to \
see with the naked eye. This is why the flora and fauna i.e. plant and wildlife of the earth are \
fascinating to observe and study.';
    session.send(message);
    session.sendTyping();
    builder.Prompts.confirm(session, 'Understanding?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results,next) {
    if(!results.response) {
      session.send('Resources');
      next();
    }
    else {
      session.send('Very Good. Continuing');
      next();
    }    
  },

  function(session) {
    message = '[Flora]'
    session.send(message);
    session.sendTyping();
    message = 'What is Flora?';
    session.send(message);
    session.sendTyping();
    message = 'Flora is the name given to the collective plant life that grows or once grew \
in a certain area or during a given time period. It usually refers to the native plant life \
present but does include new species that have been introduced as well. The flora and fauna of \
the earth have names derived from Latin.';
    session.send(message);
    session.sendTyping();
    message = 'In the language, ‘Flora’ was a goddess of flowers and plants. In the Roman mythology, \
she was the goddess of fertility. And so, the plant kingdom came to be known as Flora. \
The study of the plant life around the world is very interesting since is makes different classifications of the flora.'
    session.send(message);
    session.sendTyping();
    builder.Prompts.confirm(session, 'Understanding?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results,next) {
    if(!results.response) {
      session.send('Resources');
      next();
    }
    else {
      session.send('Very Good. Continuing');
      next();
    }    
  },

  function(session) {
    message = '[Fauna]'
    session.send(message);
    session.sendTyping();
    message = 'What is Fauna?';
    session.send(message);
    session.sendTyping();
    message = 'Fauna on the other hand, is the  name given to collective animal life \
that lives or was once found in a certain area or time period. In Latin, \
Fauna is derived from three different sources. Fauna by itself was the name of a \
Roman goddess representing fertility and the earth and Faunus was another Roman god. \
And then there were Fauns, which were known to be forest spirits.';
    session.send(message);
    session.sendTyping();
    message = 'Both the flora and fauna of the earth have been given sub-divisions. \
Fauna is also distinguished in many different ways. However, these ways are much \
more complex than floral divisions because animal life has evolved into many different forms.'
    session.send(message);
    session.sendTyping();
    message = 'To begin with, the animal kingdom by itself is Fauna. However, within it we \
have the ‘Avifauna’ that refers to the birds and ‘Piscifauna’ referring to the fish. \
These are simpler classifications, since they do not cover small single celled organisms \
such as bacteria and virus. They also do not account for the microscopic organisms that abound \
in nature but cannot be seen by the human eye. Such animal life is known as ‘Microfauna’. Much of \
the flora and fauna of the earth can be seen, but there is a very large percentage that has yet to be named and even discovered.'
    session.send(message);
    session.sendTyping();
    builder.Prompts.confirm(session, 'Understanding?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results,next) {
    if(!results.response) {
      session.send('Resources');
      next();
    }
    else {
      session.send('Very Good. Continuing');
      next();
    }    
  },

  function(session) {
    message = '[Importance of FLora and Fauna]'
    session.send(message);
    session.sendTyping();
    message = 'Without flora and fauna, humans cannot exist. The flora generates and releases oxygen, \
which is needed by the fauna for respiratory purposes. In return, the fauna produces and releases \
carbon dioxide, which is needed by the flora for photosynthesis. It’s a symbiotic kind of relationship. \
In the same line, humans cannot get by without both flora and fauna. The oxygen that we breathe \
in comes from the flora, and the carbon dioxide we exhale is vital for the flora.';
    session.send(message);
    session.sendTyping();
    message = 'It’s a no-brainer that humans love and appreciate nature. Many like spending time \
in outdoor settings such as forests, natural areas, parks and other green spaces because of \
their aesthetic value. This aesthetic value is mainly contributed by spread of flora and fauna. \
Statistics tell the story, each year, up to half a billion people visit beautiful protected sceneries \
like national parks, recreation areas, indigenous forests, historic sites, wildlife refuges and wild \
and scenic rivers to experience the beauty of the landmarks. This further underlines the significance \
of flora and fauna to our day to day lives.';
    session.send(message);
    session.sendTyping();
    builder.Prompts.confirm(session, 'Understanding?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results,next) {
    if(!results.response) {
      session.send('Resources');
      next();
    }
    else {
      session.send('Very Good. Continuing');
      next();
    }    
  },

  function(session) {
    message = '[Examples of Flora and Fauna]'
    session.send(message);
    session.sendTyping();
    message = 'Manchineel tree::\
It’s a flora that falls under the species of flowering plants in the spurge family. It originates \
in northern South America and southern North America. It bears grapes that can result in rashes \
if you’re wet. It’s not advisable to shelter under it when it rains since it produces milk that \
causes burns and blisters. Also, desist from eating its fruits as they cause the same effects \
to your mouth and throat.';
    session.send(message);
    session.sendTyping();
    message = 'Giant redwood trees \
We are used to the typical trees growing in our city parks or neighborhoods. \
Some species of fauna exist that grow to astronomical heights. The Giant redwood tree is a \
classic example. This kind of tree is considered the largest and tallest on earth. In fact, one \
specimen registered well above 350 feet tall.';
    session.send(message);
    session.sendTyping();
    message = 'Nepenthes \
Giant redwood trees and Machineel tree are photosynthetic; which means they manufacture their own \
food from the sun rays. However, other kinds of flora take a lot more proactive approach to developing \
their own food. Nepenthe is a typical example. It’s classified under the family of pitcher plants and originates \
from the jungles of Borneo. These floras have adapted leaves, which form a huge pitcher structure. ';
    session.send(message);
    session.sendTyping();
    builder.Prompts.confirm(session, 'Understanding?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results,next) {
    if(!results.response) {
      session.send('Resources');
      next();
    }
    else {
      session.send('Very Good. Continuing');
      next();
    }    
  }

  ])
  .reloadAction('startOver', 'Ok, starting over.', {
      matches : /^start over$/i,
      confirmPrompt : "Are you sure?"
  })
  .endConversationAction('endConversationAction', 'Ok, goodbye!', {
      matches: /^goodbye$/i,
      confirmPrompt: "Are you sure?"
  })
  .cancelAction('cancelAction', 'Ok, cancel order.', {
      matches: /^nevermind$|^cancel$|^stop$|^cancel.*order/i,
      onSelectAction: (session, args) => {
        session.endConversation(`Operation cancelled.`);
      },
      confirmPrompt: "Are you sure?"
});


//----------------------------------------------AGRICULTURE-------------------------------------------------
// DIALOG : Agriculture.info
bot.dialog('/agriculture.info', [
    function(session, args, next) {
        var cards = [];

        agriculture.forEach(function(menu) {
            var card = new builder.HeroCard(session)
                .title(menu.name)
                .subtitle(menu.subtitle)
                .text('menu.text')
                .images([
                    builder.CardImage.create(session, menu.image)
                ]);               

            cards.push(card);
        })

        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);

        //session.endDialog(reply);
        session.send(reply);
        builder.Prompts.choice(session, 'Which subject do you want to start with ',
         ['AGRICULTURE1', 'AGRICULTURE2', 'AGRICULTURE3','AGRICULTURE4'],{ listStyle: 3},
         {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
        session.endDialog();
    }   

]);

// log any bot errors into the console
bot.on('error', function (e) {
    console.log('And error ocurred', e);
    
});

//---------------------------------------------------------------------------
bot.dialog('/queries.info', [
    function(session, args, next) {
        builder.Prompts.text(session, "What is your query?");        
  },

  function (session, results,next) {
        var text = results.response;
        var options = {
        query: text,
        limit: 1
        };
        var x=1;

        scraper.search(options, function(err, url) {
           // This is called for each result
           if(err) throw err;
           console.log(url)
           if(x==1)
            session.send(url);
           x=x+1; 
        }); 
        setTimeout(function(){ next(); }, 3000);
  },
  function(session,args,next){
    builder.Prompts.confirm(session, 'Do you have any other queries?',
        {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
  },

  function(session,results) {
    if(!results.response) {
      session.send('Alrighty  then');
      session.endDialog();
    }
    else {
      session.beginDialog('/queries.info');
    }    
  }

  ]);

/*
// root dialog
bot.dialog('/', function(session, args) {

  savedAddress = session.message.address;

  var message = 'Hey there, I\'m going to interrupt our conversation and start a survey in a few seconds.';
  session.send(message);
  
  
    startProactiveDialog(savedAddress);
  

  session.send('hey');
  session.endDialog();
});
*/
//---------------------------------------------------------------------------
/*// Event when Message received
bot.dialog('/', (session) => {
  let name = session.message.user.name
  let message = session.message.text
  session.send(name + " said "  + message)
  console.log(session.message.text)  
  })*/

/*
// Using dialog module to take in User's message
  bot.dialog('/', (session) => {
  recastai.request(session.message.text)
  .then(res => console.log(res))
  .catch(() => session.send('I need some sleep right now... Talk to me later!'))
}) */
//---------------------------------------------------------------------------

// Server Init
// Making the server listen to port number 3920 {Localhost may vary}
const server = restify.createServer()
// Displays on console on which server it is running; Currently Restify
server.listen(6342, function(){
  console.log('The server is running on ', server.name, server.url)
})
// Appending /api/messages to localhost url
server.post('/api/messages', connector.listen())

// Do GET this endpoint to start a dialog proactively
server.get('/api/CustomWebApi', (req, res, next) => {
    startProactiveDialog(savedAddress);
    res.send('triggered');
    next();
  }
);