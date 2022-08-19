import { useContext } from 'react';
import { ChatId } from '../../../App';

import './chatHistory.css';

function ChatHistiry() {
  const chatId = useContext(ChatId);
  console.log('chatHistory');

  const currentChat = JSON.parse(localStorage.getItem(chatId));

  const messages = currentChat.messages.map((item) => {
    const date = new Date(item.messageDate).toLocaleString('en-US');
    const message = item.message;
    

    if (item.myMessage === true) {
      return (
        <div className="myMessage" key={date}>
          <div className="message">{message}</div>
          <div className="DateTime">{date}</div>
        </div>
      );
    } else {
      return ({window.scrollto()}
        <div className="recievedMessage" key={date}>
          <div className="message">{message}</div>
          <div className="DateTime">{date}</div>
        </div>
      );
    }
  });
  return messages;
}

export default ChatHistiry;
