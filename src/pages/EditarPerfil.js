/*Modules*/
import { Actions } from "react-native-router-flux"
import firebase from "react-native-firebase"
import React, {
    useEffect,
    useState
} from "react"
import {
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity
} from "react-native"
//import Icon from "react-native-vector-icons"
import { TextField } from "react-native-material-textfield"
/*Components*/
import { ButtonPrimary } from "../components/Buttons"
import DadosInModal from "../pages/DadosInModal"
/*Styles*/
import colors from "../styles/colors"
import fonts from "../styles/fonts"
import { createIconSetFromIcoMoon } from "react-native-vector-icons"
/*Images*/
import background from "../../assets/image/background.png"
import icoMoonConfig from "../../selection.json"
const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon", "icomoon.ttf")

import backIcon from "../../assets/image/back-icon.png"
import editIcon from "../../assets/image/edit-icon.png"


export default function EditarPerfil() {

    const [repositories, setRepositories] = useState({
        childKey: "",
        childData: "",
        isVisible: false,
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
    })

    useEffect(() => {
        StatusBar.setBackgroundColor("rgba(0,0,0,.9)")
        StatusBar.setTranslucent(false)
        load()
    }, [])



    function load() {

        firebase.database().ref("users").orderByChild("tel").equalTo("+5519989383632").once("value", users => {
            users.forEach(function (childUser) {

                setRepositories({
                    ...repositories,
                    childKey: childUser.key,
                    childData: childUser.val()
                })


            });

        })
    }


    function salve() {



        firebase.database().ref('users/' + repositories.childKey).set({
            ...repositories.childData
        }).then((data) => {
            //success callback    
            console.warn('data ', data)
            alert("Salvo!")
        }).catch((error) => {
            //error callback
            Alert.alert("Falha na conexão", "Verifique seu acesso a internet.")

        })

        console.warn(repositories.childKey)
        console.warn(repositories.childData)


    }

    function updateEscolha(keySelec){
        let dadosLista = repositories.dadosLista

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

        setRepositories(
            {
                ...repositories,
                dadosLista, 
                isVisible:true
            }
        )
    }


    return (
        <View style={styles.conteiner}>

            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        Actions.pop()
                    }}
                >
                    <Image
                        source={backIcon}
                        style={styles.backIcone}
                    ></Image>
                </TouchableOpacity>
                <Image
                    source={editIcon}
                    style={styles.editIcone}
                ></Image>
                <Text style={styles.textoTopo}>Editar Perfil</Text>

            </View>

            <ScrollView>
                <View style={styles.viewCorpo}>

                    <View style={styles.viewCampos}>

                        <Text style={styles.textoItens}>Descrição do perfil:</Text>
                        <TextField
                            fontSize={16}
                            label=""
                            maxLength={254}
                            autoCapitalize='none'
                            labelTextStyle={{ fontFamily: fonts.regular }}
                            style={{ fontFamily: fonts.regular }}
                            textColor={colors.secundary}
                            tintColor={colors.primary}
                            baseColor={colors.primary}
                            value={repositories.childData.desc}
                            onChangeText={(value) =>
                                setRepositories({
                                    ...repositories,
                                    childData: {
                                        ...repositories.childData,
                                        desc: value
                                    }
                                })
                            }
                        />
                    </View>


                    <View style={styles.viewCampos}>
                        <Text style={styles.textoItens}>Curso:</Text>
                        <TextField
                            fontSize={16}
                            label=""
                            maxLength={254}
                            autoCapitalize='none'
                            labelTextStyle={{ fontFamily: fonts.regular }}
                            style={{ fontFamily: fonts.regular }}
                            textColor={colors.secundary}
                            tintColor={colors.primary}
                            baseColor={colors.primary}
                            value={repositories.childData.curso}
                            onChangeText={(value) =>
                                setRepositories({
                                    ...repositories,
                                    childData: {
                                        ...repositories.childData,
                                        curso: value
                                    }
                                })
                            }
                        />
                    </View>


                    <View style={styles.viewCampos}>
                        <Text style={styles.textoItens}>Interesses</Text>
                        <TouchableOpacity
                            onPress={() => setRepositories({...repositories, isVisible:true})}
                        >
                            <View style={styles.conteinerInteresses}>
                                <Text style={styles.textLabel}>Gerenciar Interesses</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewSexo}>
                        <Text style={styles.textoItens}>Sexo:</Text>
                        <View style={styles.conteinerButton}>

                            <TouchableOpacity
                                onPress={() => {
                                    setRepositories({
                                        ...repositories,
                                        childData: {
                                            ...repositories.childData,
                                            sexo: 'm'
                                        }
                                    })
                                }}
                            >
                                <View style={styles.icon}>
                                    <Icon
                                        name={"masc"}
                                        size={repositories.childData.sexo === 'm' ? 28 : 25}
                                        color={"blue"}
                                    />
                                    <Text style={
                                        [
                                            styles.label,
                                            { color: repositories.childData.sexo === 'm' ? colors.primary : 'white' }
                                        ]
                                    }>Masculino</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setRepositories({
                                        ...repositories,
                                        childData: {
                                            ...repositories.childData,
                                            sexo: 'f'
                                        }
                                    })
                                }}
                            >
                                <View style={styles.icon}>
                                    <Icon
                                        name={"feme"}
                                        size={repositories.childData.sexo === 'f' ? 28 : 25}
                                        color={colors.primary}
                                    />
                                    <Text style={
                                        [
                                            styles.label,
                                            { color: repositories.childData.sexo === 'f' ? colors.primary : 'white' }
                                        ]
                                    }
                                    >Feminino</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>





                </View>
                <View style={styles.conteinerButtonBot}>
                    <ButtonPrimary
                        label="Salvar"
                        onPress={() => salve()}
                    />
                </View>
            </ScrollView>
            <DadosInModal
                isVisible={repositories.isVisible}
                onClose={() => setRepositories({...repositories, isVisible:false})}
                updateEscolha={updateEscolha}
                dadosLista={repositories.dadosLista}
            />
        </View >
    )

}


const styles = StyleSheet.create({
    icon: {
        alignItems: 'center'
    },
    label: {
        color: 'white',
        marginTop: 10
    },
    conteiner: {
        height: "100%",
        // paddingRight:"30%",
        // paddingLeft:"30%",
        backgroundColor: "#000000",
        width: "100%",
    },
    viewCorpo: {
        marginRight: 20,
        marginLeft: 20
    },
    conteinerButtonBot: {
        marginTop: 10,
        marginRight: "auto",
        marginLeft: "auto",
        width: "80%",
        marginBottom: 30
    },
    header: {
        flexDirection: "row",
        width: "100%",
        height: 60,
        backgroundColor: colors.primary,
        marginBottom: 30
    },
    textoItens: {
        color: "#FFFFFF",
        fontSize: 18,
        fontFamily: fonts.bold,
        position: "absolute",
        bottom: 0,
        marginBottom: 70,
        marginTop: 20,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 7,

    },
    conteinerButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: "20%",
        paddingRight: "20%",
        marginTop: 40
    },
    viewSexo: {
        marginTop: 25,
        marginBottom: 40
    },
    conteinerNumber: {
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 0,
        marginBottom: 0,
        width: "90%"

    },
    conteinerDDD: {
        // borderBottomColor:colors.primary,
        // borderBottomWidth:1,
        width: 75
    },
    conteinerPhone: {
        width: "65%"
    },
    textoTopo: {
        flexDirection: "row",
        color: "#FFFFFF",
        fontSize: 18,
        fontFamily: fonts.bold,
        position: "relative",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 7,
        marginTop: 16,
        marginLeft: 15
    },
    backIcone: {
        flexDirection: "row",
        width: 32,
        height: 32,
        marginTop: 15,
        marginLeft: 5
    },
    editIcone: {
        flexDirection: "row",
        width: 32,
        height: 32,
        marginTop: 12,
        marginLeft: 35
    },
    viewCampos: {
        marginTop: 50
    },
    conteinerInteresses:{
        height:50,
        width:'100%',
        borderRadius:4,
        backgroundColor:'#FFF'
    },
    textLabel:{
        fontSize:16,
        fontFamily:fonts.regular,
        color:'#000',
        marginBottom:'auto',
        marginTop:'auto',
        marginLeft:15
    }
})