# nsmav-bot
  Created an Intelligent Facebook Messenger Tutor Bot using Microsoft Bot Framework and Node.js that allows users to access elementary and middle school level education in English as well as Hindi languages.

# Abstract
  India is infamously credited to having 37% of its adult population as being illiterate, making it the largest globally. Most of the younger generation cannot afford proper education. This is a very serious concern for a developing country as it hampers the future progress of the land. 

  With the advent of increased internet usage due to cheaper plans, we are developing a bot that’s going to act as a tutor of standard education for all age groups and is interactive with its student user and keeps him/her at par with the rest of the people. The bot will be built with the Microsoft Bot Framework using Node.js and will be integrated with the Facebook Messenger. It will be designed to communicate intelligently in English as well as Hindi languages trained using Recast.ai and Dialogflow so as to target the rural along with the urban population.

  An intelligent tutor agent should be able to use the appropriate Artificial Intelligence (AI) techniques to reach out to its students. Having a personalized experience with the student will help in supplementing the learning process. The design should not be complex so as to deter the student and to provide as much clarity as possible. Topics will be taught in a way that is easily understandable to the student. Resources will be provided cumulatively so that the student always has access to them. Quizzes and tests will be conducted to check the overall development of the student. With a boost in internet usage after the advent of cheaper data plans, it will take just a simple account, for one, to access the bot application.
  
![image](https://user-images.githubusercontent.com/55443909/95241986-37a3d880-082c-11eb-91ae-619300ba52cb.png)
  
# Keywords—Artificial intelligence, Bot, Natural Language Processing, Intelligent Tutoring Systems

# Scope of the Project
•	Through this bot we aim at giving students higher level education in an interactive and on a one-on-one experience level. One on one teaching comes with several benefits for a student. With the sheer volume of illiterate people in this country and many not being able to afford higher education, an artificially intelligent tutor could shape up to be a very effective means of teaching standard education to its students.
•	The communication of this bot is in dual languages [English and Hindi] so that students in regions not familiar with English can also benefit from this bot. This aspect will help in spreading the bot faster and will give the users to select among a language they are more comfortable with.
•	The bot which will teach subjects that qualify as the standard level of education in a global scenario and the evaluation of what the student has learnt and understood will be conducted through various tests and quizzes.
•	Students can ask doubts to the bot and get them cleared. Easier access to FAQs and extra resources in the website of the bot eases the path for the user. Textual and animated links will be provided to any queries asked by the user.

# Tools and Techniques
  We are using the Microsoft Bot Framework for bot development. There are multiple reasons for choosing this framework as it provides a suitable service wherein everything can easily be managed at one place without hindrances. The Bot Service provides an integrated environment which is clinically suitable for bot development. It is built such that the developer can build, test, manage and deploy bots, from one place itself. The SDKs provided by the Bot Builder are supported by both .NET and Node.js. A detailed documentation along with tutorials has been provided extensively on the website.

  The bot can be tested on the Microsoft Bot Framework Emulator provided by the service. Another reason why we chose this framework was that it can be connected to a number of channels like Facebook messenger, Telegram, Skype, Kik messenger etc.  This can help in enabling to reach out to a larger group of users in the country. Microsoft provides for the Azure Bot Service where the bot can be deployed after development. Various natural language processors are available which can can make a bot intelligent and produce human level interactions. LUIS, Dialog Flow, Recast.ai etc. are some of these intelligent services. All of these support multiple language conversations based on the intent-entity model. Dialog Flow does not support Hindi language hence we used it for the English conversations while Recast.ai for the Hindi conversations. The programming language with which we implemented the bot was Node.js.
  
# Use Case Diagram

![image](https://user-images.githubusercontent.com/55443909/95242120-5e620f00-082c-11eb-9930-bf20046ecc4c.png)
  
# Node.js development
  We first acquire the Bot Builder SDK which is used to seamlessly integrate the bot with the Microsoft Bot Framework with the registered bot's id and password. Secondly, we acquire the Restify web service framework which is used to build RESTful web services. Before deployment on Azure, we created a temporary local server listening to a certain port with the help of ngrok. The HTTPS endpoint provided by ngrok is configured into the bot framework. Now the bot is able to listen to messages sent by the user on the Facebook Messenger. 
 
![image](https://user-images.githubusercontent.com/55443909/95242186-75a0fc80-082c-11eb-8417-ea106e725cb2.png)
  
  Now, the main segment of coding our bot application begins. As the user chats through the Facebook messenger, the intelligent service matches the intent and ids are provided for each. Based on the intent ids, the bot begins its dialog process with the user. 

  There are Hero Card attachments arranged in a carousal for display of the various subjects and also for the distinct chapters within those particular subjects. The user is given prompts to choose the subject and the chapter within the selected subject which can be input through writing or clicking the required options. Upon selection, the tutor bot begins by showcasing the lesson plan and confirms with the user on continuing with teaching the chapter. The chapters will be taught in segments so as not to overwhelm the user. The bot will ask the user in intervals whether he/she is understanding what is being taught or not, and accordingly provides relevant resources that are cumulatively stored in our website.
  
![image](https://user-images.githubusercontent.com/55443909/95242306-9f5a2380-082c-11eb-80c9-8bcb6cfbebe8.png)
![image](https://user-images.githubusercontent.com/55443909/95242368-b4cf4d80-082c-11eb-8484-d6c683010619.png)
![image](https://user-images.githubusercontent.com/55443909/95242417-c3b60000-082c-11eb-8e10-46ac44efff59.png)

  The user may be able to leave the session in between either by inputting a specific trigger variable and the bot will end its session there. The user may also stop messaging for a while and continue from where he/she left from without going through the entire process again. After the teaching of the chapter has been completed, the user will be asked for asking any query related questions and upon clarification, a short quiz will be conducted to test the user. Scores are assigned to the user based on the answers they provide on the multiple choice questions of the quiz. Fig. 4a and Fig. 4b showcases the basic conversation flow of the bot in English as well as Hindi languages. Queries of the user are answered using the Google search scraper. The bot algorithm imports the google search scraper api from JP Richardson[9] and the search parameters have been set to a limit of one result and can be configured to the required language. Also, extra resources and frequently answered questions will be available on the website to provide the user with a single domain to look at various topics. Since internet access is very scarce in rural areas, pdfs and videos will be available for downloading for use in offline scenarios.
  
![image](https://user-images.githubusercontent.com/55443909/95242472-d7616680-082c-11eb-812b-8e74cad0fbd2.png)
![image](https://user-images.githubusercontent.com/55443909/95242496-e2b49200-082c-11eb-8d61-e09eccd86341.png)

# Conclusion

  The bot has been designed considering educational constraints that curb many children from getting the proper form of upbringing and knowledge that they should grow up with. It targets the rural as well as the urban population through the use of two languages that are most prominent in the country. The bot currently teaches at the base level of education incorporating few chapters in the four subjects. All the information is provided in a manner that is systematic and is paced at a level that will be comfortable for the user. Resources such as educational videos, relevant information and frequently asked questions will be available on the website that the user will be given access to. 
 
![image](https://user-images.githubusercontent.com/55443909/95242531-eea05400-082c-11eb-9365-c2efc62c5e31.png)

# Future work

•	Currently, Facebook Messenger does not allow formatting of the text that the bot sends to the user. Platform Design Kit will be applied to messenger to improve its features so as to enhance its interface. In future, the bot will be integrated with other channels for visual stimulus. 

•	Also, the tutor system will be better modified to raise the level of education that the bot provides. Training of the bot will be maintained continuously so that the bot has more human-like interactions with the user. Hindi language would be better developed over time using natural language processors like wit.ai.


