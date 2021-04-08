import React, {Component, useState, useEffect} from "react";
import {
    StyleSheet, Text, View,
    FlatList, ActivityIndicator, TextInput,
    SafeAreaView, Image, TouchableOpacity,Button
} from "react-native";
import {BottomPopUp} from "../components/BottomPopUp";
import {SimpleLineIcons} from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {fetchUsersPage} from '../services/users'
import {Input, SearchBar} from "react-native-elements";
import _ from "lodash";
import {contains} from "../utility/FilterUtility";
import { Ionicons } from '@expo/vector-icons';


function Item({ item }) {
    const defaultPaymentObj = item.PaymentMethods.find(findDefaultPayment)

    return (
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
            isRefreshing: false,
            dataSource: [],
            page: 1,
            firstLoadError: 0,
            query: "",
            fullData: [],
        }
    }

    componentDidMount() {
        this.fetchData(this.state.page)
            .catch((error) => {
                this.setState({firstLoadError: this.state.firstLoadError + 1, isLoading: false})
                console.log(`Error: ${error} || firstLoadError number: ${this.state.firstLoadError}`)
            });
    }

    reloadData = () => {
        this.setState({
                isLoading: true,
                firstLoadError: 0
            },
            () => {
                this.fetchData()
                    .catch((error) => {
                        console.log(`Error by reloadData: ${error}`)
                        this.setState({isLoading: false, firstLoadError: 1})
                    });
            })
    }

    dataRefresh = () => {
        this.setState({
                isRefreshing: true
            },
            () => {
                this.fetchData()
                    .catch((error) => {
                        console.log(`Error by refreshing: ${error}`)
                        this.setState({isRefreshing: false})
                    });
            })
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
        const response = await fetchUsersPage(this.state.page);
        const json = await response.json();

        this.setState({
            isLoading: false,
            isRefreshing: false,
            dataSource: this.state.dataSource.concat(json.Users),
            fullData: this.state.dataSource.concat(json.Users)
        });
    }

    handleSearch = (text) => {
        const formatQuery = text.toLowerCase();
        const data = _.filter(this.state.fullData, user => {
            console.log(user);
            return contains(user, formatQuery);
        });
        console.log(data);
        this.setState({query: formatQuery, dataSource: data});
    };

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
        } else if (this.state.firstLoadError === 1){
            return(
                <SafeAreaView style={styles.errorView}>
                    <View>
                        <MaterialIcons name="error-outline" size={80} color="red" style={styles.errorIcon}/>
                        <Text style={styles.errorText}>
                            Sembra che qualcosa non abbia funzionato! Riprova a caricare la pagina o passa a trovarci più tardi!
                        </Text>
                        <Button
                            title={'Ricarica pagina'}
                            onPress={this.reloadData}
                        />
                    </View>
                </SafeAreaView>
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
                        <View style={styles.backgroundStyle}>
                            <Ionicons
                                style={styles.iconStyle}
                                name="search"
                                color="black"
                                alig="center"
                            />
                            <TextInput
                                autoCorrect={false}
                                style={styles.inputStyle}
                                placeholder='Cerca Email'
                                onChangeText={this.handleSearch}
                            />
                        </View>

                        <FlatList style={styles.flatl}
                            data={this.state.dataSource}
                            keyExtractor={(item) => item.id}
                            onRefresh={this.dataRefresh}
                            refreshing={this.state.isRefreshing}
                            onEndReached={this.fetchMoreUsers}
                            onEndReachedThreshold={0.5}
                            renderItem={({item}) => {
                                return(
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('UserDView', {item})}>
                                        <Item item={item}/>
                                    </TouchableOpacity>
                                )
                            }}
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
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
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
    },
    errorView: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorIcon: {
        textAlign: 'center',
        marginBottom: 20
    },
    errorText: {
        textAlign: 'center',
        margin: 20,
    },
    backgroundStyle: {
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 15
    },
    iconStyle: {
        flex: 1,
        fontSize: 30,
        alignSelf: 'center',
        margin: 10
    },
    inputStyle: {
        flex: 9,
        fontSize: 18
    }
})

/*
    La navigation bar è custom, sicuramente con più tempo sarebbe stato utile fare un componente a cui passare i parametri
    e costruirla più velocemente e sicuramente più manutenibile. Alternativa sarebbe satao usare la navigation bar di sistema,
    non ho trovato il modo di riattivarla. Dato il tempo non infinito ho deciso di trovare una strada alternativa con la costruzione da zero.

    Nella search i primi risultati sono quelli della ricerca, se però l'elemento trovato è 1, allora si attiva la chiamata per
    caricare gli utenti della pagina successiva. Se si commenta il contenuto del metodo fetchMoreUsers la ricerca sarà come ci si aspetta.
    Il modo giusto per fare questa funzionalità sarebbe stato mte API

    Ho scelto di implementare l'infinity scroll anzichè la paginazione a pagine, perchè a mio avviso è molto più fluida e
    scaturisce un effetto Hooked maggiore che la soluzione a pagine che è un po noiosa e scomoda nella fruizione dei contenuti.

    Sicuramente con più tempo sarebbe stato utile fare un po di refactoring della classe così da renderla più pulita e manutenibile.
    Mi piace molto costruire le view a blocchi pensando se alcuni widget possono essere riusati in altre parti dell'app, così
    da riciclare più codice possibile.
 */
