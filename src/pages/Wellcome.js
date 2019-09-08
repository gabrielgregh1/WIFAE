/*Modules*/
import React, {
    useEffect
} from "react"
import {
    Dimensions,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import { Actions } from "react-native-router-flux"
/*Components*/
import {
    ButtonOutline,
    ButtonPrimary
} from "../components/Buttons"
/*Style*/
import colors from "../styles/colors"
import fonts from "../styles/fonts"
/*Image*/
import background from "../../assets/image/background.png"

export default function Wellcome(){

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
                <View style={styles.conteinerGlobal}>
                    <View style={{ height:"24%"}}/>
                    <View style={styles.conteinerCenter}>
                        <View style={styles.conteinerGeralTitle}>
                            <View style={styles.conteinerLine}>
                                <Text style={styles.title}>WI</Text>
                                <Text style={[styles.title,{color:colors.primary}]}>FAE</Text>
                            </View>
                            <View style={styles.conteinerLine}>
                                <Text style={styles.subTitle}>Conecte-</Text>
                                <Text style={[styles.subTitle,{color:colors.primary}]}>se</Text>
                            </View>
                        </View>
                        <ButtonOutline
                            label="Tenho convite"
                        />
                        <View style={styles.space}/>
                        <ButtonPrimary
                            label="Entrar"
                            onPress={() => Actions.phone()}
                        />
                    </View>
                    <View style={styles.conteinerTermos}>
                        <View style={styles.space}/>
                        <View style={styles.conteinerLine}>
                            <Text style={styles.termos}>Ao "Entrar" você concorda com os nossos</Text>
                            <TouchableOpacity
                                activeOpacity={.5}
                            >
                                <Text style={[styles.termos,styles.link]}> Termos de Uso</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.conteinerLine}>
                            <Text style={styles.termos}>e</Text>
                            <TouchableOpacity
                                activeOpacity={.5}
                            >
                                <Text style={[styles.termos,styles.link]}> Política de Privacidade.</Text>
                            </TouchableOpacity>
                        </View>
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
    conteinerLine:{
        flexDirection:"row"
    },
    conteinerCenter:{
        alignItems:"center",
        alignSelf:"center",
        width:"85%"
    },
    conteinerGeralTitle:{
        marginBottom:80,
        alignItems:"center",
    },
    conteinerTermos:{
        alignSelf:"center", 
        paddingLeft:"5%",
        width:"85%"
    },
    title:{
        fontFamily:fonts.medium,
        fontSize:45,
        color:colors.secundary
    },
    subTitle:{
        fontFamily:fonts.regular,
        fontSize:12,
        color:colors.secundary
    },
    termos:{
        color:colors.secundary,
        fontFamily:fonts.regular,
        fontSize: Dimensions.get("window").width >= 360 ? 9 : 8,
    },
    link:{
        borderBottomWidth:1,
        borderColor:colors.primary
    },
    space:{
        height:10
    }
})