import { Box, Button, Flex, FormControl, Input, Stack, View } from 'native-base';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import dark from '../styles/themes/dark';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../../firebase';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { IconLoading } from '../screens/List/styles';
import PieChart from 'react-native-chart-kit/dist/PieChart';

const Container = styled.SafeAreaView`
    width: 100%;
    height:100%;
    margin: 10px;
    align-items: center;
    `
const InputArea = styled.View`
    width: 100%;
    height: 45px;
    border-radius: 1px;
    border-width: 0.1px;
    flex-direction: row;
    align-items: center;
    `;

const Text = styled.Text`
    flex: 1;
    font-size: 14px;
    margin-left: 10px;
    `;

const ViewInput = ({ valueRecive }) => {
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const id = auth.currentUser?.uid
    const handleNavigaton = () => {
        navigation.goBack('MyDrawer')
    }

    const handleUpdate = async () => {
        const docRef = doc(db, "users", id);
        Alert.alert('Sucesso!', 'Valor atualizado')
        const docSnap = await getDoc(docRef);
        await updateDoc(docRef, {
            valorUtilizado: valueRecive,
            valorRecebido: valorUtilizado,
        });
        handleNavigaton()
        setValorUtil(docSnap.data().valorRecebido)
    }

    const getUser = async () => {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        setValorUtil(docSnap.data().valorRecebido)
        setLoading(false)
    }

    const [valorUtilizado, setValorUtil] = useState()
    const valorFormatado = `R$ ${valorUtilizado},00`

    useEffect(() => {
        getUser()
        setLoading(true)
    }, []);


    return (
        <Container >
            {loading ? (<IconLoading size="large" color="black" />) :
                <FormControl isRequired g={5}>
                    <Stack mx="4">
                        <FormControl.Label>Valor recebido</FormControl.Label>
                        <InputArea>
                            <Text>{`R$ ${valueRecive},00`}</Text>
                        </InputArea>
                    </Stack>

                    <Stack mx="4" marginTop={5}>
                        <FormControl.Label>Valor utilizado</FormControl.Label>
                        <Input fontSize={14} value={(valorUtilizado)} keyboardType={"numeric"} onChangeText={t => setValorUtil(t)} />
                    </Stack>

                    <Button background={dark.colors.primary} mx="5" marginTop={5} marginBottom={5} onPress={() => handleUpdate()}>Atualizar gastos</Button>
                </FormControl>
            }
        </Container>
    );
}

export default ViewInput;