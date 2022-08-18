import db from './db.json';

function UploadDB() {
  let i = 0;
  db.map((item) => {
    if (window.localStorage.getItem(item.id) !== null) {
    } else {
      i++;
      window.localStorage.setItem(item.id, JSON.stringify(item));
    }
  });
  console.log(`${i} lines added`);
}

export default UploadDB;
