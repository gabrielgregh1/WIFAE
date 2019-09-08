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
/*Styles*/
import colors from "../styles/colors"
/*Functions and Constants*/
import icoMoonConfig from "../../selection.json"
import { Actions } from "react-native-router-flux"
 
const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon", "icomoon.ttf")

export function HeaderPrim(props){

    useEffect(()=>{
        StatusBar.setBackgroundColor(colors.primary)
    },[])

    return(
        <View style={stylesPrim.conteiner}>
            
                <View style={stylesPrim.button}>
                    <TouchableOpacity
                        onPress={()=> Actions.perfil()}
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
                        onPress={()=> Actions.choice()}
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
        paddingTop:5
    }
})