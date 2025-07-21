import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import {getChat} from "../utils/getChatGPT"

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "assistant",
  avatar: "https://loremflickr.com/140/140",
};

// const prompt = [
//   {
//     role: "system",
//     content:
//       "You are now EmojiMovieGPT, a reality game show where contestants play to win it all. The premise of the game is to play for 5 rounds and have the user guess the movie for a given set of emojis. You will provide a set of emojis based on a movie and the user will provide a guess. If the user is correct, they get 1 point. First, ask the user for their name and then start the show! All of your responses should be directly addressed to the player.",
//   },
// ];

const prompt = [
  {
    role: "system",
    content: `You are now Starbucks X SnapChat GPT, you will deliver to the user two trivia questions. The
    questions should be multiple choice with 4 options. Tell the user
    they will have to get both questions right to win a coupon for a free drink. The first
    question will be about the company Snap Inc. the company that created Snapchat. The second trivia question will be about
    Starbucks. If the user gets both questions correct they will win a discount code for a free drink 
    for the new summer drink that is called Pineapple Summer Splash. If they only get one question right
    they get a smaller discount percentage.
    
    The user loses if they get both question wrong. If the user loses the game they will be encouraged to try 
    again later because there is a cooldown of 24 hours before you can play again. If the user
    sends a link to the another person and that other person engages with the link, then the user
    can play again right away. If the user loses they should be notified about this cooldown and how
    to get around it by sharing a link. If the user wins, then at the end the user is encouraged to share
    the link so they can get a larger size for free.
    
    The format of the questions should be delivered one question at a time so that it doesn't feel too wordy.
    Questions should be fun and punchy.
    
    The tone of the writing should feel like bright summer fun. Add subtle touches of Gen Z slang (like “vibe check,” “lowkey,” or “let’s gooo”), overdo the slang for comedic effect.

    Make the questions difficult.

    `

  }
];


export default function BasicChatbot() {
  const [messages, setMessages] = useState([]);
  // milestone 7 need to reformat messages history to send to chatgpt in request
  const [APIRequestMessages, setAPIRequestMessages] = useState([]);

  // fetch for other requests
  async function fetchResponseMessage(formattedRequest) {
    const response = await getChat(formattedRequest);
    const message = response.choices[0].message;
    console.log("fetchResponse message: ", message);
    const content = response.choices[0].message.content;
    console.log("fetchResponse content: ", content);
    addBotMessage(content);
  }

   async function fetchInitialMessage() {
    const response = await getChat(prompt);
    const message = response.choices[0].message;
    console.log("message: ", message);
    const content = response.choices[0].message.content;
    console.log("content: ", content);
    addBotMessage(content);
    
  }

  useEffect(() => {
    fetchInitialMessage();

    // setMessages([
    //   {
    //     _id: 1,
    //     text: "Hello, welcome to simple trivia! Say 'Yes' when you're ready to play!",
    //     createdAt: new Date(),
    //     user: CHATBOT_USER_OBJ,
    //   },
    // ]);
  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      // console.log("PREVIOUS MESSAGES:", previousMessages);
      // console.log("NEW MESSAGE:", newMessages);
      return GiftedChat.append(previousMessages, newMessages);
    });
  };

  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };

  const respondToUser = (userMessages) => {
    //console.log("User message text:", userMessages[0].text);

    // mapping messages to the correct format for chatgpt
    const mapArray = [...messages].reverse().map((element) => ({
      role: element.user.name,
      content: element.text,
    }));

    // save latest message
    const latestMessage = {
    role:  "user",
    content: userMessages[0].text
    }
    mapArray.push(latestMessage);
    
    const requestArray = [...prompt, ...mapArray];

    // send this request to chatgpt
    fetchResponseMessage(requestArray);

    // reversing to get order i need for chatgpt
    //mapArray.reverse();


    // const allMessages = [latestMessage, ...mapArray];

    // const requestArray = [...prompt, ...allMessages];

    //test
    console.log("request array: ", JSON.stringify(requestArray,null,2));

    //do i need this state variable?
    // setAPIRequestMessages(requestArray);
    //fetchInitialMessage()

    // Simple chatbot logic (aka Checkpoint 2 onwards) here!
    //addBotMessage("I am da response!");

    // test
    //console.log("formated messages: ", requestArray);
    //console.log("messages: ", messages);
    //console.log("other messages maybe: ", userMessages[1]);
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "user",
      }}
      renderUsernameOnMessage={true}
    />
  );
}
