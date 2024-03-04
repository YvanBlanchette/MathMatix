import Dexie from 'dexie';


// Initialize Dexie database
const db = new Dexie('UserData');

// Define database schema
db.version(1).stores({
    users: '++id, userName, email, profileImg, operations, problemCount, tables',
});

export { db };