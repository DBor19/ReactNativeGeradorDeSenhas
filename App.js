import { StyleSheet, View } from 'react-native';
import { Insert } from './banco/Insert';
import { Remove } from './banco/Remove';
import { AllContacts } from './banco/AllContacts';
import { Update } from './banco/Update';

export default function App() {

  return (
    <View style={styles.container}>
      <Insert/>
      <Remove/>
      <Update/>
      <AllContacts/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});