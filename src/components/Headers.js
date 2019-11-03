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
import IconMat from "react-native-vector-icons/MaterialCommunityIcons"
import IconFont from "react-native-vector-icons/FontAwesome"
import IconFont5 from "react-native-vector-icons/FontAwesome5"
import IconFeat from "react-native-vector-icons/Feather"

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
        <View style={stylesPrim.conteiner1}>
            
                <View style={stylesPrim.button}>
                    <TouchableOpacity
                        onPress={()=> props.page != "profile" && Actions.profile()}
                        style={{marginTop:'auto', marginBottom:'auto'}}
                    >
                        <IconFont5
                            name={"user-alt"} 
                            size={23} 
                            color={colors.primary}
                            style={stylesPrim.image}
                        />
                    </TouchableOpacity>
                    
                </View>
                <View style={stylesPrim.button}>
                    <TouchableOpacity
                        onPress={()=> props.page != "choice" && Actions.choice()}
                        style={{marginTop:'auto', marginBottom:'auto'}}
                    >
                        <IconFeat
                            name={"wifi"} 
                            size={30} 
                            color={colors.primary}
                            style={stylesPrim.image}
                        />
                    </TouchableOpacity>
                </View>

            
                <View style={stylesPrim.button}>
                    <TouchableOpacity
                        onPress={()=> props.page != "mensagem" && Actions.mensagem()}
                        style={{marginTop:'auto', marginBottom:'auto'}}
                    >
                        <IconMat
                            name={"chat-processing"} 
                            size={23} 
                            color={colors.primary}
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


export function HeaderModal(props){

    useEffect(()=>{
        StatusBar.setBackgroundColor(colors.primary)
    },[])

    return(
        <View style={stylesPrim.conteiner}>
            <View style={[stylesBack.button, {paddingRight:5}]}>
                <TouchableOpacity
                    onPress={props.onPress}
                >
                   <IconIon
                        name={"md-close"} 
                        size={32} 
                        color="#FFF"
                        style={stylesBack.image}
                    />
                </TouchableOpacity>
                
            </View>
            {/* <View style={stylesBack.button}>
                <TouchableOpacity>
                    <IconFont
                        name={"photo"} 
                        size={20} 
                        color="#FFF"
                        style={{paddingTop:10}}
                    />
                </TouchableOpacity>
            </View>
                */}
            <Text style={stylesBack.title}>{props.title}</Text>  
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
    conteiner1:{
        backgroundColor:colors.primary,
        flexDirection:"row", 
        justifyContent:'space-between',
        paddingTop:10,
        paddingBottom:10,
        width:"100%",
        paddingRight:"10%",
        paddingLeft:"10%"
    },
    button:{
        alignItems:"center",  
        borderRadius:100,
        backgroundColor:"#FFF", 
        width:42,
        height:42,
        
    },
    image:{
        marginTop:'auto',
        // marginBottom:'auto'
    },
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