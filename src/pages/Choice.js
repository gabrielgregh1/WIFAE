/*Modules*/
import React from "react"
import {
    TouchableOpacity,
    ImageBackground,
    Image,
    StyleSheet,
    Text,
    View
} from "react-native"
import { createIconSetFromIcoMoon } from "react-native-vector-icons"
/*Components*/
import { HeaderPrim } from "../components/Headers"
/*Images*/
import perfil from "../../assets/image/perfil.png"
/*Styles*/
import fonts from "../styles/fonts"
/*Functions and Constants*/
import icoMoonConfig from "../../selection.json"
 
const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon", "icomoon.ttf")

export default function Choice(){

    return(
        <View style={styles.conteiner}>
            <HeaderPrim />
            <View style={styles.conteinerBack}>
                <View style={styles.photo}>
                    <View style={styles.conteinerPhoto}>
                        <ImageBackground
                            source={perfil}
                            style={styles.conteinerImage}
                        >
                            <View style={styles.conteinerInfo}>
                                <TouchableOpacity>
                                    <Icon
                                        name={"info"} 
                                        size={20} 
                                        color="#B3B3B3" 
                                    />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.conteinerLabel}>
                        <Text style={styles.label}>Julia Mendes, 20.</Text>
                        <Text style={styles.label}>Gosto de bixinhos e música, chama ae po.</Text>
                    </View>
                </View>
                <View style={styles.conteinerBottom}>
                    <View style={styles.conteinerButtons}>
                        <TouchableOpacity>
                            <View>
                                <Icon
                                    name={"info"} 
                                    size={58} 
                                    color="#B3B3B3" 
                                />
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity>
                            <View>
                                <Icon
                                    name={"info"} 
                                    size={58} 
                                    color="#B3B3B3" 
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    conteiner:{
        height:"100%",
        width:"100%"
    },
    conteinerImage:{
        height:"100%",
        width:"100%",
        backgroundColor:"blue",
    },
    conteinerBack:{
        height:"100%",
        width:"100%",
        backgroundColor:"#000",
        padding:15
    },
    conteinerButtons:{
       flexDirection:"row", 
       justifyContent:"space-between",
    },
    conteinerBottom:{
        paddingRight:"20%",
        paddingLeft:"20%"

    },
    conteinerInfo:{
        marginTop:"auto",
        marginLeft:"auto",
        marginBottom:11,
        marginRight:18,
    },
    conteinerPhoto:{
        height:"85%",
        width:"100%",
    },
    conteinerLabel:{
        paddingTop:15
    },
    photo:{
        height:"75%",
        alignItems:"center",
        padding:25,
        marginBottom:17,
        backgroundColor:"#FFF"
    },
    label:{
        color:"#000",
        fontFamily:fonts.regular,
        fontSize:12
    }
})