export function localdatabase() {
  const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

  const request = indexedDB.open('ChatsDatabase', 1);

  request.onerror = function (event) {
    console.log('an error occured with IndexedDB');
    console.error(event);
  };

  request.onupgradeneeded = function () {
    const db = request.result;
    const store = db.createObjectStore('contacts', { keyPath: 'id' });
    store.createIndex('name', ['name'], { unique: false });
    store.createIndex('avatar', ['avatar'], { unique: false });
    store.createIndex('message', ['message'], { unique: false });
  };

  request.onsuccess = function () {
    const db = request.result;
    const transaction = db.transaction('contacts', 'readwrite');
    const store = transaction.objectStore('contacts');
    const nameIndex = store.index('name');
    const avatarIndex = store.index('avatar');
    const message = store.index('message');

    store.put({
      id: 1,
      name: 'Alice Freeman',
      avatar:
        'https://vjoy.cc/wp-content/uploads/2020/10/da741321fed2fc603a92b5cb13101ecc.png',
      message: [
        {
          body: 'hello1,boy',
          messageDate: '2012-04-13T18:25:43.511Z',
        },
      ],
    });
    store.put({
      id: 2,
      name: 'Josefina',
      avatar:
        'https://vjoy.cc/wp-content/uploads/2020/10/f9b312787361402f34c402a170da4ef8-1248x1536.jpg',
      message: [
        {
          body: 'hello2,boy',
          messageDate: '2012-04-13T18:25:43.511Z',
        },
      ],
    });
    store.put({
      id: 3,
      name: 'Velazquez',
      avatar:
        'https://vjoy.cc/wp-content/uploads/2020/10/6509e0ad6e65fdc29fff70170af2dedd.jpg',
      message: [
        {
          body: 'hello3,boy',
          messageDate: '2012-04-13T18:25:43.511Z',
        },
      ],
    });
    store.put({
      id: 4,
      name: 'Barrers',
      avatar:
        'https://vjoy.cc/wp-content/uploads/2020/10/a63b1e80c31ac92374ec4a15f7045f4d.jpg',
      message: [
        {
          body: 'hello4,boy',
          messageDate: '2012-04-13T18:25:43.511Z',
        },
      ],
    });
    store.put({
      id: 5,
      name: 'Zakhar',
      avatar: 'https://uznayvse.ru/images/catalog/2022/3/pavel-durov_90.jpg',
      message: [
        {
          body: 'hello5,boy',
          messageDate: '2012-04-13T18:25:43.511Z',
        },
      ],
    });
    store.put({
      id: 6,
      name: 'Bob Snail',
      avatar: 'http://vospitatel.com.ua/images/u/ulitka-3god.jpg',
      message: [
        {
          body: 'hello6,boy',
          messageDate: '2012-04-13T18:25:43.511Z',
        },
      ],
    });
    transaction.oncomplete = function () {
      db.close();
    };
  };
}
