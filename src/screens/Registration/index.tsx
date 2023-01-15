import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import styled from 'styled-components/native';
import { Box, Fab, Select, Button, CheckIcon, FormControl, Stack, Input, ScrollView } from "native-base";
import dark from "../../styles/themes/dark";
import { arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";

const ImageProfile = styled.Image`
    width: 250px;
    height: 235px;
`;

const Registration = () => {

    const navigation = useNavigation();
    const [nome, setNomeField] = useState("");
    const [valorIngresso, setValorIngressoField] = useState("");
    const [parcelas, setParcelasField] = useState("");
    const valorParcela = Math.round((Number(valorIngresso) / parcelas))
    const id = auth.currentUser?.uid
    const handleNavigaton = () => {
        navigation.goBack('MyDrawer')
    }
    const handleRegister = async () => {
        const statusParcela = []

        try {
            if ((nome && parcelas && valorIngresso) != "") {
                Alert.alert('Sucesso!', 'Convidado cadastrado')
                const data = {
                    nome,
                    parcelas,
                    valorIngresso,
                    valorParcela,
                    statusParcela,
                    parcelasPagas: 0,
                    status: true
                }
                const docRef = doc(db, "users", id);
                await updateDoc(docRef, {
                    convidados: arrayUnion(data)
                });
                handleNavigaton()
                setNomeField("")
                setValorIngressoField("")
                setParcelasField("")
            } else {
                Alert.alert('Opss', 'Preencha todos os dados!', [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ScrollView>
            <Box alignItems="center">
                <ImageProfile source={require("../../assets/personal.png")} />
                <Box w="100%" m={5} >
                    <FormControl isRequired g={5}>
                        <Stack mx="4">
                            <FormControl.Label>Nome do convidado</FormControl.Label>
                            <Input fontSize={14} value={nome} type="text" placeholder="Digite o nome" onChangeText={t => setNomeField(t)} />
                        </Stack>
                        <Stack mx="4" marginTop={5}>
                            <FormControl.Label>Valor do ingresso</FormControl.Label>
                            <Input fontSize={14} value={valorIngresso} keyboardType={"numeric"} plete="true" type="number" placeholder="Digite o valor" onChangeText={t => {
                                const valorNumerico = Number(t)
                                setValorIngressoField(valorNumerico)
                            }} />
                        </Stack>
                        <Stack mx="4" marginTop={5}>
                            <FormControl.Label>Número de parcelas</FormControl.Label>
                            <Select minWidth="200" accessibilityLabel="Selecione o número de parcelas" placeholder="Selecione o número de parcelas" _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size={4} />
                            }} mt="1"
                                selectedValue={parcelas}
                                onValueChange={(itemValue) => setParcelasField(itemValue)}>
                                <Select.Item label="Uma parcela" value="1" />
                                <Select.Item label="Duas parcelas" value="2" />
                                <Select.Item label="Três parcelas" value="3" />
                                <Select.Item label="Quatro parcelas" value="4" />
                                <Select.Item label="Cinco parcelas" value="5" />
                                <Select.Item label="Seis parcelas" value="6" />
                            </Select>
                        </Stack>

                    </FormControl>
                    <Button background={dark.colors.primary} mx="5" marginTop={10} onPress={() => handleRegister()}>Cadastrar convidado</Button>
                </Box>
            </Box >
        </ScrollView>

    );
};

export default Registration
