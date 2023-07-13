import * as SQLite from 'expo-sqlite';

const openMyDatabase= {
    getConnection: () => SQLite.openDatabase("mynewdatabase.db")
}

export default openMyDatabase