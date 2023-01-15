import React, { useEffect, useState } from "react";
import { FlatList, IconLoading } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { Button, ScrollView } from "native-base";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider } from "native-base";
import ViewInput from "../../components/ViewInput";
import { ProgressChart } from "react-native-chart-kit";

const FinancialControl = () => {

    const navigation = useNavigation();
    const idUser = auth.currentUser?.uid
    const [valueRecive, setValueRecive] = useState([]);
    const [loading, setLoading] = useState(false);

    const getuser = async () => {
        const userRef = doc(db, "users", idUser);
        const docSnap = await getDoc(userRef);

        if (docSnap.data()?.convidados) {
            let temporyAmount = []

            docSnap.data().convidados.forEach((pessoa) => {
                const valorRecebido = pessoa.parcelasPagas * pessoa.valorParcela
                temporyAmount.push(valorRecebido)
                console.log(valorRecebido);

            })
            let sum = 0;

            for (let i = 0; i < temporyAmount.length; i++) {
                sum += temporyAmount[i];
            }

            setValueRecive(sum)
        }
        setLoading(false)
    }






    useEffect(() => {
        setLoading(true)
        getuser()
    }, []);

    return (
        <Box alignItems="center">
            {loading ? (<IconLoading size="large" color="black" />) : <ViewInput valueRecive={valueRecive} />}
        </Box >

    )
};

export default FinancialControl;

