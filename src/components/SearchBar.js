import React from 'react'
import {View, StyleSheet, TextInput} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({term, onTermChange, onTermSubmit}) => {

    return (
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
                placeholder='Search'
                value={term}
                onChangeText={ newTerm => onTermChange(newTerm)}
                onEndEditing={() => onTermSubmit()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#F0EEEE',
        height: 35,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10
    },
    iconStyle: {
        flex: 1,
        fontSize: 20,
        alignSelf: 'center',
        margin: 5,
        marginLeft: 15
    },
    inputStyle: {
        flex: 9,
        fontSize: 18
    }
});

export default SearchBar;
