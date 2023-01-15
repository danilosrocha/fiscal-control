import React from "react";
import styled from 'styled-components/native';
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const HeaderArea = styled.TouchableOpacity`
    height: 100px;
    width: 100%;
    background-color: #fff;
    justify-content: center;
    border-color: ${({ theme }) => theme.colors.textColor};
    border-width: 0.2px;
`

export const ImageProfile = styled.Image`
    width: 100px;
    height: 100px;
    margin: 10px;

`;

const Header = () => {
    const navigation = useNavigation();

    const handleHome = () => {
        navigation.navigate("Home")
    }
    return (

        <>
            <StatusBar />
            < HeaderArea onPress={() => handleHome()}>
                <ImageProfile source={require("../assets/pcdf-logo.png")} />
            </HeaderArea >
        </>


    );
};

export default Header;