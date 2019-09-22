/*Modules*/
import React,{
    useEffect
} from "react"
import {
    TouchableOpacity,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native"
import { createIconSetFromIcoMoon } from "react-native-vector-icons"
import IconIon from "react-native-vector-icons/Ionicons"
import IconFont from "react-native-vector-icons/FontAwesome"

/*Styles*/
import colors from "../styles/colors"
/*Functions and Constants*/
import icoMoonConfig from "../../selection.json"
import { Actions } from "react-native-router-flux"
import fonts from "../styles/fonts"
 
const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon", "icomoon.ttf")

export function HeaderPrim(props){

    useEffect(()=>{
        StatusBar.setBackgroundColor(colors.primary)
    },[])

    return(
        <View style={stylesPrim.conteiner}>
            
                <View style={stylesPrim.button}>
                    <TouchableOpacity
                        onPress={()=> props.page != "profile" && Actions.profile()}
                    >
                        <Icon
                            name={"profile"} 
                            size={32} 
                            color="#B3B3B3"
                            style={stylesPrim.image}
                        />
                    </TouchableOpacity>
                    
                </View>
                <View style={stylesPrim.button}>
                    <TouchableOpacity
                        onPress={()=> props.page != "choice" && Actions.choice()}
                    >
                        <Icon
                            name={"wifi"} 
                            size={42} 
                            color="#B3B3B3"
                        />
                    </TouchableOpacity>
                </View>

            
                <View style={stylesPrim.button}>
                    <TouchableOpacity
                        onPress={()=> props.page != "mensagem" && Actions.mensagem()}
                    >
                        <Icon
                            name={"chat"} 
                            size={32} 
                            color="#B3B3B3"
                            style={stylesPrim.image}
                        />
                    </TouchableOpacity>
                </View>
        </View>
    )
}

export function HeaderBack(props){

    useEffect(()=>{
        StatusBar.setBackgroundColor(colors.primary)
    },[])

    return(
        <View style={stylesPrim.conteiner}>
            <View style={stylesBack.button}>
                <TouchableOpacity
                    onPress={()=> Actions.pop()}
                >
                   <IconIon
                        name={"ios-arrow-back"} 
                        size={32} 
                        color="#FFF"
                        style={stylesBack.image}
                    />
                </TouchableOpacity>
                
            </View>
            <View style={stylesBack.button}>
                <TouchableOpacity>
                    <IconFont
                        name={"photo"} 
                        size={20} 
                        color="#FFF"
                        style={{paddingTop:10}}
                    />
                </TouchableOpacity>
            </View>
                
            <Text style={stylesBack.title}>Editar Polaroid's</Text> 
        </View>
    )
}

const stylesPrim = StyleSheet.create({
    conteiner:{
        backgroundColor:colors.primary,
        flexDirection:"row", 
        paddingTop:10,
        paddingBottom:10,
        width:"100%"
    },
    button:{
        alignItems:"center",
        height:"100%",
        width:"33%"
    },
    image:{
        paddingTop:5,
    }
})

const stylesBack = StyleSheet.create({
    button:{
        alignItems:"center",
        height:"100%",
        marginRight:5,
        width:42
    },
    image:{
        paddingTop:5
    },
    title:{
        color:"#FFF",
        fontFamily:fonts.regular,
        fontSize:16,
        marginBottom:"auto",
        marginTop:"auto"
    }
})