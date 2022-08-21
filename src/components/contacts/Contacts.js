import React, { useState } from 'react';

import './contacts.css';

const Contacts = ({ chatIdImport }) => {
  // styling for mobile display

  function displayChat() {
    if (window.innerWidth < 600) {
      document.querySelector('.contactsWrapper').style.display = 'none';
      document.querySelector('.chatWrapper').style.display = 'flex';
      document.querySelector('.chatWrapper').style.maxWidth = '100%';
    } else if (window.innerHeight < 600) {
      document.querySelector('.contactsWrapper').style.display = 'none';
      document.querySelector('.chatWrapper').style.display = 'flex';
      document.querySelector('.chatWrapper').style.maxWidth = '100%';
    } else return;
  }

  // search manager
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  // parsing DB from browser storage

  let currentDb = [];

  for (let i = 1; i < localStorage.length + 1; i++) {
    currentDb.push(JSON.parse(localStorage.getItem(i)));
  }

  // sorting list of contacts depending on its last message time

  const sortedContactsFile = currentDb.sort(
    (a, b) =>
      new Date(b.messages.at(-1).messageDate) -
      new Date(a.messages.at(-1).messageDate)
  );

  // search result filter

  const searchResult = sortedContactsFile.filter((item) => {
    return item.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  // creating of list with contact items

  const contact = searchResult.map((item) => {
    let date = new Date(item.messages.at(-1).messageDate);

    let orderInList = searchResult.indexOf(item);

    return (
      <div
        className="contactItem"
        style={{ order: orderInList }}
        key={item.id}
        onClick={() => {
          chatIdImport(item.id);
          console.log('click', item.id);
          displayChat();
        }}>
        <img
          alt="Contact avatar"
          className="contactAvatar"
          src={item.avatar}></img>

        <div className="contactData">
          <div className="contactName">{item.name}</div>
          <div className="contactLastMessage">
            {item.messages.at(-1).message}
          </div>
        </div>
        <div className="lastMessageDate">
          {date.toDateString().slice(4, 15)}
        </div>
      </div>
    );
  });

  // contacts window return

  return (
    <div className="contactsWrapper">
      <div className="contactHeader">
        <div className="myInfo">
          <img
            alt="Your avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mike_Tyson_2019_by_Glenn_Francis.jpg/1200px-Mike_Tyson_2019_by_Glenn_Francis.jpg"
            className="contactAvatar"></img>
        </div>
        <div className="search">
          <input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Search or start new chat"></input>
        </div>
      </div>
      <h2 className="chatsHeader">Chats</h2>
      <div className="contacts">
        <ul className="contactsList">{contact}</ul>
      </div>
    </div>
  );
};

export default Contacts;
