import React, {useEffect} from "react";
import { useForm } from "../hooks";
import openMyDatabase from "../config";
import { TextInput, View, StyleSheet } from "react-native";

export const Search = ({setData}) => {
    const { form, handleChange } = useForm({filtro:""});
    const db = openMyDatabase.getConnection();

    const getData = (filtro) => {
      console.log("data filtro", filtro)
        db.transaction(
          (tx) => {
            tx.executeSql(
              'SELECT name, cedula, date FROM personas WHERE cedula LIKE ?',
              [filtro + "%"],
              (_, { rows: { _array } }) => setData(_array),
              (tx, error) => {
                console.log(error);
              }
            );
          },
          (error) => {
            console.log(error);
          }
        );
    }; 

    useEffect(() => {
        if(form.filtro !== ""){
            getData(form.filtro)
        }
        // console.log("filtro",form.filtro)
    },[form.filtro])

    return(
        <View style={styles.container}>
            <TextInput
                type="text"
                value={form.filtro}
                onChangeText={(text) => handleChange ({ name: "filtro", value: text})}
                placeholder="Filtrar por Cédula"
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});