import * as SQLite from 'expo-sqlite';
import { create } from './Create.js';
import { Alert, View, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export function Remove() {
    const [senha, setSenha] = useState('');

    const remove = async () => {
        try {
            let db = await create();
            let result = await db.runAsync(`DELETE FROM senhas WHERE senha = ?;`, senha);
            if (result.changes > 0) {
                Alert.alert(
                    'Success',
                    'Senha removida',
                    [
                        {
                            text: 'Ok'
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                Alert.alert(
                    'Error',
                    'Erro ao remover senha',
                    [
                        {
                            text: 'Ok'
                        },
                    ],
                    { cancelable: false }
                );
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ flex: 1, width: "80%" }}>
            <TextInput
                placeholder="Entre com a Senha"
                onChangeText={senha => setSenha(senha)}
                style={styles.input}
            />
            <Button title="Delete" onPress={() => remove()} />
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
