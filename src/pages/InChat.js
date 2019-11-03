import React from "react"
import {
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native"
// import { createIconSetFromIcoMoon } from "react-native-vector-icons"
import Icon from "react-native-vector-icons/Ionicons"
import IconCom from "react-native-vector-icons/MaterialCommunityIcons"

// import { TextField } from "react-native-material-textfield"
/*Components*/
// import { HeaderPrim } from "../components/Header"
/*Images*/
import foto from "../../assets/image/perfil.png"
import voltar from "../../assets/image/back-arrow.png"
import more from "../../assets/image/more.png"
import clip from "../../assets/image/clip.png"
import send from "../../assets/image/send.png"
/*Styles*/
import fonts from "../styles/fonts"
/*Functions and Constants*/
import icoMoonConfig from "../../selection.json"
import { Actions } from "react-native-router-flux"
 
// const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon", "icomoon.ttf")

export default function InChat(props){
    const [value, onChangeText] = React.useState('');
    return(
        <View>
                {/* Começo da Header */}   
                <View style={styles.conteiner}>
                    
                    <View style={styles.conteinerVoltar}>
                        <View style={{marginTop:'3%'}}>
                            <TouchableOpacity
                                onPress={() => Actions.pop()}
                            >
                                <Icon
                                    name={`ios-arrow-back`}
                                    size={30}
                                    color={`#FFF`}
                                />
                                    {/* <View 
                                        style={styles.circle}>
                                        <ImageBackground
                                            source={voltar}
                                            style={styles.image}
                                            tintColor="#FFEFEF"
                                        ></ImageBackground> 
                                    </View>  */}
                            </TouchableOpacity> 
                        </View>
                        <View style={styles.button}>
                            <View
                                style={styles.circleFoto}>
                                    <Image
                                        source={{uri:props.imagem}}
                                        style={styles.foto}
                                    ></Image>
                            </View>
                        </View> 
                            <Text style={styles.label}>{props.nome}</Text> 
                    </View>

                  

                    <View style={styles.conteinerOp}>
                        <TouchableOpacity>
                           
                        <IconCom
                                name={`dots-vertical`}
                                size={30}
                                color={`#FFF`}
                            />
                        </TouchableOpacity>
                    </View>
                </View>  
                {/* Fim da Header */}  

            <View style={styles.conteinerBack}>
                <ScrollView>    
                    
                </ScrollView>
                <View style={styles.conteinerText}>
                    <TouchableOpacity>
                            <View
                                style={styles.circleClip}>
                                <ImageBackground
                                    source={clip}
                                    style={styles.imageText}
                                    tintColor="#B34B67"
                                ></ImageBackground>  
                            </View>
                        </TouchableOpacity>
                    <TextInput
                        placeholder={"Aa"}
                        style={styles.Text}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                    />
                            
                        <TouchableOpacity 
                        >
                            <View
                                style={styles.circleSend}>
                                <ImageBackground
                                    source={send}
                                    style={styles.imageText}
                                    tintColor="#B34B67"
                                ></ImageBackground>  
                            </View>
                        </TouchableOpacity>  
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    conteiner:{
        backgroundColor:colors.primary,
        flexDirection:"row", 
        paddingTop:10,
        paddingBottom:10,
        width:"100%",
        justifyContent:'space-between'
    }, 
    conteinerVoltar:{
        height:"100%",
        marginLeft:"5%",
        marginTop:5,
        flexDirection:"row",
    },
    conteinerOp:{
        // height:"80%",
        // marginRight:"5%",
        marginTop:"3%",
        // marginTop:5
    },
    conteinerBack:{
        height:"100%",
        width:"100%",
        backgroundColor:"#1E1C1C",
        padding:15
    },
    conteinerText:{
        height:"100%",
        width:"100%",
        marginTop:"145%",
        flexDirection:"row",
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    Text:{
        height: 40, 
        backgroundColor:"white",
        fontFamily:fonts.regular,
        flex: 1
    },
    button:{
        height:"100%",
        marginLeft:"7%",
        marginRight:"3%",
        marginTop:'auto',
        marginBottom:'auto'
    },
    foto:{
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    image:{
        height: 30,
        width:30
    },
    imageText:{
        height: "100%",
        width: "100%"
    },
    circleFoto:{
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: 'white'
    },
    circle:{
        width: 30,
        height: 30,
        borderRadius: 30/2
    },
    circleClip:{
        width: 40,
        height: 40,
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        backgroundColor: "white",
        alignItems:"center",
        paddingTop:7
    },
    circleSend:{
        width: 40,
        height: 40,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        backgroundColor: "white",
        alignItems:"center",
        paddingTop:7
    },
    label:{
        color:"#fff",
        fontFamily:fonts.regular,
        fontSize:20,
        marginLeft:"5%",
        marginBottom:'auto',
        marginTop:'3%'
    }
})