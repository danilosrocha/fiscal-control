import { React } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import themes from './src/styles/themes/index';
import MenuStack from './src/stacks/MainStack';
import { NativeBaseProvider } from 'native-base';
import 'react-native-gesture-handler';
import SignIn from './src/screens/SignIn';

const App = () => {

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <MenuStack />
        {/* <SignIn></SignIn> */}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;