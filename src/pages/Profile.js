import React,{
    useState,
    useEffect
} from "react"
import {
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native"
import firebase from "react-native-firebase"
import { createIconSetFromIcoMoon } from "react-native-vector-icons"
import Ionicons from "react-native-vector-icons/Ionicons"
import IconMat from "react-native-vector-icons/MaterialIcons"
import IconCommu from "react-native-vector-icons/MaterialCommunityIcons"
import { TextField } from "react-native-material-textfield"
/*Components*/
import { HeaderPrim } from "../components/Headers"
/*Images*/
import perfil from "../../assets/image/perfil.png"
/*Styles*/
import fonts from "../styles/fonts"
/*Functions and Constants*/
import icoMoonConfig from "../../selection.json"
import colors from "../styles/colors"
 
const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon", "icomoon.ttf")

export default function Profile(){ 
    const [repository, setRepository] = useState(
        {
            tel:'19997335710',
            nome:'',
            dataNasc:'',
            curso:'',
        }
    )

    useEffect(() =>
        {
            returnDados()
        },[]
    )
    function returnDados(){
         
        const telEscolhedor = "+5519997335710"
        firebase.database().ref("users").orderByChild("tel").equalTo(telEscolhedor).once("value", users =>{  
            console.warn(users)
            users.forEach(data=>
                {
                    const dataJSON =  JSON.parse(JSON.stringify(data) ) 
                    
                    setRepository(
                        {
                            ...repository,
                            tel:'19997335710',
                            nome: dataJSON.nome,
                            dataNasc: dataJSON.data_nasc,
                            curso:dataJSON.curso
                        }
                    )
                }
            )
            // setRepository(
            //     {
            //         ...repository,
            //         tel:'19997335710',
            //         nome:''
            //     }
            // )

        })
 
    }


    return(
        <View style={styles.conteiner}>
            <HeaderPrim
                page="profile"
            />
            <ScrollView>
                <View style={styles.conteinerBack}>
                    <View style={styles.photo}>
                        <Image
                            source={{uri:`https://firebasestorage.googleapis.com/v0/b/wifae-1e225.appspot.com/o/%2B55${repository.tel}%2Fperfil.jpg?alt=media`}}
                            style={styles.conteinerImage}>   
                        </Image>
                    </View>

                    <View style={styles.conteinerLabel}>
                        <Text style={styles.label1}>{repository.nome}, 20</Text>
                        <Text style={styles.label2}>{repository.curso}</Text>
                    </View>

                    {/* <View style={styles.conteinerText}>
                        <TextField></TextField>
                    </View> */}

                    <View style={styles.conteinerBottom}>
                        <View style={styles.conteinerButtons}>
                            
                            <TouchableOpacity>
                                <View style={{height:50, width:50, backgroundColor:'#FFF', alignItems:'center', borderRadius:100}}>
                                    <Ionicons
                                        name={"md-settings"} 
                                        size={35} 
                                        color={'#000'} 
                                        style={{marginTop:'auto', marginBottom:'auto'}}
                                    />
                                </View>
                            </TouchableOpacity>

                            <View style={{marginTop:20}}>
                                 <TouchableOpacity>
                                    <View style={{height:50, width:50, backgroundColor:'#FFF', alignItems:'center', borderRadius:100}}>
                                        <IconMat
                                            name={"photo"} 
                                            size={35} 
                                            color={'#000'} 
                                            style={{marginTop:'auto', marginBottom:'auto'}}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity>
                                <View style={{height:50, width:50, backgroundColor:'#FFF', alignItems:'center', borderRadius:100}}>
                                    <IconCommu
                                        name={"pencil"} 
                                        size={35} 
                                        color={'#000'} 
                                        style={{marginTop:'auto', marginBottom:'auto'}}
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
        paddingTop:"10%",
        paddingRight:"10%",
        paddingLeft:"10%",
        // backgroundColor: colors.primary,

    },
    conteinerLabel:{
        paddingTop:15,
        alignItems:'center'
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
    },
    label2:{
        color:"#fff",
        fontFamily:fonts.regular,
        fontSize:20, 
    }
})