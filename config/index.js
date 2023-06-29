import * as SQLite from 'expo-sqlite';

const openMyDatabase= {
    getConnection: () => SQLite.openDatabase("mydatabase.db")
}

export default openMyDatabase