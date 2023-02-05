import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('Putting data to database')

  // Create a connection to the DB and the version to use
  const jateDb = await openDB('jate', 1);
  // Create a transaction and specify the data privileges
  const trans = jateDb.transaction('jate', 'readwrite');
  // Opens the object store
  const openStore = trans.objectStore('jate');
  // Store and pass content
  const request = openStore.put({ id: 1, value: content });
  // Get confirmation of the request being added
  const result = await request;
  console.log('Data saved to DB', result);
};

export const getDb = async () => {
  console.log('Getting data from database')

  // Create a connection to the DB and the version to use
  const jateDb = await openDB('jate', 1);
  // Create a transaction and specify the data privileges
  const trans = jateDb.transaction('jate', 'readonly');
  // Opens the object store
  const openStore = trans.objectStore('jate');
  // Get all data in the database
  const request = openStore.getAll();
  // Get confirmation of the request being added
  const result = await request;
  console.log('Data saved to DB', result);
  return result;
};

initdb();
