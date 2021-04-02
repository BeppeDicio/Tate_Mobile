import React, {Component, useState, useEffect} from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    SafeAreaView, Button, Image, TouchableOpacity
} from "react-native";
import {BottomPopUp} from "../components/BottomPopUp";
import {SimpleLineIcons} from "@expo/vector-icons";

function Item({ item }) {
    const defaultPaymentObj = item.PaymentMethods.find(findDefaultPayment)
    return (
        <View style={styles.listItem}>
            <Image source={require('../resources/gamer.png')}  style={{width:60, height:60,borderRadius:30}} />
            <View style={{alignItems:"center",flex:1}}>
                <Text style={{fontWeight:"bold"}}>{item.username}</Text>
                <Text>{defaultPaymentObj.type}</Text>
            </View>
            <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:"green"}}>Call</Text>
            </TouchableOpacity>
        </View>
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
        }
    }

    componentDidMount() {
        this.fetchData()
            .catch((error) => {
                console.log(`Error: ${error}`)
            });
    }

    fetchData = async () => {
        const response = await fetch('https://mz37bp4toc.execute-api.eu-west-1.amazonaws.com/challenge/users');
        const json = await response.json();
        this.setState({
            isLoading: false,
            dataSource: json.Users
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
                            <View style={styles.headerButtonBox}>
                                <TouchableOpacity onPress={onShowPopup} style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
                                    <Text>Filtri</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <FlatList style={styles.flatl}
                            data={this.state.dataSource}
                            keyExtractor={(x, i) => i}
                            renderItem={({item}) => <Item item={item}/>}
                        />
                        <BottomPopUp
                            title="Filters"
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
    tabBarIcon: <SimpleLineIcons name="people" size={18} />
};

const styles= StyleSheet.create({
    container: {
        /*flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#ffffff',*/
        flex: 1,
        backgroundColor: '#F7F7F7',
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
        width:"80%",
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        borderRadius:5
    }
})

