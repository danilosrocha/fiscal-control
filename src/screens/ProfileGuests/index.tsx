import React, { useEffect, useState } from "react";
import { ImageProfile } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../../firebase";
import { Button, CheckIcon, Checkbox, FormControl, Input, ScrollView, Select } from "native-base";
import { Box, Stack } from "native-base";
import dark from "../../styles/themes/dark";
import { arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";

const ProfileGuest = (object) => {
    const navigation = useNavigation();

    const initalName = object.route.params.guests.nome
    const initalParcel = object.route.params.guests.parcelas
    const initalValue = object.route.params.guests.valorIngresso
    const initialParcelasPagas = object.route.params.guests.parcelasPagas
    const initialStatusParcela = object.route.params.guests.statusParcela
    const initialValorParcela = object.route.params.guests.valorParcela
    const status = object.route.params.guests.status

    const [nome, setNomeField] = useState(initalName);
    const [valorIngresso, setValorIngressoField] = useState(initalValue);
    const [parcelas, setParcelasField] = useState(initalParcel);
    const [valorParcela, setValorParcela] = useState(initialValorParcela);
    const [groupValue, setGroupValue] = useState(initialStatusParcela);
    const [componentCheck, setComponentCheck] = useState();

    const id = auth.currentUser?.uid

    const handleNavigaton = () => {
        navigation.navigate('MyDrawer')
    }

    const createComponent = () => {
        let list = []
        let i = 0

        while (i != parcelas) {
            let Title = ""
            if (i == 0) {
                Title = "Primeira parcela  "
            } else if (i == 1) {
                Title = "Segunda parcela  "
            } else if (i == 2) {
                Title = "Terceira parcela   "
            } else if (i == 3) {
                Title = "Quarta parcela     "
            } else if (i == 4) {
                Title = "Quinta parcela     "
            } else if (i == 5) {
                Title = "Sexta parcela       "
            }
            if (Title != "") {
                list.push(<Checkbox value={`${i}`} my="1" >
                    {`${Title} --> R$ ${valorParcela},00`
                    }
                </Checkbox >)
            }
            i++
        }
        setComponentCheck(list)
    }

    const handleUpdate = async () => {
        try {
            if ((nome && parcelas && valorIngresso) != "") {
                const initialDocRef = doc(db, "users", id);
                const dataInitial = {
                    nome: initalName,
                    parcelas: initalParcel,
                    valorIngresso: initalValue,
                    parcelasPagas: initialParcelasPagas,
                    statusParcela: initialStatusParcela,
                    valorParcela,
                    status,
                }
                const result = await updateDoc(initialDocRef, {
                    convidados: arrayRemove(dataInitial)
                });
                // console.log(result);

                let parcelasPagas = groupValue.length
                Alert.alert('Sucesso!', 'Cadastro atualizado')
                let newValue = (valorIngresso / parcelas)
                setValorParcela(newValue)
                const data = {
                    nome,
                    parcelas,
                    statusParcela: groupValue,
                    valorIngresso,
                    parcelasPagas,
                    valorParcela: newValue,
                    status,
                }
                const docRef = doc(db, "users", id);
                await updateDoc(docRef, {
                    convidados: arrayUnion(data)
                });
                handleNavigaton()
                // }

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

    const handleDelete = async () => {
        try {
            const initialDocRef = doc(db, "users", id);
            const dataInitial = {
                nome: initalName,
                parcelas: initalParcel,
                valorIngresso: initalValue,
                parcelasPagas: initialParcelasPagas,
                statusParcela: initialStatusParcela,
                valorParcela,
                status,
            }
            const result = await updateDoc(initialDocRef, {
                convidados: arrayRemove(dataInitial)
            });

            Alert.alert('Sucesso!', 'Convidado retirado!')

            handleNavigaton()

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        createComponent()
    }, []);

    // console.log(initalValue);

    return (
        <ScrollView>
            <Box alignItems="center">
                <ImageProfile source={require("../../assets/person.png")} />
                <Box w="100%" m={5} >
                    <FormControl isRequired g={5}>
                        <Stack mx="4">
                            <FormControl.Label>Nome do convidado</FormControl.Label>
                            <Input fontSize={14} value={nome} type="text" placeholder="Digite o nome" onChangeText={t => setNomeField(t)} />
                        </Stack>

                        <Stack mx="4" marginTop={5}>
                            <FormControl.Label>Valor do convite</FormControl.Label>
                            <Input fontSize={14} value={`${valorIngresso}`} keyboardType={"numeric"} placeholder="Digite o nome" onChangeText={t => {
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


                        <Stack mx="6" marginTop={5}>
                            <Checkbox.Group colorScheme="green" defaultValue={groupValue} accessibilityLabel="pick an item" onChange={values => {
                                setGroupValue(values || []);
                            }}>
                                {componentCheck}
                                {/* <Checkbox value="1" my="1">
                                    {`Primeira parcela    -->  R$ ${valorParcela},00`}
                                </Checkbox>
                                <Checkbox value="2" my="1">
                                    {`Segunda parcela    -->  R$ ${valorParcela},00`}
                                </Checkbox>
                                <Checkbox value="3" my="1">
                                    {`Terceira parcela     -->  R$ ${valorParcela},00`}
                                </Checkbox>
                                <Checkbox value="4" my="1">
                                    {`Quarta parcela       -->  R$ ${valorParcela},00`}
                                </Checkbox>
                                <Checkbox value="5" my="1">
                                    {`Quinta parcela       -->  R$ ${valorParcela},00`}
                                </Checkbox>
                                <Checkbox value="6" my="1">
                                    {`Sexta parcela        -->    R$ ${valorParcela},00`}
                                </Checkbox> */}
                            </Checkbox.Group>
                        </Stack>

                    </FormControl>

                    <Button background={dark.colors.primary} mx="5" marginTop={5} onPress={() => handleUpdate()}>Atualizar cadastro</Button>
                    <Button background={dark.colors.secondary} mx="5" marginTop={5} onPress={() => handleDelete()}>Deletar convidado</Button>
                </Box>
            </Box >
        </ScrollView>
    )
};

export default ProfileGuest;