import React, { useEffect, useState } from "react";
import { Container, ViewArea, ImageProfile, HandleButton, HandleButtonText } from "./styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";
import InputModel from "../../components/InputModel.";

const SignIn = () => {

    const navigation = useNavigation();
    const [email, setEmailField] = useState('');
    const [password, setPasswordField] = useState('');

    const handleSignClick = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(` >>>>> Logado com sucesso`);
                navigation.navigate('MyDrawer')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert("Usuário incorreto")
            });
    };

    useEffect(() => {
        setEmailField("daniel@gmail.com")
        setPasswordField("123456")
    }, [])

    return (
        <Container>
            <ViewArea>
                <ImageProfile source={require("../../assets/pcdf.png")} />
                <InputModel
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChangeText={t => setEmailField(t)}
                />
                <InputModel
                    placeholder="Digite sua senha"
                    password={true}
                    value={password}
                    onChangeText={t => setPasswordField(t)}
                />
                <HandleButton onPress={() => handleSignClick()}>
                    <HandleButtonText>Entrar</HandleButtonText>
                </HandleButton>
            </ViewArea>
        </Container>
    );
};

export default SignIn;