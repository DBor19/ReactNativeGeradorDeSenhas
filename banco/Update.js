import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { create } from './Create.js';

export function Update() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const update = async () => {
        try {
            let db = await create();
            let result = await db.runAsync(`UPDATE senhas SET senha = ? WHERE senha = ?;`, [password, login]);
            if (result.changes > 0) {
                Alert.alert(
                    'Sucesso!',
                    'Credenciais salvas',
                    [
                        { text: 'Ok' },
                    ],
                    { cancelable: false }
                );
            } else {
                Alert.alert('Erro', 'Erro ao atualizar senha', [{ text: 'Ok' }], { cancelable: false });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const generatePassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let newPassword = "";
        for (let i = 0; i < 8; i++) {
            const randomNumber = Math.floor(Math.random() * chars.length);
            newPassword += chars.charAt(randomNumber);
        }
        setPassword(newPassword);
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Login"
                onChangeText={login => setLogin(login)}
                style={styles.input}
            />
            <TextInput
                placeholder="Nova Senha"
                value={password}
                editable={false}
                style={styles.input}
            />
            <Button title="Gerar Nova Senha" onPress={generatePassword} />
            <Button title="Salvar" disabled={login === '' || password === ''} onPress={update} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 70,
        width: "80%"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
