import React from 'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
    width: 80%;
    height: 40px;
    background-color: #fff;
    border-radius: 10px;
    padding-left: 10px;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
`;

const Input = styled.TextInput`
    flex: 1;
    font-size: 16px;
    margin-left: 10px;
`;

const InputModel = ({ placeholder, value, onChangeText, password }) => {
    return (
        <InputArea>
            <Input
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password}
            />
        </InputArea>
    );
}

export default InputModel;