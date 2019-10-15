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
import { TextField } from "react-native-material-textfield"
import ImagePicker from "react-native-image-crop-picker"
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
            isEdit:false,
            users:[],
            userExibido:{
                curso: null,
                data_nasc: null,
                foto_perfil: null,
                nome: null,
                sexo: null
            }, 
            foto:"",
            desc:""
        }
    )

    useEffect(()=>{ 
    },[])


    function uploadImage(){
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            hideBottomControls:true,
            // useFrontCamera:true,
            cropperToolbarTitle:"Edite sua foto",
            includeBase64:true,
            forceJpg:true,
            enableRotationGesture:false
        }).then(image => {
            console.log(image); 
            const ext = image.path.split('.').pop(); // Extract image extension
            const filename = `${ "+5519997335710/perfil"}.${ext}`; // Generate unique name
            firebase
                .storage()
                .ref(`${filename}`)
                .putFile(image.path)  

                setRepository(
                    {
                        ...repository,
                        foto:image.path
                    }
                )
                console.warn(image.data)
        }); 
    } 

    // function send(){  
    //         firebase.database().ref('users').orderByChild("tel").equalTo("+5519997335710").set({
    //             desc:repository.desc
    //         }).then((data)=>{
    //             //success callback
    //             // Actions.choice()
    //             // console.warn('data ' , data)
    //             // setRepositories({...repositories,button:"Continuar"})
    //             alert("SALVOU")
    //         }).catch((error)=>{
    //             //error callback
    //             Alert.alert("Falha na conexão", "Verifique seu acesso a internet.")
           
    //         })
      
    // }


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
                                source={{uri:repository.foto!= "" ? repository.foto:`https://firebasestorage.googleapis.com/v0/b/wifae-1e225.appspot.com/o/%2B${"5519997335710"}%2Fperfil.jpg?alt=media&token=99d3244e-aa34-4613-85fa-252e9701517b`}}
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
                    {!repository.isEdit ? 
                        <View style={styles.conteinerLabel}>
                            <TouchableOpacity
                                onPress={()=>  uploadImage()}
                            >
                                <Image
                                    source={polaroid} 
                                    style={styles.images}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>  setRepository({...repository, isEdit:true})}
                            >
                            <Image
                                source={t} 
                                style={styles.images}
                            /> 
                            </TouchableOpacity>
                        </View>
                        :  
                            <View style={{width:"100%", position:"relative", top:-30, flexDirection:"row"}}>
                                <View style={{width:"90%"}}>
                                    <TextField
                                        fontSize={16} 
                                        label=""
                                        placeholder="escreva sua mensagem ..."
                                        autoCapitalize='none'                        
                                        labelTextStyle={{fontFamily:fonts.medium}}
                                        onChangeText={value => setRepository({...repository, desc:value})}
                                        style={{fontFamily:fonts.medium, color:"#000"}}
                                        textColor={"#000"}
                                        tintColor={"#000"}
                                        baseColor={"#000"}
                                        value={repository.desc}
                                    />
                                </View> 
                                <TouchableOpacity
                                    // onPress={() => send()}
                                >
                                    <Image
                                        source={t} 
                                        style={[styles.imageT,{marginTop:"auto",marginBottom:10}]}
                                    /> 
                                </TouchableOpacity>

                            </View> 
                    }

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
    },
    imageT:{
        height:20,
        width:20
    }
})