import { openDatabase } from 'expo-sqlite';

const db = openDatabase('characters.db');

export const initDb = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS characters (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, race TEXT, class TEXT, strength INTEGER, dexterity INTEGER, constitution INTEGER, intelligence INTEGER, wisdom INTEGER, charisma INTEGER)',
            [],
            (_, result) => {
                console.log('Table created successfully:', result);
            },
            (_, error) => {
                console.error('Error creating table:', error);
            }
        );
    });
};

export const fetchTopScores = () => {
    // Function to fetch top scores from the database
};

export const saveCharacter = (name, race, cls, stats) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO characters (name, race, class, strength, dexterity, constitution, intelligence, wisdom, charisma) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [name, race, cls, ...stats],
                (_, { insertId }) => {
                    console.log('Character saved successfully with ID:', insertId);
                    resolve(insertId);
                },
                (_, error) => {
                    console.error('Error saving character:', error);
                    reject(error);
                }
            );
        });
    });
};
