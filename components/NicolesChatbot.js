import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { SafeAreaProvider } from "react-native-safe-area-context";
const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "React Native Chatbot",
  avatar: "https://cdn.outsideonline.com/wp-content/uploads/2021/01/21/surfer-san-diego-dawn_s.jpg",
};
export default function App() {
  const [messages, setMessages] = useState([]);
 //const [chatQues, setChatQues] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  useEffect(() => {
    console.log("App mounted, initializing chat...");
    if (messages.length < 1) {
      // Add a "starting message" when chat UI first loads
      addBotMessage(
        "Hello, welcome to simple trivia! Say 'Yes' when you're ready to play!"
      );
    }
  }, []);
  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
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
  const userReply = userMessages[0].text.trim().toLowerCase();
  console.log("User said:", userReply);
  if (questionIndex === 0 && userReply === "yes") {
    addBotMessage("First Question: Which half-marathon Nicole has done?");
    setQuestionIndex(1);
  } else if (questionIndex === 1) {
    if (userReply === "nike") {
      addBotMessage("Correct!");
      addBotMessage("Second Question: Has Nicole ever done a surfing competition?");
      setQuestionIndex(2);
    } else {
      addBotMessage("Incorrect. Try again!");
    }
  } else if (questionIndex === 2) {
    if (userReply === "no") {
      addBotMessage("Correct!");
      addBotMessage("Third Question: What is Nicole's favorite color?");
      setQuestionIndex(3);
    } else {
      addBotMessage("Incorrect. Try again!");
    }
  } else if (questionIndex === 3) {
    if (userReply === "pastel blue") {
      addBotMessage("Correct! All done.");
      addBotMessage("Type 'restart' to play again or 'quit' to exit.");
      setQuestionIndex(4);
    } else {
      addBotMessage("Incorrect. Try again!");
    }
  } else if (questionIndex === 4) {
    if (userReply === "restart") {
      setMessages([]);
      setQuestionIndex(0);
      addBotMessage("Welcome back! Say 'Yes' when you're ready to play.");
    } else {
      addBotMessage("Thanks for playing! Type 'restart' if you want to try again!");
    }
  } else {
    addBotMessage("Say 'Yes' when you're ready!");
  }
};
  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);
  return (
    <SafeAreaProvider>
      <GiftedChat
        messages={messages}
        onSend={(messages) => {
          onSend(messages);
          // Wait a sec before responding
          setTimeout(() => respondToUser(messages), 1000);
        }}
        user={{
          _id: 1,
          name: "SEA",
        }}
        renderUsernameOnMessage={true}
      />
    </SafeAreaProvider>
  );
}
// Workaround to hide an unnessary warning about defaultProps
const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};