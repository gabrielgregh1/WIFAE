/*Modules*/
import React,{
    useEffect,
    useState
} from "react"
import{
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native"
import { createIconSetFromIcoMoon } from "react-native-vector-icons"
import { TextField } from "react-native-material-textfield"
/*Components*/
import {ButtonPrimary} from "../components/Buttons"
/*Styles*/
import colors from "../styles/colors"
import fonts from "../styles/fonts"
/*Images*/
import background from "../../assets/image/background.png"
/*Functions and Constants*/
import icoMoonConfig from "../../selection.json"
 
const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon", "icomoon.ttf")

export default function Perfil(){

    const [repositories, setRepositories] = useState({
        error_nome:"",
        nome:""
    })

    useEffect(()=>{
        StatusBar.setBackgroundColor("rgba(0,0,0,.9)") 
        StatusBar.setTranslucent(false)
    },[])

    return(
        <View style={styles.conteiner}>
            <ImageBackground 
                source={background}
                style={styles.conteiner}
            > 
                <ScrollView>
                    <View style={styles.conteinerPhoto}>
                        <Icon
                            name={"photo"} 
                            size={40} 
                            color="#B3B3B3" 
                            style={styles.perfil}
                        />
                        <Icon
                            name={"photo"} 
                            size={30} 
                            color="#B3B3B3" 
                            style={styles.edit}
                        />
                    </View>
                    <View style={styles.conteinerContent}>
                        <View style={styles.conteinerText}>
                            <View>
                                <TextField
                                    error={repositories.error_nome}
                                    fontSize={16}      
                                    placeholder="Nome"              
                                    placeholderTextColor={colors.primary}
                                    style={{fontFamily:fonts.regular}}
                                    textColor={colors.secundary}
                                    tintColor={colors.primary}
                                    baseColor={colors.primary}
                                    value={repositories.nome}
                                />
                            </View>
                            <View style={styles.conteinerTextField}>
                                <TextField
                                    error={repositories.error_nome}
                                    fontSize={16} 
                                    placeholder="Data de Nascimento"              
                                    placeholderTextColor={colors.primary}
                                    style={{fontFamily:fonts.regular}}
                                    textColor={colors.secundary}
                                    tintColor={colors.primary}
                                    baseColor={colors.primary}
                                    value={repositories.nome}
                                />
                            </View>
                            <View style={[styles.conteinerTextField,{top:-20}]}>
                                <TextField
                                    error={repositories.error_nome}
                                    fontSize={16} 
                                    placeholder="Curso"           
                                    placeholderTextColor={colors.primary}
                                    style={{fontFamily:fonts.regular}}
                                    textColor={colors.secundary}
                                    tintColor={colors.primary}
                                    baseColor={colors.primary}
                                    value={repositories.nome}
                                />
                            </View>
                            <View style={[styles.conteinerTextField,{top:-30}]}>
                                <TextField
                                    error={repositories.error_nome}
                                    fontSize={16} 
                                    placeholder="Idade"                      
                                    placeholderTextColor={colors.primary}
                                    style={{fontFamily:fonts.regular}}
                                    textColor={colors.secundary}
                                    tintColor={colors.primary}
                                    baseColor={colors.primary}
                                    value={repositories.nome}
                                />
                            </View>
                        </View>
                        <View style={styles.conteinerButton}>
                            <View style={styles.icon}> 
                                <Icon
                                    name={"masc"} 
                                    size={25} 
                                    color={"blue"}
                                />
                                <Text style={styles.label}>Homem</Text>
                            </View>
                            <View style={styles.icon}> 
                                <Icon
                                    name={"feme"} 
                                    size={25} 
                                    color={colors.primary} 
                                />
                                <Text style={styles.label}>Homem</Text>
                            </View>
                        </View>
                        <View style={styles.conteinerButtonBot}>
                            <ButtonPrimary
                                label="Continuar"
                            />
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    conteiner:{
        height:"100%",
        // paddingRight:"30%",
        // paddingLeft:"30%",
        width:"100%",
    },
    conteinerContent:{
        width:"100%",
        height:"100%"
    },
    conteinerText:{
        width:"70%",
        marginLeft:"auto",
        marginRight:"auto",
    },
    conteinerTextField:{
        position:"relative",
        top:-10
    },
    conteinerPhoto:{
        alignItems:"center",
        backgroundColor:"#FFF",
        borderRadius:100,
        height:90,
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:50,
        width:90,
    },
    conteinerButton:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingLeft:"15%",
        paddingRight:"15%"
    },
    conteinerButtonBot:{
        marginTop:30,
        marginRight:"auto",
        marginLeft:"auto",
        width:"80%"
    },
    icon:{
        alignItems:"center"
    },
    label:{
        color:"#FFF",
        fontFamily:fonts.regular,
        fontSize:14,
    },
    perfil:{
        marginTop:"auto",
        marginBottom:"auto"
    },
    edit:{
        position:"absolute",
        top:73,
        marginTop:"auto",
        marginBottom:"auto"
    }
})