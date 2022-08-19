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
    const avatar = currentChat.avatar;

    if (item.myMessage === true) {
      return (
        <div className="myMessage" key={item.messageDate}>
          <div className="message">{message}</div>
          <div className="dateTime">{date}</div>
        </div>
      );
    } else {
      return (
        <div className="recievedMessageContainer">
          <img className="contactAvatar" src={avatar} />
          <div className="recievedMessage" key={date}>
            <div
              style={{ backgroundColor: '#394051', color: '#f5f5f5' }}
              className="message">
              {message}
            </div>
            <div className="dateTime">{date}</div>
          </div>
        </div>
      );
    }
  });
  return messages;
}

export default ChatHistiry;
