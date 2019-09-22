/*Modules*/
import React,{
    useState,
    useEffect
} from "react"
import {
    TouchableOpacity,
    ImageBackground,
    Image,
    StyleSheet,
    Text,
    View
} from "react-native"
import { createIconSetFromIcoMoon } from "react-native-vector-icons"
import IconIon from "react-native-vector-icons/Ionicons"

import firebase  from "react-native-firebase"
import posed from "react-native-pose"
/*Components*/
import { HeaderBack } from "../components/Headers"
/*Images*/
import perfil from "../../assets/image/perfil.png"
import t from "../../assets/image/t.png"
import polaroid from "../../assets/image/polaroid.png"
/*Styles*/
import fonts from "../styles/fonts"
/*Functions and Constants*/
import icoMoonConfig from "../../selection.json"
import colors from "../styles/colors"

const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon", "icomoon.ttf")

const Box = posed.View({
    accept:{
        scale: 1.05,
        x: 600, 
        y: 100,
        opacity:1,
        transition: { duration: 600 }
    },
    refuse:{
        scale: 1.05,
        x: -600, 
        y: 100,
        opacity:1,
        transition: { duration: 600 }
    },
    neutral:{
        scale: 1,
        x: 0, 
        y: 0,
        opacity:1,
        transition: { duration: 600 }
    },
    initial:{
        scale: 1,
        x: 0, 
        y: 0,
        opacity:0,
        transition: { duration: 0 }
    }
})

export default function Choice(){
    const [repository, setRepository] = useState(
        {
            animate:"neutral",
            isLoading:false,
            users:[],
            userExibido:{
                curso: null,
                data_nasc: null,
                foto_perfil: null,
                nome: null,
                sexo: null
            }
        }
    )

    useEffect(()=>{

    },[])

    return(
        <View style={styles.conteiner}>
            <HeaderBack
                page="choice"
            />
            <View style={styles.conteinerBack}>
                <Box style={styles.photo} pose={repository.animate}>
                    <View style={{justifyContent:"space-between",flexDirection:"row",}}>
                        <View style={{marginTop:"auto", marginBottom:"auto",marginLeft:0}}>
                                <IconIon
                                    name="ios-arrow-back"
                                    size={30}
                                />
                            </View>
                        <View style={styles.conteinerPhoto}>
                            <ImageBackground
                                source={perfil}
                                style={styles.conteinerImage}
                            >
                                <View style={styles.conteinerVotos}>
                                    <View>
                                        {  repository.animate == "refuse" && <Text style={[styles.voto, {color:colors.neutral}]}>TÔ DE BOA</Text> }
                                    </View>
                                    <View>
                                        {  repository.animate == "accept" && <Text style={[styles.voto, {color:colors.primary}]}>QUERO</Text> }
                                    </View>
                                </View> 
                            </ImageBackground>
                        </View>
                    
                        <IconIon
                                name="ios-arrow-forward"
                                size={30}
                                style={{marginTop:"auto", marginBottom:"auto"}}
                            />
                    </View>
                    <View style={styles.conteinerLabel}>
                        <Image
                            source={polaroid} 
                            style={styles.images}
                        />
                        <Image
                            source={t} 
                            style={styles.images}
                        /> 
                    </View>
                </Box>
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
        backgroundColor:"#FFF",
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
        margin:10,
        height:"86%",
        width:"100%",
    },
    conteinerLabel:{
        width:150,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    conteinerVotos:{
        padding:15,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    photo:{
        height:"75%",
        width:"97%",
        alignItems:"center",
        padding:25,
        marginBottom:17,
        backgroundColor:"#FFF"
    },
    semPhoto:{
        height:"75%",
        alignItems:"center",
        padding:25,
        marginBottom:17,
        backgroundColor:"#000"
    },
    label:{
        color:"#000",
        fontFamily:fonts.regular,
        fontSize:12
    },
    voto:{
        fontFamily:fonts.bold,
        fontSize:25
    },
    images:{
        height:40,
        width:40
    }
})