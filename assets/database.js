import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "DnDCharacterDB.db";
const database_version = "1.0";
const database_displayname = "SQLite DnD Character Database";
const database_size = 200000;

export const getDBConnection = async () => {
    return SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size
    );
};

export const createTable = async (db) => {
    const query = `
    CREATE TABLE IF NOT EXISTS characters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      race TEXT,
      class TEXT,
      strength INTEGER,
      dexterity INTEGER,
      constitution INTEGER,
      intelligence INTEGER,
      wisdom INTEGER,
      charisma INTEGER
    );
  `;
    await db.executeSql(query);
};

export const saveCharacter = async (db, character) => {
    const { race, cls, stats } = character;
    const insertQuery = `
    INSERT INTO characters (race, class, strength, dexterity, constitution, intelligence, wisdom, charisma) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
    const [strength, dexterity, constitution, intelligence, wisdom, charisma] = stats;
    return db.executeSql(insertQuery, [race, cls, strength, dexterity, constitution, intelligence, wisdom, charisma]);
};

export const getAllCharacters = async (db) => {
    const characters = [];
    const results = await db.executeSql('SELECT * FROM characters');
    results.forEach(result => {
        for (let i = 0; i < result.rows.length; i++) {
            characters.push(result.rows.item(i));
        }
    });
    return characters;
};

export const deleteCharacter = async (db, id) => {
    const query = `DELETE FROM characters WHERE id = ?`;
    return db.executeSql(query, [id]);
};
