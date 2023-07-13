import React, { useState, useEffect } from 'react';
import { useForm } from '../hooks';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import openMyDatabase from '../config';

const Formulario = ({ route, navigation }) => {
  const { cedula } = route.params;

  const { form, handleChange, setFormData } = useForm({
    cedula:  "",
    name:  "",
    date:  "",
    age:  "",
    gender:  "",
    wbc: "",
    n: "",
    l: "",
    m: "",
    e: "",
    b: "",
    rbc: "",
    hb: "",
    hto: "",
    rdw: "",
    vcm: "",
    hcm: "",
    plaq: "",
    heces: "",
    glu: "",
    crea: "",
    bun: "",
    aUri: "",
    col: "",
    tg: "",
    hdl: "",
    ldl: "",
    ast: "",
    alt: "",
    na: "",
    k: "",
    ci: "",
    bi: "",
    bd: "",
    bt: "",
    bc: "",
    cr: "",
    ce: "",
    b2: "",
    m2: "",
  });

  const [db, setDb] = useState(null);

  const getData = (paciente, connection) => {
    console.log("paciente cedula", paciente)
    console.log('Conexión establecida:', connection);
    connection.transaction(
        (tx) => {
            tx.executeSql(`SELECT * FROM personas WHERE cedula = "${paciente}"`, [], (_, { rows: { _array } }) => {
              console.log("data arr", _array)
              console.log("paciente data", _array[0])
              setFormData(_array[0])
            });
        },
        ({ tx, error }) => {
            console.log('Error al ejecutar consulta SELECT:', error);
        }
    );
}

  useEffect(() => {
    const connection = openMyDatabase.getConnection();
    setDb(connection);
    // console.log('Conexión establecida:', connection);
    if(cedula){
      getData(cedula, connection)
    }
  },[cedula])

  const insertarPaciente = () => {
    try {   
      console.log("conexión obtenida", db);
  
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS personas (cedula TEXT PRIMARY KEY, name TEXT, date TEXT, wbc TEXT, n TEXT, l TEXT, m TEXT, e TEXT, b TEXT, rbc TEXT, hb TEXT, hto TEXT, rdw TEXT, vcm TEXT, hcm TEXT, plaq TEXT, heces TEXT, glu TEXT, crea TEXT, bun TEXT, aUri TEXT, col TEXT, tg TEXT, hdl TEXT, ldl TEXT, ast TEXT, alt TEXT, na TEXT, k TEXT, ci TEXT, bi TEXT, bd TEXT, bt TEXT, bc TEXT, cr TEXT, ce TEXT, b2 TEXT, m2 TEXT)',
            [],
          () => {
            console.log('Tabla "personas" creada exitosamente');
  
            if (cedula) {
              // Actualizar paciente existente
              tx.executeSql(
                'UPDATE personas SET name=?, date=?, wbc=?, n=?, l=?, m=?, e=?, b=?, rbc=?, hb=?, hto=?, rdw=?, vcm=?, hcm=?, plaq=?, heces=?, glu=?, crea=?, bun=?, aUri=?, col=?, tg=?, hdl=?, ldl=?, ast=?, alt=?, na=?, k=?, ci=?, bi=?, bd=?, bt=?, bc=?, cr=?, ce=?, b2=?, m2=? WHERE cedula=?',
                [form.name, form.date, form.wbc, form.n, form.l, form.m, form.e, form.b, form.rbc, form.nb, form.hto, form.rdw, form.vcm, form.hcm, form.plaq, form.heces, form.glu, form.crea, form.bun, form.aUri, form.col, form.tg, form.hdl, form.ldl, form.ast, form.alt, form.na, form.k, form.ci, form.bi, form.bd, form.bt, form.bc, form.cr, form.ce, form.b2, form.m2, cedula],
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
              console.log("data insert", form)
              // Insertar nuevo paciente
                tx.executeSql(
                  'INSERT INTO personas (cedula, name, date, wbc, n, l, m, e, b, rbc, hb, hto, rdw, vcm, hcm, plaq, heces, glu, crea, bun, aUri, col, tg, hdl, ldl, ast, alt, na, k, ci, bi, bd, bt, bc, cr, ce, b2, m2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                  [form.cedula, form.name, form.date, form.wbc, form.n, form.l, form.m, form.e, form.b, form.rbc, form.hb, form.hto, form.rdw, form.vcm, form.hcm, form.plaq, form.heces, form.glu, form.crea, form.bun, form.aUri, form.col, form.tg, form.hdl, form.ldl, form.ast, form.alt, form.na, form.k, form.ci, form.bi, form.bd, form.bt, form.bc, form.cr, form.ce, form.b2, form.m2],
                  () => {
                    console.log('Inserción exitosa');
                    navigation.navigate("Registros")
                  },
                  (error) => {
                    console.log('Error al insertar el paciente:', error);
                  }
                );

              // tx.executeSql(
              //   'INSERT INTO personas (cedula, name, date, wbc, n, l, m, e, b, rbc, hb, hto, rdw, vcm, hcm, plaq, heces, glu, crea, bun, aUri, col, tg, hdl, ldl, ast, alt, na, k, ci, bi, bd, bt, bc, cr, ce, b2, m2, hiv, sifilis, vdrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              //   [form.cedula, form.name, form.date, form.wbc, form.n, form.l, form.m, form.e, form.b, form.rbc, form.hb, form.hto, form.rdw, form.vcm, form.hcm, form.plaq, form.heces, form.glu, form.crea, form.bun, form.aUri, form.col, form.tg, form.hdl, form.ldl, form.ast, form.alt, form.na, form.k, form.ci, form.bi, form.bd, form.bt, form.bc, form.cr, form.ce, form.b2, form.m2, form.hiv, form.sifilis, form.vdrl],
              //   () => {
              //     console.log('Inserción exitosa');
              //     navigation.navigate("Registros")
              //   },
              //   (error) => {
              //     console.log('Error al insertar el paciente:', error);
              //   }
              // );
            }
          },
          (error) => {
            console.log('Error al crear la tabla "pacientes":', error);
          }
        );
      });
      navigation.navigate('Registros');
    } catch (error) {
      console.log("Error Registro Paciente", error)
    }
  };

  const cancelarRegistro = () => {
    navigation.navigate('Registros');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>LAB. VILLARCIA</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Cédula:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese el Cédula"
          value={form?.cedula.toString() || ""}
          onChangeText={(text) => handleChange({ name: "cedula", value: text })}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre Paciente:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          value={form?.name || ""}
          onChangeText={(text) => handleChange({ name: "name", value: text })}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Fecha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la fecha"
          value={form?.date || ""}
          onChangeText={(text) => handleChange({ name: "date", value: text })}
        />
      </View>

      <View style={styles.field}>
          <Text style={styles.label}>BHC -----------------------------------------------------</Text>
            <Text style={styles.sublabel}>WBC:</Text>
            <TextInput
          style={styles.input}
          value={form?.wbc || ""}
          onChangeText={(text) => handleChange({ name: "wbc", value: text })}
            />
         
          <View style={styles.subfield}>
            <Text style={styles.sublabel}>N:</Text>
            <TextInput
              style={styles.input}
              value={form?.n || ""}
          onChangeText={(text) => handleChange({ name: "n", value: text })}
            />
          </View>
          <View style={styles.subfield}>
            <Text style={styles.sublabel}>L:</Text>
            <TextInput
              style={styles.input}
              value={form?.l || ""}
          onChangeText={(text) => handleChange({ name: "l", value: text })}
            />
          </View>
          <View style={styles.subfield}>
            <Text style={styles.sublabel}>M:</Text>
            <TextInput
              style={styles.input}
              value={form?.m || ""}
          onChangeText={(text) => handleChange({ name: "m", value: text })}
            />
          </View>
          <View style={styles.subfield}>
            <Text style={styles.sublabel}>E:</Text>
            <TextInput
              style={styles.input}
              value={form?.e || ""}
          onChangeText={(text) => handleChange({ name: "e", value: text })}
            />
          </View>
          <View style={styles.subfield}>
            <Text style={styles.sublabel}>B:</Text>
            <TextInput
              style={styles.input}
              value={form?.b || ""}
          onChangeText={(text) => handleChange({ name: "b", value: text })}
            />
          </View>
          <View style={styles.subfield}>
            <Text style={styles.sublabel}>RBC:</Text>
            <TextInput
              style={styles.input}
              value={form?.rbc || ""}
          onChangeText={(text) => handleChange({ name: "rbc", value: text })}
            />
          </View>
          <View style={styles.subfield}>
            <Text style={styles.sublabel}>HB:</Text>
            <TextInput
              style={styles.input}
              value={form?.hb || ""}
          onChangeText={(text) => handleChange({ name: "hb", value: text })}
            />
          </View>
          <View style={styles.subfield}>
            <Text style={styles.sublabel}>HTO:</Text>
            <TextInput
              style={styles.input}
              value={form?.hto || ""}
          onChangeText={(text) => handleChange({ name: "hto", value: text })}
            />
          </View>
          <View style={styles.subfield}>
            <Text style={styles.sublabel}>RDW:</Text>
            <TextInput
              style={styles.input}
              value={form?.rdw || ""}
          onChangeText={(text) => handleChange({ name: "rdw", value: text })}
            />
          </View>
          <View style={styles.subfield}>
            <Text style={styles.sublabel}>VCM:</Text>
            <TextInput
              style={styles.input}
              value={form?.vcm || ""}
          onChangeText={(text) => handleChange({ name: "vcm", value: text })}
            />
          </View>
          <View style={styles.subfield}>
            <Text style={styles.sublabel}>HCM:</Text>
            <TextInput
              style={styles.input}
              value={form?.hcm || ""}
          onChangeText={(text) => handleChange({ name: "hcm", value: text })}
            />
          </View>
          <View style={styles.subfield}>
            <Text style={styles.sublabel}>PLAQ:</Text>
            <TextInput
              style={styles.input}
              value={form?.plaq || ""}
          onChangeText={(text) => handleChange({ name: "plaq", value: text })}
            />
          </View>
          <View style={styles.subfield}>
            <Text style={styles.sublabel}>HECES:</Text>
            <TextInput
              style={styles.input}
              value={form?.heces || ""}
          onChangeText={(text) => handleChange({ name: "heces", value: text })}
            />
          </View>
        </View>


        <View style={styles.field}>
        <Text style={styles.label}>QUIMICA ------------------------------------------------</Text>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>GLU:</Text>
          <TextInput
            style={styles.input}
            value={form?.glu || ""}
          onChangeText={(text) => handleChange({ name: "glu", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>CREA:</Text>
          <TextInput
            style={styles.input}
            value={form?.crea || ""}
          onChangeText={(text) => handleChange({ name: "crea", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>BUN:</Text>
          <TextInput
            style={styles.input}
            value={form?.bun || ""}
          onChangeText={(text) => handleChange({ name: "bun", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>A. URI:</Text>
          <TextInput
            style={styles.input}
            value={form?.aUri || ""}
          onChangeText={(text) => handleChange({ name: "aUri", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>COL:</Text>
          <TextInput
            style={styles.input}
            value={form?.col || ""}
          onChangeText={(text) => handleChange({ name: "col", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>TG:</Text>
          <TextInput
            style={styles.input}
            value={form?.tg || ""}
          onChangeText={(text) => handleChange({ name: "tg", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>HDL:</Text>
          <TextInput
            style={styles.input}
            value={form?.hdl || ""}
          onChangeText={(text) => handleChange({ name: "hdl", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>LDL:</Text>
          <TextInput
            style={styles.input}
            value={form?.ldl || ""}
          onChangeText={(text) => handleChange({ name: "ldl", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>AST:</Text>
          <TextInput
            style={styles.input}
            value={form?.ast || ""}
          onChangeText={(text) => handleChange({ name: "ast", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>ALT:</Text>
          <TextInput
            style={styles.input}
            value={form?.alt || ""}
          onChangeText={(text) => handleChange({ name: "alt", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>Na:</Text>
          <TextInput
            style={styles.input}
            value={form?.na || ""}
          onChangeText={(text) => handleChange({ name: "na", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>K:</Text>
          <TextInput
            style={styles.input}
            value={form?.k || ""}
          onChangeText={(text) => handleChange({ name: "k", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>CI:</Text>
          <TextInput
            style={styles.input}
            value={form?.ci || ""}
          onChangeText={(text) => handleChange({ name: "ci", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>BI:</Text>
          <TextInput
            style={styles.input}
            value={form?.bi || ""}
          onChangeText={(text) => handleChange({ name: "bi", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>BD:</Text>
          <TextInput
            style={styles.input}
            value={form?.bd || ""}
          onChangeText={(text) => handleChange({ name: "bd", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>BT:</Text>
          <TextInput
            style={styles.input}
            value={form?.bt || ""}
          onChangeText={(text) => handleChange({ name: "bt", value: text })}
          />
        </View>
      </View>

            <View style={styles.field}>
        <Text style={styles.label}>ORINA --------------------------------------------------</Text>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>CB:</Text>
          <TextInput
            style={styles.input}
            value={form?.bc || ""}
          onChangeText={(text) => handleChange({ name: "bc", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>CR:</Text>
          <TextInput
            style={styles.input}
            value={form?.cr || ""}
          onChangeText={(text) => handleChange({ name: "cr", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>CE:</Text>
          <TextInput
            style={styles.input}
            value={form?.ce || ""}
          onChangeText={(text) => handleChange({ name: "ce", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>B:</Text>
          <TextInput
            style={styles.input}
            value={form?.b2 || ""}
          onChangeText={(text) => handleChange({ name: "b2", value: text })}
          />
        </View>
        <View style={styles.subfield}>
          <Text style={styles.sublabel}>M:</Text>
          <TextInput
            style={styles.input}
            value={form?.m2 || ""}
          onChangeText={(text) => handleChange({ name: "m2", value: text })}
          />
        </View>
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
    alignItems: 'center',
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
    backgroundColor: '#a9a9a9',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default Formulario;
