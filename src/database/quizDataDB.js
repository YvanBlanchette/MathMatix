import Dexie from 'dexie';

// Initialize Dexie database
const db = new Dexie('quizData');

// Define database schema
db.version(1).stores({
    quiz: '++id, date, userName, score, time, operations, problemCount, tables',
});

export { db };