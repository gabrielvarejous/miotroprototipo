import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Formulario, Registros } from './views';
import * as SQLite from 'expo-sqlite'

const Stack = createStackNavigator();

const App = () => {
  const theme = {
    ...DefaultTheme,
    headerLeft: null,
  };

  function openDatabase() {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => { },
          };
        },
      };
    }
  
    const db = SQLite.openDatabase("mydatabase.db");
    return db;
  }

  const db = openDatabase();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS pacientes (id TEXT PRIMARY KEY, name TEXT, date TEXT, community TEXT, age INTEGER, gender TEXT, weight REAL, temperature REAL, glucose REAL, bloodPressure TEXT, allergicMedication TEXT, diagnosis TEXT)'
      )
    })
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registros" component={Registros}
        options={{ headerShown: false}} />
        <Stack.Screen name="Formulario" component={Formulario}
        options={{ headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
