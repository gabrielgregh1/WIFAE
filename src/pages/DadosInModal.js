/*Modules*/
import React, {
    useState,
    useEffect
} from "react"
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity
} from "react-native"
import posed from "react-native-pose"
import Icon from "react-native-vector-icons/Ionicons"
/*Components*/
import { HeaderModal } from "../components/Headers"
import fonts from "../styles/fonts"
import colors from "../styles/colors"

const Modal = posed.View(
    {
        open: { 
            x: 0, 
            y: 0,
            opacity:1,
            transition: { duration: 500 }
        },
        closed: { 
            x: 0, 
            y: 900,
            opacity:0,
            transition: { duration: 800 }
        }
    }
)

export default function DadosInModal(props){
    const [repository, setRepository] = useState(
        {
            isVisible:false,
            dadosLista:[
                {
                    key:'1',
                    dados:'Estágio',
                    check:0
                },
                {
                    key:'2',
                    dados:'Festas',
                    check:0
                },
                {
                    key:'3',
                    dados:'Engenharia',
                    check:0
                },
                {
                    key:'4',
                    dados:'Alcool',
                    check:0
                },
                {
                    key:'5',
                    dados:'Administração',
                    check:0
                },
                {
                    key:'6',
                    dados:'Medicina',
                    check:0
                }
            ]
        }
    )

    function updateEscolha(keySelec){
        let dadosLista = repository.dadosLista

        dadosLista = dadosLista.map((value, key) => 
            {
                if(value.key == keySelec){
                    return{
                        key:value.key,
                        dados:value.dados,
                        check:!value.check
                    }
                }else{
                    return value
                }
            }
        )

        setRepository(
            {
                ...repository,
                dadosLista
            }
        )
    }

    return(
        <Modal 
            style={styles.conteiner}
            pose={props.isVisible ? 'open' : 'closed'}
        >
            <HeaderModal
                title='Escolha seus interesses'
                onPress={props.onClose}
            />
            <View style={{marginTop:20}}>
                <FlatList
                    showsHorizontalScrollIndicator={false} 
                    data={props.dadosLista}
                    extraData={props.dadosLista}
                    renderItem={({item}) =>
                        <TouchableOpacity
                            onPress={() => props.updateEscolha(item.key)}
                        >
                            <View style={styles.conteinerEscolha}> 
                                <Text style={styles.label}>{item.dados}</Text> 
                                {item.check ==1 && 
                                    <Icon
                                        name='md-checkmark'
                                        color={colors.primary}
                                        size={16}
                                        style={{marginTop:'auto', marginBottom:'auto'}}
                                    />

                                }
                            </View> 
                        </TouchableOpacity>
                    }
                />
            </View>
        </Modal>
    )
} 

const styles = StyleSheet.create(
    {
        conteiner:{
            marginTop:0,
            marginLeft:0,
            width:"100%",
            height:"100%",
            position:"absolute",
            backgroundColor:"#000"
        },
        conteinerEscolha:{
            height:60,
            width:'100%',
            paddingLeft:15,
            paddingRight:15,
            borderTopWidth:.2,
            borderBottomWidth:.2,
            flexDirection:'row',
            borderColor:'#F5F5F5',
            justifyContent:'space-between',
        },
        label:{
            fontSize:16,
            color:"#FFF",
            marginTop:'auto',
            marginBottom:'auto',
            fontFamily:fonts.regular
        }
    }
)