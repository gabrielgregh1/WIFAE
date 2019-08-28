/*Modules*/
import React from "react"
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native"
/*Styles*/
import colors from "../styles/colors"
import fonts from "../styles/fonts"
/*Components*/

/*ButtonOutLine*/
export function ButtonOutline(props){

    return(
        <TouchableOpacity
            activeOpacity={.5}
            onPress={props.onPress}
            style={stylesOutline.conteinerGlobal}
        >
            <View style={stylesOutline.conteiner}>
                <Text style={stylesOutline.label}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    )
}

const stylesOutline = StyleSheet.create({
    conteiner:{
        alignItems:"center",
        borderWidth:1,
        borderColor:colors.primary,
        borderRadius:50,
        width:"100%",
        height:65
    },
    conteinerGlobal:{
        width:"100%",

    },
    label:{
        color:colors.secundary,
        fontSize:18,
        fontFamily:fonts.regular,
        marginBottom:"auto",
        marginTop:"auto"
    }
})


/*ButtonPrimary*/
export function ButtonPrimary(props){

    return(
        <TouchableOpacity
            activeOpacity={!props.isLoading? .5 : 1}
            onPress={!props.isLoading && props.onPress}
            style={stylesPrimary.conteinerGlobal}
        >
            <View style={[stylesPrimary.conteiner, props.isLoading && stylesPrimary.conteinerDisable ]}>
                <Text style={stylesPrimary.label}>{props.label}</Text>
            </View>
        </TouchableOpacity>
    )
}

const stylesPrimary = StyleSheet.create({
    conteiner:{
        ...stylesOutline.conteiner,
        borderColor:colors.primary,
        backgroundColor:colors.primary
    },
    conteinerDisable:{
        backgroundColor:colors.primaryDisable,
        borderColor:colors.primaryDisable,
    },
    conteinerGlobal:{
        ...stylesOutline.conteinerGlobal
    },
    label:{
        ...stylesOutline.label,
    }
})