import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import openMyDatabase from '../config';
import { useNavigation } from '@react-navigation/native'; 

const Registros = () => {
    const [data, setData] = useState([]);

    const db = openMyDatabase.getConnection()

    const getData = () => {
      db.transaction(
          (tx) => {
              tx.executeSql('SELECT name, id, date FROM pacientes', [], (_, { rows: { _array } }) => setData(_array));
          },
          ({ tx, error }) => {
              console.log(error);
          }
      );
  }
  
    useEffect(() => {
        console.log('Iniciando useEffect en el componente Registros');
        getData()
    }, []);
      
    const cerrarSesion = () => {
      navigation.navigate('Login');
    };

    const navigation = useNavigation();

    const actualizarRegistros = () => {
      getData();
    };

    const navigateToFormulario = () =>{
      navigation.navigate('Formulario', { actualizarRegistros } );
    };

    const editarPaciente = (id) => {
      const paciente = data.find ((item) => item.id === id);
      if (paciente) {
        navigation.navigate ( 'Formulario', { id } )
      }
    }

    if (!data){
        return <Text>Cargando registros...</Text>;
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={cerrarSesion}>
              <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
      </View> 
        <Text style={styles.title}>Registros</Text>
        <Button title='Registrar nuevo paciente' onPress={navigateToFormulario}/>
        <Button title='Actualizar Registros' onPress={actualizarRegistros}/>
        {data.map((item, index) => (
          <TouchableOpacity 
            key={item.id}
            style={styles.row}
            onPress={() => editarPaciente(item.id)}
          >
          {/* </TouchableOpacity><View style={styles.row} key={index}> */}
            <Text style={styles.column}>{item.name}</Text>
            <Text style={styles.column}>{item.id}</Text>
            <Text style={styles.column}>{item.date}</Text>
            {/* Agrega aquí más columnas si lo deseas */}
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    column: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 20,
      marginRight: 20,
    },
  });
  
  export default Registros;
