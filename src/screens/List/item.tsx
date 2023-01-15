import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import dark from "../../styles/themes/dark";

const ButtonArea = styled.TouchableOpacity`
    align-items: center;    
    background-color: ${dark.colors.primary};
    flex-grow: 1
    width: 1px;
    margin: 10px;
    padding: 20px
    border-radius: 5px;
`;

const ButtonText = styled.Text`
    font-size: 16px;
    margin-top: 5px;
`;

const ItemList = ({ item }) => {
    const navigation = useNavigation();
    const goTo = (item) => {
        navigation.navigate("ProfileGuest", {
            guests: item,
        });
    }
    return (

        <ButtonArea onPress={() => goTo(item)}>
            <ButtonText>{item.nome}</ButtonText>
        </ButtonArea>

    );
};
export default ItemList
// onPress={() => goTo(item)}