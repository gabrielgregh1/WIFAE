/*Modules*/
import React, {
    useState
} from "react"
import {
    Alert,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    Text,
    View
} from "react-native"
import firebase from "react-native-firebase"
import { TextField } from "react-native-material-textfield"
import { Actions } from "react-native-router-flux"
/*Components*/
import {ButtonPrimary} from "../components/Buttons"
/*Styles*/
import colors from "../styles/colors"
import fonts from "../styles/fonts"
/*Image*/
import background from "../../assets/image/background.png"
/*Functions and Constants*/
import {
    formatPhoneBrazil,
    replaceAll
} from "../functions"
export default function Phone(props){
    const [repositories, setRepositories] = useState({
        button:"Continuar",
        phone:"",
        error_phone:"",
        is_loading:true
    })

    function onChangeText(phone_atual){
        const phone_ant = repositories.phone
        const phone = formatPhoneBrazil(phone_ant, phone_atual)
        if(phone.length < 13){
            setRepositories(
                {
                    ...repositories,
                    is_loading:true,
                    error_phone:"",
                    phone:formatPhoneBrazil(phone_ant, phone_atual)
                }
            )
        }else{
            setRepositories(
                {
                    ...repositories,
                    is_loading:false,
                    error_phone:"",
                    phone:formatPhoneBrazil(phone_ant, phone_atual)
                }
            )
        }   
    }

    function sendMessage(){ 
        const {phone, is_loading} = repositories
        if(!is_loading && phone.length==13){
            let phone_format = replaceAll(phone, " ", "")
            phone_format = replaceAll(phone_format, "-", "")
            phone_format = "+55"+phone_format 
            setRepositories(
                {
                    ...repositories,
                    is_loading:true, 
                    button:"Verificando número. . ."
                }
            )
            firebase.database().ref("users").orderByChild("tel").equalTo(phone_format)
            .once("value", data =>{ 
                if(props.create == 1){
                    setRepositories(
                        {
                            ...repositories,
                            is_loading:true, 
                            button:"Enviando code. . ."
                        }
                    )
                    console.warn("passou1")
                    firebase.auth().signInWithPhoneNumber(phone_format)
                    .then(confirmResult =>  {
                        setRepositories(
                            {
                                ...repositories,
                                is_loading:false, 
                                button:"Continuar"
                            }
                        )
                        Actions.code({phone:phone_format, create:1})
                    })
                    .catch(error =>  {
                        alert(JSON.stringify(error))
                        // Alert.alert("Falha ao enviar o sms", "Verifique sua internet e tente novamente.")
                        setRepositories(
                            {
                                ...repositories,
                                is_loading:false, 
                                button:"Continuar"
                            }
                        )
                    }) 
                }else{
                    try{
                        const dataJSON =  JSON.parse(JSON.stringify(data) ) 
                        console.warn(dataJSON[1].tel)
    
                        setRepositories(
                            {
                                ...repositories,
                                is_loading:true, 
                                button:"Enviando code. . ."
                            }
                        )
        
                        firebase.auth().signInWithPhoneNumber(phone_format)
                        .then(confirmResult =>  {
                            setRepositories(
                                {
                                    ...repositories,
                                    is_loading:false, 
                                    button:"Continuar"
                                }
                            )
                            Actions.code({phone:phone_format, create:0})
                        })
                        .catch(error =>  {
                            alert(JSON.stringify(error))
                            // Alert.alert("Falha ao enviar o sms", "Verifique sua internet e tente novamente.")
                            setRepositories(
                                {
                                    ...repositories,
                                    is_loading:false, 
                                    button:"Continuar"
                                }
                            )
                        }) 
                    }catch(err){
                        console.warn("NAO esta cadastrado")
                        Alert.alert("Contra não cadastrada", "Peça um convite para seus amigos, para que possa continuar =).")
                        setRepositories(
                            {
                                ...repositories,
                                is_loading:false, 
                                error_phone:"Número não cadastrado."
                            }
                        )
                    }
                }
                
                
            }).catch(err =>{
                console.warn(err)
            })
        }else{
            setRepositories(
                {
                    ...repositories,
                    is_loading:false, 
                    error_phone:"Número inválido."
                }
            )
        } 
    }

    return(
        <View style={styles.conteiner}>
            <ImageBackground 
                source={background}
                style={styles.conteiner}
            > 
                <View style={styles.conteinerGlobal}>
                    <View style={{ height:"24%"}}/>
                    <View style={styles.conteinerCenter}>
                        <View style={styles.conteinerLine}>
                            <Text style={styles.title}>Digite seu</Text>
                            <TouchableOpacity
                                onPress={()=> Actions.code({trapaca:1})}
                            >
                                <Text style={[styles.title,{color:colors.primary}]}> Número</Text>
                            </TouchableOpacity>
                        </View> 
                        <View style={styles.conteinerNumber}>
                            <View style={styles.conteinerDDD}>
                                <TextField
                                    // affixTextStyle={{fontFamily:fonts.regular}}
                                    editable={false}
                                    error={repositories.error_phone}
                                    fontSize={16} 
                                    label=""                     
                                    labelTextStyle={{fontFamily:fonts.regular}}
                                    style={{fontFamily:fonts.regular}}
                                    textColor={colors.secundary}
                                    tintColor={colors.primary}
                                    baseColor={colors.primary}
                                    value={"BR +55"}
                                />
                            </View>
                            <View style={styles.conteinerPhone}>
                                <TextField
                                    error={repositories.error_phone}
                                    fontSize={16} 
                                    keyboardType="numeric"
                                    label=""
                                    maxLength={13}
                                    autoCapitalize='none'                        
                                    labelTextStyle={{fontFamily:fonts.regular}}
                                    onChangeText={value => onChangeText(value)}
                                    style={{fontFamily:fonts.regular}}
                                    textColor={colors.secundary}
                                    tintColor={colors.primary}
                                    baseColor={colors.primary}
                                    value={repositories.phone}
                                />
                            </View>
                        </View>
                        <ButtonPrimary
                            onPress={() => sendMessage()}
                            isLoading={repositories.is_loading}
                            label={repositories.button}
                        />

                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    conteiner:{
        height:"100%",
        width:"100%",
    },
    conteinerGlobal:{
        height:"100%",
        width:"100%",
        padding:4, 
    },
    conteinerCenter:{
        alignSelf:"center",
        width:"80%"
    },
    conteinerLine:{
        flexDirection:"row"
    },
    conteinerDDD:{
        // borderBottomColor:colors.primary,
        // borderBottomWidth:1,
        width:75
    },
    conteinerPhone:{
        width:"65%"
    },
    conteinerNumber:{
        marginLeft:"auto",
        marginRight:"auto",
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:"20%",
        marginBottom:70,
        width:"90%"

    },
    title:{
        color:colors.secundary,
        fontFamily:fonts.bold,
        fontSize:23
    }
})