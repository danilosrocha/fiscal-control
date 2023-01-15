import React, { useEffect, useState } from "react";
import { FlatList, IconLoading } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { Button, ScrollView } from "native-base";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider } from "native-base";
import ItemList from "./item";
import ItemEmpty from "./itemEmpty";

const ListGuests = () => {

    const navigation = useNavigation();
    const idUser = auth.currentUser?.uid
    const renderItem = ({ item }) => <ItemList item={item} />;
    const renderEmpty = () => <ItemEmpty />;
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(false);

    const getuser = async () => {
        const userRef = doc(db, "users", idUser);
        const docSnap = await getDoc(userRef);

        if (docSnap.data()?.convidados) {
            let temporyAmount = []

            docSnap.data().convidados.forEach((pessoa) => {
                if (pessoa.status == true) {
                    temporyAmount.push(pessoa)
                }
            })
            setGuests(temporyAmount)
        }
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        getuser()
    }, []);

    const columns = 3
    function createRows(data, columns) {
        if (data) {
            const rows = Math.floor(data.length / columns);
            let lastRowElements = data.length - rows * columns;
        }
        return data; // [F]
    }
    return (
        <Box alignItems="center">
            {loading ? (<IconLoading size="large" color="black" />) : <FlatList
                nestedScrollEnabled
                data={createRows(guests, columns)}
                refreshing={true}
                renderItem={renderItem}
                contentContainerStyle={{ marginHorizontal: 1 }}
                numColumns={columns}
                ListEmptyComponent={renderEmpty}
            />}

        </Box >


    )
};

export default ListGuests;