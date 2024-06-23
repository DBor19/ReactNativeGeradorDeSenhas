import * as SQLite from 'expo-sqlite';
import { create } from './Create.js';
import { Alert, View, TextInput, Button, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';

export function Insert() {
    
    const [senha, setSenha] = useState('');

    function generateRandomPassword(length = 8) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let senha = "";
        
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          senha += charset[randomIndex];
        }
        setSenha(senha)
        return senha;
      }
    const insert = async () => {

        try {
            let senha = generateRandomPassword();
            db = await create();
            let result = await db.runAsync(`INSERT INTO senhas (senha) VALUES (?);`,senha);
            if (result.changes > 0) {
                Alert.alert(
                    'Success',
                    'Contact registered',
                    [
                        {
                            text: 'Ok'
                        },
                    ],
                    { cancelable: false }
                );
            } else alert('Error ao registrar a senha');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ backgroundColor: 'white', marginTop: 70, width: "80%" }}>
            <Button title="Salvar Senha" onPress={() => insert()} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});