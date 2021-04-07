import React, {Component} from "react";
import {StyleSheet, Text, View, ActivityIndicator, SafeAreaView, Button, Image, TouchableOpacity} from "react-native";
import {Header} from "react-native-elements";
import {Entypo, MaterialIcons} from "@expo/vector-icons";

export default class UserDetailView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {item} = this.props.navigation.state.params;
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
                </View>
            </SafeAreaView>
        )
    }
}

const styles= StyleSheet.create({
    firstBlock: {

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
    userImage: {
        margin: 20,
        width:80,
        height:80,
        borderRadius:45
    }
})
