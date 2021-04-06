import React, {Component, useState, useEffect} from "react";
import {
    StyleSheet, Text, View,
    FlatList, ActivityIndicator,
    SafeAreaView, Image, TouchableOpacity
} from "react-native";
import {BottomPopUp} from "../components/BottomPopUp";
import {SimpleLineIcons} from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import UserDetailView from "./UserDetailView";

function Item({ item }) {
    const defaultPaymentObj = item.PaymentMethods.find(findDefaultPayment)

    return (
        <TouchableOpacity>
        <View style={styles.listItem}>
            <Image source={require('../resources/gamer.png')} style={{width:60, height:60,borderRadius:30}} />
            <View style={{alignItems:"center",flex:1, justifyContent:"center"}}>
                <Text style={{fontWeight:"bold"}}>{item.username}</Text>
                <Text>{defaultPaymentObj.type}</Text>
            </View>
            <View style={{height:60,width:60, justifyContent:"center",alignItems:"center"}}>
                <AntDesign
                    name="rightcircleo"
                    size={24}
                    color="#707070"
                />
            </View>
        </View>
        </TouchableOpacity>
    );
}

function findDefaultPayment(paymants) {
    return paymants.default === true;
}

export default class UserView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            page: 1
        }
    }

    componentDidMount() {
        this.fetchData(this.state.page)
            .catch((error) => {
                console.log(`Error: ${error}`)
            });
    }

    fetchMoreUsers = () => {
        this.setState(
            prevState => ({
                page: prevState.page + 1,
            }),
            () => {
                this.fetchData();
            },
        );
    };

    fetchData = async () => {
        const response = await fetch(`https://mz37bp4toc.execute-api.eu-west-1.amazonaws.com/challenge/users?page=${this.state.page}`);
        const json = await response.json();

        this.setState({
            isLoading: false,
            dataSource: this.state.dataSource.concat(json.Users)
        });
    }

    render() {

        let popupRef = React.createRef();
        const onShowPopup = () => {
            popupRef.show()
        }

        const onClosePop = () => {
            popupRef.close()
        }

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator/>
                </View>
            )
        } else {
            return (
                <>
                    <SafeAreaView style={styles.container}>
                        <View style={styles.header}>
                            <View style={styles.headerBox}>
                                <Text style={styles.headerText}></Text>
                            </View>
                            <View style={styles.headerBox}>
                                <Text style={styles.headerText}>Utenti Attivi</Text>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', alignItems:"flex-end"}}>
                                <TouchableOpacity
                                    onPress={onShowPopup}
                                    style={{height:40,width:80, justifyContent:"center", alignItems:"center"}}>
                                    <Entypo name="sound-mix" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <FlatList style={styles.flatl}
                            data={this.state.dataSource}
                            keyExtractor={(x, i) => i}
                            onEndReached={this.fetchMoreUsers}
                            onEndReachedThreshold={0.5}
                            renderItem={({item}) => <Item item={item}/>}
                        />
                        <BottomPopUp
                            title="Impostazioni filtri"
                            ref={(target) => popupRef = target}
                            onTouchOutside={onClosePop}
                        />
                    </SafeAreaView>
                </>
            )
        }
    }
}

UserView.navigationOptions = {
    tabBarIcon: <SimpleLineIcons name="people" size={18} color="#4CA2FF"/>
};

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop:60,
    },
    item: {
        height: 80,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    flatl: {
        alignSelf: 'stretch',
        backgroundColor: '#F7F7F7',
    },
    header: {
        height: 60,
        borderBottomWidth: 0.5,
        flexDirection: 'row',

    },
    headerBox: {
        flex: 1,
        marginTop: 5
    },
    headerButtonBox: {
        flex: 1
    },
    headerText: {
        fontSize: 25,
    },
    headerButton: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    listItem:{
        margin:10,
        padding:10,
        backgroundColor:"#FFF",
        width:"85%",
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        borderRadius:5
    }
})
