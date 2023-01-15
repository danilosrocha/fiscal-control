import React, { useEffect, useState } from "react";
import { Container, ViewArea, ImageProfile, HandleButton, HandleButtonText } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { Button, ScrollView } from "native-base";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider } from "native-base";
import dark from "../../styles/themes/dark";

const Home = () => {

    const navigation = useNavigation();

    const handleClickList = () => {
        navigation.navigate("ListGuests")
    }

    const handleClickControl = () => {
        navigation.navigate("FinancialControl")
    }

    return (
        <ScrollView>
            <Box alignItems="center">
                <Box marginTop={10} rounded="lg" overflow="hidden" borderWidth="1" borderColor="coolGray.400" >
                    <Box>
                        <HandleButton onPress={() => handleClickList()}>
                            <ImageProfile source={require("../../assets/checklist.png")} />
                        </HandleButton>
                        <Center bg={`${dark.colors.primary}`} _text={{
                            color: "warmGray.50",
                            fontWeight: "700",
                            fontSize: "xs"
                        }} position="absolute" bottom="0" px="3" py="1.5">
                            LISTA DE CONVIDADOS
                        </Center>
                    </Box>
                </Box>
                <Box marginTop={10} rounded="lg" overflow="hidden" borderColor="coolGray.400" borderWidth="1" >
                    <Box>
                        <HandleButton onPress={() => handleClickControl()}>
                            <ImageProfile source={require("../../assets/finance.png")} />
                        </HandleButton>
                        <Center bg={`${dark.colors.primary}`} _text={{
                            color: "warmGray.50",
                            fontWeight: "700",
                            fontSize: "xs"
                        }} position="absolute" bottom="0" px="3" py="1.5">
                            CONTROLE FINANCEIRO
                        </Center>
                    </Box>
                </Box>
            </Box >
        </ScrollView>
    )
};

export default Home;