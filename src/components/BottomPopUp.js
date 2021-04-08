import React, {Component} from "react";
import { Dimensions, Modal, Text, TouchableWithoutFeedback, View} from "react-native";
import {ButtonGroup, Button} from "react-native-elements";

/*
    **** ATTENZIONE ****
    Al momento i filtri sono finti, nel senso che i bottoni non fanno nessuna azione. Questo perchè facendo via via le richieste
    delle nuove pagine degli utenti, non è molto comodo filtrarli o ordinarli. Per fare ciò sarebbe a mio avviso più corretto
    creare una chiamata API che ti restituisca un elenco già ordinato come vuole l'utente, passando i vari parameri nella richiasta.
    L'altrernativa sarebbe fare una iterazione scaricando tutte le pagine esistenti e poi applicare i vari filtri su quella lista.
    Questo è un grande spreco a mio avviso perchè l'utente scarica una quantità di dati che quasi sicuramente non gli serviranno.
    L'ordinare mano mano che si scaricano i dati è un errore che potrebbe turbare l'utente, questo perchè se io ordino ad esempio in ordine
    alfabetico la prima pagina, quando scarico la seconda pagina devo aggiornare la lista e riordinarla, e questo comporta
    uno stress all'utente, perchè o gli vengono aggiunti nuove righe sia sopra che sotto o un azione lo riporta in cima alla lista
    e lui è costretto a rincominciare da capo.
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
                    onPress={this.close}
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
