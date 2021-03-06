import React, {Component} from "react";
import {
    StyleSheet, Text, View, SafeAreaView,
    Image, TouchableOpacity, FlatList
} from "react-native";
import {Entypo} from "@expo/vector-icons";

export default class UserDetailView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {item} = this.props.navigation.state.params;
        const paymentList = item.PaymentMethods;

        paymentList.sort(function(x, y) {
            // true values first
            return (y.default - x.default);
        });

        return(
            <SafeAreaView>
                <View style={styles.firstBlock}>
                    <Image
                        source={require('../resources/gamer.png')}
                        style={styles.userImage}
                    />
                    <View style={styles.nameBox}>
                        <Text style={styles.nameText}>{item.name} {item.surname}</Text>
                        <Text style={styles.usernameText}>{item.username}</Text>
                    </View>
                </View>
                <FlatList style={styles.flatl}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={paymentList}
                  keyExtractor={(x, i) => i}
                  renderItem={({item}) => {
                      return (
                          <Item item={item}/>
                      )
                  }}
                />
            </SafeAreaView>
        )
    }
}

function Item({ item }) {

    let defaultString = "";
    if(item.default){
        defaultString = "default payment"
    }

    return (
        <View style={styles.listItem}>
            <View style={{alignItems:"center",flex:1, justifyContent:"center"}}>
                <Text style={styles.cardTypeText}>{item.type}</Text>
                <Text style={styles.defaultCardText}>**** **** **** {item.ending_with}</Text>
                <Text style={styles.defaultCardText}>{defaultString}</Text>
            </View>
        </View>
    );
}

const styles= StyleSheet.create({
    header: {
        height: 50,
        marginTop: 15,
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
        fontSize: 20,
        textAlign: 'center'
    },
    firstBlock: {
        flexDirection: 'row',
        height: 120,
        alignSelf: 'stretch',
    },
    userImage: {
        marginLeft: 20,
        width:80,
        height:80,
        borderRadius:45,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    nameBox: {
        alignSelf: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    nameText: {
        fontSize: 25,
    },
    usernameText: {
        fontSize: 13,
    },
    cardTypeText: {
        margin: 5,
        textAlign: 'center',
        fontSize: 15,
        alignSelf: 'center',
        color:'#ffffff'
    },
    defaultCardText: {
        margin: 5,
        textAlign: 'center',
        fontSize: 9,
        alignSelf: 'center',
        color:'#ffffff'
    },
    flatl: {
      marginTop: 60,
    },
    listItem:{
        margin: 10,
        padding:10,
        height: 100,
        width: 180,
        borderRadius:15,
        backgroundColor:"#4a566b",
        alignSelf:"center",
        flexDirection:"row",
    },
})

/*
    La pagina ?? un po vuota, con pi?? tempo avrei forse cercato una soluzione migliore per presentare i dati richiesti
 */
