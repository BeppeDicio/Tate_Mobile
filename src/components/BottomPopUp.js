import React, {Component} from "react";
import {Dimensions, Modal, Text, TouchableWithoutFeedback, View} from "react-native";

const deviceHeight = Dimensions.get("window").height
export class BottomPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    show = () => {
        this.setState({show: true})
    }

    close = () => {
        this.setState({show: false})
    }

    renderOutsideTouchable(onTouch) {
        const view = <View style={{flex: 1, width: '100%'}}/>

        if(!onTouch) return view

        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{flex: 1, width: '100%'}}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    renderTitle = () => {
        const {title} = this.props
        return (
            <View>
                <Text style={{
                    color: '#182E44',
                    fontSize: 20,
                    fontWeight: '500',
                    margin: 15
                }}>
                    {title}
                </Text>
            </View>
        )
    }

    renderContent = () => {
        return (
            <View>
                <Text>
                    This is the content of the card view on the device that post upode_modules/react-native/Libraries/WebSocket/WebSocket.js:231:8 in _eventEmitter.addListener$argument_1
                    - node_modules/react-native/Libraries/vendor/emitter/EventEmitter.js:189:10 in emit
                    - node_modules/react-native/Libraries/BatchedBridge/MessageQueue.js:416:4 in __callFunction
                    - node_modules/react-native/Libraries/BatchedBridge/MessageQueue.js:109:6 in __guard$argument_0
                    - node_modules/react-native/Libraries/BatchedBridge/MessageQueue.js:364:10 in __guard
                    - node_modules/react-native/Libraries/BatchedBridge/MessageQueue.js
                </Text>
            </View>
        )
    }

    render() {
        let {show} = this.state
        const {onTouchOutside, title} = this.props


        return(
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={this.close}
            >
                <View style={{flex: 1, backgroundColor: '#000000AA', justifyContent:'flex-end'}}>
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={{
                        backgroundColor: '#ffffff',
                        width: '100%',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                        paddingHorizontal: 10,
                        maxHeight: deviceHeight * 0.4
                    }}>
                        {this.renderTitle()}
                        {this.renderContent()}
                    </View>
                </View>
            </Modal>
        )
    }
}
