import React from "react";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Registration from '../screens/Registration';
import ListGuests from "../screens/List";
import dark from "../styles/themes/dark";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
    const navigation = useNavigation();

    function CustomDrawerContent(props) {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem label="Sair" onPress={() => signOut(auth).then(() => {
                    console.log("Logout successful.");
                    navigation.reset({
                        routes: [{ name: 'SignIn' }]
                    });
                }).catch((error) => {
                    console.log(error);
                })} />
            </DrawerContentScrollView>
        );
    }

    return (
        <Drawer.Navigator
            screenOptions={{

                // headerShown: false,

                drawerActiveTintColor: `${dark.colors.textColor}`,
                headerStyle: {
                    backgroundColor: `${dark.colors.primary}`,
                    height: 80,

                },
                drawerStyle: {
                    backgroundColor: `${dark.colors.primary}`,
                    width: 240,
                },
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}

        >
            <Drawer.Screen name="Tela Inicial" component={Home} />
            <Drawer.Screen name="Cadastro de Convidados" component={Registration} />
        </Drawer.Navigator >
    );
}

export default MyDrawer;