import * as SQLite from 'expo-sqlite';
import { create } from './Create.js';
import React, { useState } from 'react';
import { Alert, View, TextInput, Button, StyleSheet } from 'react-native';

export function Update() {
    const [id, setId] = useState('');
    const [senha, setSenha] = useState('');

    const update = async () => {
        try {
            const db = await create(); // Obtém a instância do banco de dados
            const result = await db.executeSql('UPDATE senhas SET senha = ? WHERE id = ?;', [senha, id]);

            if (result[0].rowsAffected > 0) {
                Alert.alert(
                    'Sucesso',
                    `Senha alterada com sucesso e salva no banco de dados: ${senha}`,
                    [{ text: 'Ok' }],
                    { cancelable: false }
                );
            } else {
                Alert.alert(
                    'Erro',
                    'Erro ao atualizar a senha',
                    [{ text: 'Ok' }],
                    { cancelable: false }
                );
            }
        } catch (error) {
            console.log('Erro atualizando senha:', error);
            Alert.alert(
                'Erro',
                'Ocorreu um erro ao atualizar a senha.',
                [{ text: 'Ok' }],
                { cancelable: false }
            );
        }
    }

    return (
        <View style={{ backgroundColor: 'white', marginBottom: 70, width: "80%" }}>
            <TextInput
                placeholder="Id da senha"
                onChangeText={id => setId(id)}
                value={id}
                style={styles.input}
            />
            <TextInput
                placeholder="Nova senha"
                onChangeText={senha => setSenha(senha)}
                value={senha}
                style={styles.input}
            />
            <Button title="Atualizar senha" onPress={update} />
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
