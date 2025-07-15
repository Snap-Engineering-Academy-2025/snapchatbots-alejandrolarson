import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  avatar: "https://loremflickr.com/140/140",
};

//  three trivia questions
const questions = [
  {question : "What was the name of the rock band formed by Jimmy Page?",
    correct_answer : "Led Zeppelin"
  },
  {question: "Which country did AC/DC originate in?",
    correct_answer : "Australia"
  },
  {question : "Who served as the lead vocalist for Queen?",
    correct_answer : "Freddie Mercury"
  }
];

export default function AlejandrosChatbot() {
  const [messages, setMessages] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    if (messages.length < 1) {
      // Add a "starting message" when chat UI first loads
      addBotMessage(
        "Hello, welcome to simple trivia! Say 'Yes' when you're ready to play!"
      );
    }
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
    console.log("Recent user msg:", userMessages[0].text);
      if (!isPlaying) {
          // initializing game
        if (userMessages[0].text.trim().toLowerCase() === "yes") {
            addBotMessage(questions[questionIndex].question)
            setIsPlaying(true);
        // user not entering Yes to start
      } else {
        addBotMessage("Please write Yes to start");
      }
      } 
      
      if (isPlaying && questionIndex < questions.length && questions[questionIndex].correct_answer.trim().toLowerCase() === userMessages[0].text.trim().toLowerCase()){
        addBotMessage("You are correct");
        //console.log(questionIndex);
        let newCount = questionIndex;
        newCount++;
        setQuestionIndex(newCount);
        //console.log(questionIndex);
        if (newCount < questions.length) {
          addBotMessage(questions[newCount].question);
        } 
        
      } else if (isPlaying && questionIndex < questions.length && questions[questionIndex].correct_answer.trim().toLowerCase() !== userMessages[0].text.trim().toLowerCase()) {
        addBotMessage("Incorrect");
      }

  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        // Wait a sec before responding
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "Chilla",
      }}
      renderUsernameOnMessage={true}
    />
  );
}

// Workaround to hide an unnessary warning about defaultProps
const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};
