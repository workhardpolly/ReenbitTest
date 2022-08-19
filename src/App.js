import React, { useEffect, useReducer } from 'react';
import Contacts from './components/contacts/Contacts';
import Chat from './components/chat/Chat';

import db from './components/db/db.json';

import './App.css';

export const ChatId = React.createContext();

function App() {
  const [chatId, setChatId] = React.useState(1);
  const [send, setSend] = React.useState(false);

  const chatIdImport = (chatIdData) => {
    setChatId(chatIdData);
  };

  return (
    <div className="wrapper">
      <ChatId.Provider value={chatId}>
        <Contacts chatIdImport={chatIdImport} className="contacts" />
        <Chat className="chat" chatId={''} send={send} setSend={setSend} />
      </ChatId.Provider>
    </div>
  );
}

export default App;
