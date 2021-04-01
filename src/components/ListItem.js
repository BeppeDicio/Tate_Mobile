import React, { Component } from "react";
import {Text} from "react-native";

class ListItem extends Component {
    render() {
        return(
            <Text>
                {this.props.user.username}
            </Text>
        )
    }
}

export default ListItem;
