import {Image, StyleSheet, Text, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import React from "react";
import {findDefaultPayment} from "../utility/userUtilitys"

export function Item({ item }) {
    const defaultPaymentObj = item.PaymentMethods.find(findDefaultPayment)

    return (
        <View style={styles.listItem}>
            <Image source={require('../resources/gamer.png')} style={{width:60, height:60,borderRadius:30}} />
            <View style={{alignItems:"center",flex:1, justifyContent:"center", marginLeft: 5, marginRight: 5}}>
                <Text style={{fontWeight:"bold"}}>{item.username}</Text>
                <Text style={{textAlign: 'center'}}>{defaultPaymentObj.type}</Text>
            </View>
            <View style={{height:60,width:60, justifyContent:"center",alignItems:"center"}}>
                <AntDesign
                    name="rightcircleo"
                    size={24}
                    color="#707070"
                />
            </View>
        </View>
    );
}
const styles= StyleSheet.create({
    listItem: {
        margin: 10,
        padding: 10,
        backgroundColor: "#FFF",
        width: "85%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5
    }
});

/*
    Anche in questo caso creare Item come un componente generico sarebbe stato utile, dato che poi nella detail view
    ho ricreato item custom per quella situazione. Con un piccolo re-work potrebbe essere generalizzato e quindi avere
    un componente Item da riusare nelle varie FlatList
 */
