import React, { useState, useEffect } from 'react';
import { useForm } from '../hooks';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import openMyDatabase from '../config';

const Formulario = ({ route, navigation }) => {
  const { id } = route.params;

  const { form, handleChange, setFormData } = useForm({
    id:  "",
    name:  "",
    date:  "",
    community:  "",
    age:  "",
    gender:  "",
    weight:  "",
    temperature:  "",
    glucose: "",
    bloodPressure:  "",
    allergigMedication:  "",
    diagnosis: "",
  });

  const [db, setDb] = useState(null);

  const getData = (paciente, connection) => {
    console.log("paciente id",paciente)
    connection.transaction(
        (tx) => {
            tx.executeSql(`SELECT * FROM pacientes WHERE id = ${paciente}`, [], (_, { rows: { _array } }) => {
              console.log("data arr", _array)
              console.log("paciente data", _array[0])
              setFormData(_array[0])
            });
        },
        ({ tx, error }) => {
            console.log(error);
        }
    );
}

  useEffect(() => {
    const connection = openMyDatabase.getConnection();
    setDb(connection);
    if(id){
      getData(id, connection)
    }
  },[id])

  const insertarPaciente = () => {
    console.log("conexión obtenida", db);

    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS pacientes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, date TEXT, community TEXT, age INTEGER, gender TEXT, weight REAL, temperature REAL, glucose REAL, bloodPressure TEXT, allergigMedication TEXT, diagnosis TEXT)',
        [],
        () => {
          console.log('Tabla "pacientes" creada exitosamente');

          if (id) {
            // Actualizar paciente existente
            tx.executeSql(
              'UPDATE pacientes SET name=?, date=?, community=?, age=?, gender=?, weight=?, temperature=?, glucose=?, bloodPressure=?, allergigMedication=?, diagnosis=? WHERE id=?',
              [form.name, form.date, form.community, parseInt(form.age), form.gender, parseFloat(form.weight), parseFloat(form.temperature), parseFloat(form.glucose), form.bloodPressure, form.allergigMedication, form.diagnosis, id],
              () => {
                console.log('Actualización exitosa');
                // actualizarRegistros();
                navigation.navigate("Registros")
              },
              (error) => {
                console.log('Error al actualizar el paciente:', error);
              }
            );
          } else {
            // Insertar nuevo paciente
            tx.executeSql(
              'INSERT INTO pacientes (name, date, community, age, gender, weight, temperature, glucose, bloodPressure, allergigMedication, diagnosis) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [form.name, form.date, form.community, form.age, form.gender, form.weight, form.temperature, form.glucose, form.bloodPressure, form.allergigMedication, form.diagnosis],
              () => {
                console.log('Inserción exitosa');
                navigation.navigate("Registros")
              },
              (error) => {
                console.log('Error al insertar el paciente:', error);
              }
            );
          }
        },
        (error) => {
          console.log('Error al crear la tabla "pacientes":', error);
        }
      );
    });
    navigation.navigate('Registros');
  };

  const cancelarRegistro = () => {
    navigation.navigate('Registros');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Medical Hands / Manos Medicas</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>ID:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el Cédula"
          value={form?.id.toString() || ""}
          onChangeText={(text) => handleChange({ name: "id", value: text })}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Name/Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          value={form?.name || ""}
          onChangeText={(text) => handleChange({ name: "name", value: text })}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Data/Fecha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la fecha"
          value={form?.date || ""}
          onChangeText={(text) => handleChange({ name: "date", value: text })}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Community/Comunidad:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la comunidad"
          value={form?.community || ""}
          onChangeText={(text) => handleChange({ name: "community", value: text })}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Edad:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la edad"
          value={form?.age.toString() || ""}
          onChangeText={(text) => handleChange({ name: "age", value: text })}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Sexo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el sexo"
          value={form?.gender || ""}
          onChangeText={(text) => handleChange({ name: "gender", value: text })}
        />
      </View>
      <Text style={styles.subtitle}>Signos Vitales</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Peso:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el peso"
          value={form?.weight.toString() || ""}
          onChangeText={(text) => handleChange({ name: "weight", value: text })}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Temperatura:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la temperatura"
          value={form?.temperature.toString() || ""}
          onChangeText={(text) => handleChange({ name: "temperature", value: text })}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Glucosa:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la glucosa"
          value={form?.glucose.toString() || ""}
          onChangeText={(text) => handleChange({ name: "glucose", value: text })}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Presión Arterial:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la presión arterial"
          value={form?.bloodPressure || ""}
          onChangeText={(text) => handleChange({ name: "bloodPressure", value: text })}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Alergico(a) a medicina:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese si es alérgico(a) a medicina"
          value={form?.allergigMedication || ""}
          onChangeText={(text) => handleChange({ name: "allergigMedication", value: text })}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Diagnóstico:</Text>
        <TextInput
          style={[styles.input, { height: 150, textAlignVertical: 'top' }]}
          multiline={true}
          numberOfLines={20}
          placeholder=''
          value={form?.diagnosis || ""}
          onChangeText={(text) => handleChange({ name: "diagnosis", value: text })}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={insertarPaciente}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={cancelarRegistro}>
          <Text style={[styles.buttonText, { color: 'red' }]}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Formulario;
