import React, { useEffect, useState, useContext, useReducer } from 'react';
import reducer from '../../reducer';
import { ChatId } from '../../App';
import contacts from '../db/db.json';

import './chat.css';

function Chat({ sendMessageImport, send, setSend }) {
  const chatId = useContext(ChatId);

  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem(chatId))
  );

  // current obj storage

  const [currentObj, setCurrentObj] = useState({});

  const [modifiedObj, setModifiedObj] = useState('');

  // input block

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // sendButton click

  const handleSubmit = (e) => {
    e.preventDefault();

    setSend(true);
    const localModifiedObj = JSON.parse(JSON.stringify(currentObj));
    localModifiedObj.messages.push({
      messageDate: new Date().toISOString(),
      message: inputValue,
    });
    dispatch({
      type: 'sendMessage',
      payload: { ...localModifiedObj },
    });

    setInputValue('');
  };

  useEffect(() => {
    if (send === true) {
      window.localStorage.setItem(chatId, JSON.stringify(state));
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
      <form className="chatSendMessage" onSubmit={handleSubmit}>
        <input
          placeholder="Type your message here"
          className="chatMessageInput"
          type="text"
          onChange={handleInputChange}
          value={inputValue}></input>

        <button type="submit" className="messageSendButton"></button>
      </form>
    </div>
  );
}

export default Chat;
