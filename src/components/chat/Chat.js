import React, { useEffect, useState, useContext, useReducer } from 'react';
import reducer from '../../reducer';
import { ChatId } from '../../App';
import contacts from '../db/db.json';
import ChatHistory from './ChatHistory/ChatHistory';
// import getChuckResponse from './getChuckResponse';

import './chat.css';

function Chat({ sendMessageImport, send, setSend, respond, setRespond }) {
  const chatId = useContext(ChatId);
  // console.log('chat rerender');

  const [state, dispatch] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem(chatId))
  );

  // recieve Chuck responce
  const [chuckRespond, setChuckRespond] = useState(
    'Chuck Norris will hit you so hard that your blood will bleed'
  );

  function getChuckResponse(chatId) {
    // console.log('getChuckRespStarted');

    fetch('https://api.chucknorris.io/jokes/random')
      .then((responce) => responce.json())
      .then((body) => setChuckRespond(body.value));

    setTimeout(() => {
      const currentMessage = JSON.parse(localStorage.getItem(chatId));
      currentMessage.messages.push({
        messageDate: new Date().toISOString(),
        message: chuckRespond,
        myMessage: false,
      });
      localStorage.setItem(chatId, JSON.stringify(currentMessage));
      console.log(currentMessage);

      dispatch({
        type: 'sendMessage',
        payload: { ...currentMessage },
      });
      setRespond(true);
    }, 5000);
  }

  // input block

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // sendButton click

  const handleSubmit = (e) => {
    e.preventDefault();

    //seting message to reducer

    if (inputValue !== '') {
      setSend(true);
      const localModifiedObj = JSON.parse(window.localStorage.getItem(chatId));
      localModifiedObj.messages.push({
        messageDate: new Date().toISOString(),
        message: inputValue,
        myMessage: true,
      });

      dispatch({
        type: 'sendMessage',
        payload: { ...localModifiedObj },
      });

      // cleaning input after send

      setInputValue('');

      getChuckResponse(chatId);
    } else return;
  };

  useEffect(() => {
    window.localStorage.setItem(chatId, JSON.stringify(state));

    setSend(false);

    console.log('effect1');
  }, [send]);

  useEffect(() => {
    const currentObj = JSON.parse(window.localStorage.getItem(chatId));
    dispatch({ type: 'chatIdChanged', payload: { ...currentObj } });
  }, [chatId]);

  return (
    <div className="chatWrapper">
      <div className="chatHeader">
        <img
          className="contactAvatar"
          src={JSON.parse(window.localStorage.getItem(chatId)).avatar}
        />
        <div className="chatPersonName">
          {' '}
          {JSON.parse(window.localStorage.getItem(chatId)).name}{' '}
        </div>
      </div>

      <div className="chatWindow">
        <ul className="chatHistoryList">
          <ChatHistory />
        </ul>
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
