import React from "react";
import styled from "styled-components/native";

const ButtonArea = styled.View`
    align-items: center;    
    flex-grow: 1
    margin: 10px;
    padding: 20px
    border-radius: 5px;
`;

const ButtonText = styled.Text`
    font-size: 22px;
    font-weight: bold;
`;

const ItemEmpty = () => {
    return (

        <ButtonArea>
            <ButtonText>Cadastre convidados</ButtonText>
        </ButtonArea>

    );
};

export default ItemEmpty;