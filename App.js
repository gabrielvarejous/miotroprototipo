import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Formulario, Registros, Settings } from './views';
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
  
    const db = SQLite.openDatabase("mynewdatabase.db");
    return db;
  }

  const db = openDatabase();

      useEffect(() => {
        db.transaction((tx) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS personas (cedula TEXT PRIMARY KEY, name TEXT, date TEXT, wbc TEXT, n TEXT, l TEXT, m TEXT, e TEXT, b TEXT, rbc TEXT, hb TEXT, hto TEXT, rdw TEXT, vcm TEXT, hcm TEXT, plaq TEXT, heces TEXT, glu TEXT, crea TEXT, bun TEXT, aUri TEXT, col TEXT, tg TEXT, hdl TEXT, ldl TEXT, ast TEXT, alt TEXT, na TEXT, k TEXT, ci TEXT, bi TEXT, bd TEXT, bt TEXT, bc TEXT, cr TEXT, ce TEXT, b2 TEXT, m2 TEXT, hiv TEXT, sifilis TEXT, vdrl TEXT)'
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
        <Stack.Screen name="Settings" component={Settings}
        options={{ headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
