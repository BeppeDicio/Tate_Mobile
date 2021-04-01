import React, {Component, useState, useEffect} from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    SafeAreaView, Button
} from "react-native";

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
                            <View style={styles.headerBox}>
                                <Button
                                    style={styles.headerButton}
                                    title={"Filtri"}
                                    onPress={() => console.log("Simple Button pressed")}
                                />
                            </View>
                        </View>
                        <FlatList style={styles.flatl}
                            data={this.state.dataSource}
                            keyExtractor={(x, i) => i}
                            renderItem={({item}) =>
                                <View style={styles.item}>
                                  <Text>{item.username}</Text>
                                  <Text>{item.email}</Text>
                                </View>
                            }
                        />
                    </SafeAreaView>
                </>
            )
        }
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#ffffff',
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
        borderBottomColor: '#000000',
        flexDirection: 'row',

    },
    headerBox: {
        flex: 1
    },
    headerText: {
        fontSize: 25,
        marginTop: 10,
    },
    headerButton: {
        marginTop: 10,
    }
})

