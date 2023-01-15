import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from "../screens/SignIn";
import Home from "../screens/Home";
import MyDrawer from "./MainDrawer.tsx";
import ListGuests from "../screens/List";
import dark from "../styles/themes/dark";
import FinancialControl from "../screens/FinancialControl";
import ProfileGuest from "../screens/ProfileGuests";

const Stack = createNativeStackNavigator();

const MenuStack = () => (
  <Stack.Navigator
    initialRouteName="SignIn"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="SignIn" component={Signin} />
    <Stack.Screen name="MyDrawer" component={MyDrawer} />
    <Stack.Screen name="Home" component={Home} />

    <Stack.Group
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: `${dark.colors.primary}`

        },
      }}
    >
      <Stack.Screen name="ListGuests" component={ListGuests} options={{ title: "Lista de Convidados" }} />

      <Stack.Screen name="FinancialControl" component={FinancialControl} options={{ title: "Controle Financeiro" }} />

      <Stack.Screen name="ProfileGuest" component={ProfileGuest} options={{ title: "Convidado" }} />
    </Stack.Group>
  </Stack.Navigator >
);

export default MenuStack;