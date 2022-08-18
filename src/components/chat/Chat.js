import React, { useEffect, useState } from 'react';

import contacts from '../db/db.json';

import './chat.css';

const Chat = (props) => {
  let chatId = props.chatIdProp;

  // current obj storage

  const [currentObj, setCurrentObj] = useState({});

  const [modifiedObj, setModifiedObj] = useState('');

  // input block

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // sendButton click
  const [send, setSend] = useState(false);

  const handleClick = () => {
    setSend(true);
    const localModifiedObj = JSON.parse(JSON.stringify(currentObj));
    localModifiedObj.messages.push({
      messageDate: new Date().toISOString(),
      message: inputValue,
    });
    setModifiedObj(localModifiedObj);
    console.log(modifiedObj);
  };

  useEffect(() => {
    if (send === true) {
      window.localStorage.setItem(chatId, JSON.stringify(modifiedObj));
    }
    setSend(false);
  }, [send]);

  // reading obj

  useEffect(() => {
    setCurrentObj(JSON.parse(window.localStorage.getItem(chatId)));
  }, [chatId, send]);

  return (
    <div className="chatWrapper">
      <div className="chatHeader">
        <img className="contactAvatar" src={currentObj.avatar} />
        <div className="chatPersonName">{currentObj.name}</div>
      </div>

      <div className="chatWindow">
        ChatWindow
        <div>Current chat id = {chatId}</div>
      </div>
      <div className="chatSendMessage">
        <input
          placeholder="Type your message here"
          className="chatMessageInput"
          type="text"
          onChange={handleInputChange}
          value={inputValue}></input>

        <button className="messageSendButton" onClick={handleClick}></button>
      </div>
    </div>
  );
};

export default Chat;
