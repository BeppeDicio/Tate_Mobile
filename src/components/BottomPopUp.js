import React, {Component} from "react";
import { Dimensions, Modal, Text, TouchableWithoutFeedback, View} from "react-native";
import {ButtonGroup, Button} from "react-native-elements";

const deviceHeight = Dimensions.get("window").height
export class BottomPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            selectedIndex: 0
        }
        this.updateIndex = this.updateIndex.bind(this)
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
                    fontSize: 25,
                    fontWeight: '500',
                    marginTop: 25,
                    margin: 15
                }}>
                    {title}
                </Text>
            </View>
        )
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }

    renderContent = () => {
        const buttons = ['Username', 'Email', 'Pagamento']
        const { selectedIndex } = this.state

        return (
            <View style={{
                marginBottom: 60
            }}>
                <Text style={{
                    color: '#182E44',
                    fontSize: 18,
                    fontWeight: '500',
                    margin: 15
                }}>Filtra per:</Text>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{height: 30}}
                />
                <Button
                    title="Applica"
                    type="solid"
                    style={{marginTop: 50, marginLeft: 15, marginRight: 15}}
                />
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
