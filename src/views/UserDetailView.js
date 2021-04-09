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
                <View style={styles.header}>
                    <View style={{flex: 1, alignSelf: 'stretch', alignItems:"flex-start"}}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('UsersView')}
                            style={{height:40,width:80, justifyContent:"center", alignItems:"center"}}>
                            <Entypo name="chevron-thin-left" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headerBox}>
                        <Text style={styles.headerText}>Utenti Attivi</Text>
                    </View>
                    <View style={styles.headerBox}>
                        <Text style={styles.headerText}></Text>
                    </View>
                </View>
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
    La navigation bar è custom, sicuramente con più tempo sarebbe stato utile fare un componente a cui passare i parametri
    e costruirla più velocemente, rendendola sicuramente più manutenibile. Alternativa sarebbe satao usare la navigation bar di sistema,
    non ho trovato il modo di riattivarla. Dato il tempo non infinito ho deciso di trovare una strada alternativa, che mi sembrava più veloce
    con la costruzione da zero.

    La pagina è un po vuota, con più tempo avrei forse cercato una soluzione migliore per presentare i dati richiesti

    ** ATTENZIONE **
    Il bottone back mi turba abbastanza, andrebbe fixato, dato che quando torna indietro non torna alla vecchia situazione
    ma ricarica la pagina. Questo è sicuramente scorretto logicamente. Ho letto che navigation.goBack() era la soluzione
    giusta ma non funziona, potrebbe dipendere da come è organizzato lo stack. In Native è un po diverso il funzionamento. Da aprofondire!

 */
