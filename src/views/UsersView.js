import React, {Component, useState, useEffect} from "react";
import {StyleSheet, Text, View, FlatList, ActivityIndicator} from "react-native";

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
                <View style={styles.container}>
                    <FlatList style={styles.flatlist}
                        data={this.state.dataSource}
                        keyExtractor={(x, i) => i}
                        renderItem={({item}) =>
                            <View style={styles.item}>
                              <Text>{item.username}</Text>
                              <Text>{item.email}</Text>
                            </View>
                        }
                    />
                </View>
            )
        }
    }
}

const styles= StyleSheet.create({
container: {
flex: 1,
alignSelf: 'stretch',
backgroundColor: '#ffffff',
alignItems: 'center',
justifyContent: 'center'
},
item: {
flex: 1,
margin: 20,
alignSelf: 'stretch',
alignItems: 'center',
justifyContent: 'center',
borderBottomWidth: 1,
borderBottomColor: '#eee'
},
flatlist: {
alignSelf: 'stretch',

}
})

