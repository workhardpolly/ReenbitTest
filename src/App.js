import React from 'react';
import { ReactDOM } from 'react';
import Contacts from './components/contacts/Contacts';
import Chat from './components/chat/Chat';

import './App.css';

function App() {
  return (
    <div className="wrapper">
      <Contacts className="contacts" />
      <Chat className="chat" />
    </div>
  );
}

export default App;
