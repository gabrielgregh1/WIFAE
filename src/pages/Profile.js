import React from "react"
import {
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native"
import { createIconSetFromIcoMoon } from "react-native-vector-icons"
import { TextField } from "react-native-material-textfield"
/*Components*/
import { HeaderPrim } from "../components/Headers"
/*Images*/
import perfil from "../../assets/image/perfil.png"
/*Styles*/
import fonts from "../styles/fonts"
/*Functions and Constants*/
import icoMoonConfig from "../../selection.json"
 
const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon", "icomoon.ttf")

export default function Profile(){
    return(
        <View style={styles.conteiner}>
            <HeaderPrim
                page="profile"
            />
            <ScrollView>
                <View style={styles.conteinerBack}>
                    <View style={styles.photo}>
                            <Image
                                source={perfil}
                                style={styles.conteinerImage}>   
                            </Image>
                    </View>

                    <View style={styles.conteinerLabel}>
                        <Text style={styles.label1}>Julia Mendes, 20</Text>
                        <Text style={styles.label2}>Psicologia</Text>
                    </View>

                    <View style={styles.conteinerText}>
                        <TextField></TextField>
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
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    conteiner:{
        height:"100%",
        width:"100%",
        backgroundColor:"#000",
    },
    conteinerImage:{
        height:"100%",
        width:"100%",
        backgroundColor:"blue",
        borderRadius:130
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
        paddingLeft:"20%",
        // backgroundColor: colors.primary,

    },
    conteinerLabel:{
        paddingTop:15,
    },
    conteinerText:{
        paddingRight:"30%",
        paddingLeft:"30%",
        paddingTop: "5%",
        paddingBottom: "40%",
    },
    photo:{
        alignItems:"center",
        marginTop:40,
        marginLeft:"30%",
        width: 130,
        height: 130,
        borderRadius: 130/2,
        backgroundColor: 'white',
    },
    label1:{
        color:"#fff",
        fontFamily:fonts.regular,
        fontSize:20,
        marginLeft:"27%",
    },
    label2:{
        color:"#fff",
        fontFamily:fonts.regular,
        fontSize:20,
        marginLeft:"35%",
    }
})