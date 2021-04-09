import React, {Component} from "react";
import { Dimensions, Modal, Text, TouchableWithoutFeedback, View} from "react-native";
import {ButtonGroup, Button} from "react-native-elements";

/*
    Come descritto anche nella challenge, la via più corretta sarebbe applicare i vari filtri con delle API,
    questo perchè come succede in questo caso, scrollando verso il basso vengono scaricate nuove pagine e
    viene riapplicato automaticamente l'ordinamento, l'utente si trova i nuovi dati scaricati un po sopra e un
    po sotto al suo attuale punto di scroll.
    Andrebbero gestiti meglio la gestione delle azioni da parte di eventi esterni dei filtri. Come ad esempio ho
    impostato che quando noi applichiamo un filtro ma poi cerchiamo per email, il filtro viene annullato, questo perchè potrebbe
    essere più comodo per l'utente. Un'altra possibile soluzione sarebbe stato la gestione contemporanea tra filtro e ricerca.
 */

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
        const {mainState} = this.props;
        this.getOrderByManager(mainState);
        this.setState({show: true});
    }

    close = () => {
        this.setState({show: false});
    }

    onApply = () => {
        const {mainState} = this.props;
        this.setOrderByManager(this.state.selectedIndex, mainState);
        this.setState({show: false});
    }

    getOrderByManager = (mainState) => {
        if (mainState.state.sortByUsername) {
            this.setState({
                selectedIndex: 1
            })
        } else if (mainState.state.sortByEmail) {
            this.setState({
                selectedIndex: 2
            })
        } else if (mainState.state.sortByPayment) {
            this.setState({
                selectedIndex: 3
            })
        } else {
            this.setState({
                selectedIndex: 0
            })
        }
    }

    setOrderByManager = (index, mainState) => {
        switch (index) {
            case 1:
                mainState.setState({
                    sortByUsername: true,
                    sortByEmail: false,
                    sortByPayment: false
                })
                break;
            case 2:
                mainState.setState({
                    sortByUsername: false,
                    sortByEmail: true,
                    sortByPayment: false
                })
                break;
            case 3:
                mainState.setState({
                    sortByUsername: false,
                    sortByEmail: false,
                    sortByPayment: true
                })
                break;
            default:
                mainState.setState({
                    sortByUsername: false,
                    sortByEmail: false,
                    sortByPayment: false
                })
                break;
        }
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
        const buttons = ['Nessuno','Username', 'Email', 'Pagamento']
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
                <View style={{height: 35}}></View>
                <Button
                    title="Applica"
                    type="solid"
                    style={{marginLeft: 15, marginRight: 15}}
                    onPress={this.onApply}
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

/*
    Avendo più tempo sarebbe utile generalizzare questo componente così da poterlo usare in più modi e in più viewcontrollers
    semplicemente passandogli i parametri necessari per costruire il contenuto.
 */
