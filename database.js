import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase ({ name: 'dbprototipo.db', createFromLocation: 'C:/Users/gabva/My_Prototipo/myprototiponew/dbprototipo.db'});

export default db;