import React, { useEffect } from 'react';
import Contacts from './components/contacts/Contacts';
import Chat from './components/chat/Chat';
import db from './components/db/db.json';

import './App.css';

function App() {
  useEffect(() => {
    db.map((item) => {
      window.localStorage.setItem(item.id, JSON.stringify(item));
    });
    console.log('setted DB');
  }, [0]);

  const [chatId, setChatId] = React.useState(1);

  const chatIdImport = (chatIdData) => {
    setChatId(chatIdData);
  };

  console.log(chatId);

  return (
    <div className="wrapper">
      <Contacts chatIdImport={chatIdImport} className="contacts" />
      <Chat chatIdProp={chatId} className="chat" chatId={''} />
    </div>
  );
}

export default App;
