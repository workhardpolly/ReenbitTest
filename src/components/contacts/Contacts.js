import React, { useState } from 'react';

import './contacts.css';

const Contacts = ({ chatIdImport }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  let currentDb = [];

  for (let i = 1; i < localStorage.length + 1; i++) {
    currentDb.push(JSON.parse(localStorage.getItem(i)));
  }
  console.log('db updated');

  const sortedContactsFile = currentDb.sort(
    (a, b) =>
      new Date(b.messages.at(-1).messageDate) -
      new Date(a.messages.at(-1).messageDate)
  );

  const searchResult = sortedContactsFile.filter((item) => {
    return item.name.toLowerCase().includes(searchValue.toLowerCase());
  });

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
        }}>
        <img className="contactAvatar" src={item.avatar}></img>

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

  return (
    <div className="contactsWrapper">
      <div className="contactHeader">
        <div className="myInfo">
          <img
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
      <div className="contacts">
        <h2 className="chatsHeader">Chats</h2>

        <ul className="contactsList">{contact}</ul>
      </div>
    </div>
  );
};

export default Contacts;
