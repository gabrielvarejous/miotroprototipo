import React from "react";
import openMyDatabase from "../config";
import { View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';


const db = openMyDatabase.getConnection ();

const Settings = () => {
  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS personas (cedula TEXT PRIMARY KEY, name TEXT, date TEXT, wbc TEXT, n TEXT, l TEXT, m TEXT, e TEXT, b TEXT, rbc TEXT, hb TEXT, hto TEXT, rdw TEXT, vcm TEXT, hcm TEXT, plaq TEXT, heces TEXT, glu TEXT, crea TEXT, bun TEXT, aUri TEXT, col TEXT, tg TEXT, hdl TEXT, ldl TEXT, ast TEXT, alt TEXT, na TEXT, k TEXT, ci TEXT, bi TEXT, bd TEXT, bt TEXT, bc TEXT, cr TEXT, ce TEXT, b2 TEXT, m2 TEXT)',
        [],
        () => {
          console.log('Table "mytable" created successfully');
        },
        (error) => {
          console.log('Error creating table:', error);
        }
      );
    });

    // db.transaction((tx) => {
    //   tx.executeSql(
    //     'CREATE TABLE IF NOT EXISTS mytable (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)',
    //     [],
    //     () => {
    //       console.log('Table "mytable" created successfully');
    //     },
    //     (error) => {
    //       console.log('Error creating table:', error);
    //     }
    //   );
    // });
    
  };

  const deleteTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DROP TABLE IF EXISTS personas',
        [],
        () => {
          console.log('Table "personas" deleted successfully');
        },
        (error) => {
          console.log('Error deleting table:', error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Create Table" onPress={createTable} />
      <Button title="Delete Table" onPress={deleteTable} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Settings;