import React, { useEffect } from 'react';
import Contacts from './components/contacts/Contacts';
import Chat from './components/chat/Chat';

import './App.css';

export const ChatId = React.createContext();

function App() {
  // Main states bank
  const [chatId, setChatId] = React.useState(1);
  const [send, setSend] = React.useState(false);
  const [respond, setRespond] = React.useState(false);

  // import of chatId from Chat module
  const chatIdImport = (chatIdData) => {
    setChatId(chatIdData);
  };

  // rerender in case of message was send or recieved

  useEffect(() => {
    setRespond(false);
  }, [respond, send]);

  return (
    <div className="wrapper">
      <ChatId.Provider value={chatId}>
        <Contacts
          chatIdImport={chatIdImport}
          send={send}
          className="contacts"
        />
        <Chat
          className="chat"
          chatId={''}
          send={send}
          setSend={setSend}
          respond={respond}
          setRespond={setRespond}
        />
      </ChatId.Provider>
    </div>
  );
}

export default App;
