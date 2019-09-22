/*Modules*/
import React,{
    useEffect,
    useState
} from "react"
import{
    Alert,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    PermissionsAndroid,
    Text,
    View
} from "react-native"
import { createIconSetFromIcoMoon } from "react-native-vector-icons"
import { TextField } from "react-native-material-textfield"
import firebase from "react-native-firebase"
import {Actions} from "react-native-router-flux"
import ImagePicker from "react-native-image-crop-picker"
// import ImagePicker from "react-native-image-picker"
/*Components*/
import {ButtonPrimary} from "../components/Buttons"
/*Styles*/
import colors from "../styles/colors"
import fonts from "../styles/fonts"
/*Images*/
import background from "../../assets/image/background.png"
/*Functions and Constants*/
import icoMoonConfig from "../../selection.json"
 
const Icon = createIconSetFromIcoMoon(icoMoonConfig, "icomoon", "icomoon.ttf")

export default function Perfil(props){
    const [repositories, setRepositories] = useState({
        error_nome:"",
        nome:"",
        curso:"",
        error_curso:"",
        data_nasc:"",
        error_data:"",
        sexo:"",
        error_sexo:"",
        tel:"",
        error_tel:"",
        desc:"",
        error_desc:"",
        sexo:"m",
        button:"Continuar",
        photo:""
    })

    useEffect(()=>{
        StatusBar.setBackgroundColor("rgba(0,0,0,.9)") 
        StatusBar.setTranslucent(false)
    },[])

    async function selectPhoto(){
        uploadImage()
        
        // const options = {
        //     title: 'Select Avatar',
        //     customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        //     storageOptions: {
        //       skipBackup: true,
        //       path: 'images',
        //     },
        // } 
        // const granted = await PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.CAMERA,
        //     {
        //         'title': 'App GPS Permission',
        //         'message': 'GPS App needs access to your location'
        //     }
        // )

        // if (granted) { 
        //     ImagePicker.showImagePicker(options, (response) => {
        //         console.warn('Response = ', response);
            
        //         if (response.didCancel) {
        //         console.warn('User cancelled image picker');
        //         } else if (response.error) {
        //         console.warn('ImagePicker Error: ', response.error);
        //         } else if (response.customButton) {
        //         console.warn('User tapped custom button: ', response.customButton);
        //         } else {

        //         // const source = { uri: response.uri };
        //         // uploadImage(response.uri)

        //         // You can also display the image using data:
        //         // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            
        //             // setRepositories(
        //             //     {
        //             //         ...repositories,
        //             //         photo: source,
        //             //     }
        //             // )
        //         }
        //     })
        // }
    }

    function uploadImage(imageURI){
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
            const filename = `${props.phone+"/perfil"}.${ext}`; // Generate unique name
            firebase
                .storage()
                .ref(`${filename}`)
                .putFile(image.path)  

                setRepositories(
                    {
                        ...repositories,
                        photo:image.data
                    }
                )
                console.warn(image.data)
          });
        // const ext = imageURI.split('.').pop(); // Extract image extension
        // const filename = `${"dale"}.${ext}`; // Generate unique name
        // try{
        //     firebase
        //         .storage()
        //         .ref(`tutorials/images/${filename}`)
        //         .putFile(imageURI) 
                 
        // }catch(err){}

            // firebase.storage.TaskEvent.STATE_CHANGED,
            // snapshot => {
            //   let state = {};
            //   state = {
            //     ...state,
            //     progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
            //   };
            //   if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            //     const allImages = this.state.images;
            //     allImages.push(snapshot.downloadURL);
            //     state = {
            //       ...state,
            //       uploading: false,
            //       imgSource: '',
            //       imageUri: '',
            //       progress: 0,
            //       images: allImages
            //     };
            //     AsyncStorage.setItem('images', JSON.stringify(allImages));
            //   }
            //   this.setState(state);
            // },
      };
    function saveDados(){
        const {curso, data_nasc, nome, sexo} = repositories
        if(curso != "" && data_nasc != "" && nome != "" && sexo != ""){
            setRepositories({...repositories,button:"Salvando dados. . ."})
        
            firebase.database().ref('users/').push({
                curso:repositories.curso,
                data_nasc:repositories.data_nasc,
                nome:repositories.nome,
                sexo:repositories.sexo,
                tel:props.phone
            }).then((data)=>{
                //success callback
                Actions.choice()
                console.warn('data ' , data)
                setRepositories({...repositories,button:"Continuar"})
            }).catch((error)=>{
                //error callback
                Alert.alert("Falha na conexão", "Verifique seu acesso a internet.")
                setRepositories({...repositories,button:"Continuar"})
                console.warn('data ' , error)
            })
        }else{
            Alert.alert("Campos não preenchidos", "Preencha todos os campos.")
        }

    }

    return(
        <View style={styles.conteiner}>
            <ImageBackground 
                source={background}
                style={styles.conteiner}
            > 
                <ScrollView>
                    <TouchableOpacity
                        onPress={() =>  selectPhoto()}
                    >
                        <View style={styles.conteinerPhoto}>
                            {/* <ImageBackground 
                                source={repositories.photo}
                                style={{height:"100%", width:"100%", elevation:2}}
                            > */}
                                {/* <Icon
                                    name={"photo"} 
                                    size={40} 
                                    color="#B3B3B3" 
                                    style={styles.perfil}
                                /> */}
                                <Icon
                                    name={"photo"} 
                                    size={30} 
                                    color="#B3B3B3" 
                                    style={styles.edit}
                                />
                            {/* </ImageBackground> */}
                        </View>
                    </TouchableOpacity>
                    <View style={styles.conteinerContent}>
                        <View style={styles.conteinerText}>
                            <View>
                                <TextField
                                    error={repositories.error_nome}
                                    fontSize={16}      
                                    placeholder="Nome"              
                                    placeholderTextColor={colors.primary}
                                    style={{fontFamily:fonts.regular}}
                                    onChangeText={value=>setRepositories({...repositories, nome:value})}
                                    textColor={colors.secundary}
                                    tintColor={colors.primary}
                                    baseColor={colors.primary}
                                    value={repositories.nome}
                                />
                            </View>
                            <View style={styles.conteinerTextField}>
                                <TextField
                                    error={repositories.error_data}
                                    fontSize={16} 
                                    placeholder="Data de Nascimento"              
                                    placeholderTextColor={colors.primary}
                                    style={{fontFamily:fonts.regular}}
                                    onChangeText={value=>setRepositories({...repositories, data_nasc:value})}
                                    textColor={colors.secundary}
                                    tintColor={colors.primary}
                                    baseColor={colors.primary}
                                    value={repositories.data_nasc}
                                />
                            </View>
                            <View style={[styles.conteinerTextField,{top:-20}]}>
                                <TextField
                                    error={repositories.error_curso}
                                    fontSize={16} 
                                    placeholder="Curso"           
                                    placeholderTextColor={colors.primary}
                                    style={{fontFamily:fonts.regular}}
                                    onChangeText={value=>setRepositories({...repositories, curso:value})}
                                    textColor={colors.secundary}
                                    tintColor={colors.primary}
                                    baseColor={colors.primary}
                                    value={repositories.curso}
                                />
                            </View>
                            <View style={[styles.conteinerTextField,{top:-30}]}>
                                <TextField
                                    error={repositories.error_desc}
                                    fontSize={16} 
                                    placeholder="Descrição"                      
                                    placeholderTextColor={colors.primary}
                                    style={{fontFamily:fonts.regular}}
                                    onChangeText={value=>setRepositories({...repositories, desc:value})}
                                    textColor={colors.secundary}
                                    tintColor={colors.primary}
                                    baseColor={colors.primary}
                                    value={repositories.desc}
                                />
                            </View>
                        </View>
                        <View style={styles.conteinerButton}>
                            <TouchableOpacity
                                onPress={()=>setRepositories({...repositories, sexo:"m"})}
                            >
                                <View style={styles.icon}> 
                                    <Icon
                                        name={"masc"} 
                                        size={25} 
                                        color={repositories.sexo == "m" ? colors.primary : "#FFF"} 
                                    />
                                    <Text style={[styles.label, repositories.sexo == "m" && styles.selected]}>Homem</Text>
                                </View>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                onPress={()=>setRepositories({...repositories, sexo:"f"})}
                            >
                                <View style={styles.icon}> 
                                    <Icon
                                        name={"feme"} 
                                        size={25} 
                                        color={repositories.sexo == "f" ? colors.primary : "#FFF"} 
                                    />
                                    <Text style={[styles.label, repositories.sexo == "f" && styles.selected]}>Mulher</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.conteinerButtonBot}>
                            <ButtonPrimary
                                label={repositories.button}
                                onPress={() => saveDados()}
                                
                            />
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    conteiner:{
        height:"100%",
        // paddingRight:"30%",
        // paddingLeft:"30%",
        width:"100%",
    },
    conteinerContent:{
        width:"100%",
        height:"100%"
    },
    conteinerText:{
        width:"70%",
        marginLeft:"auto",
        marginRight:"auto",
    },
    conteinerTextField:{
        position:"relative",
        top:-10
    },
    conteinerPhoto:{
        alignItems:"center",
        backgroundColor:"#FFF",
        borderRadius:100,
        height:90,
        marginLeft:"auto",
        marginRight:"auto",
        marginTop:50,
        width:90,
    },
    conteinerButton:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingLeft:"15%",
        paddingRight:"15%"
    },
    conteinerButtonBot:{
        marginTop:30,
        marginRight:"auto",
        marginLeft:"auto",
        width:"80%"
    },
    icon:{
        alignItems:"center"
    },
    label:{
        color:"#FFF",
        fontFamily:fonts.regular,
        fontSize:14,
    },
    perfil:{
        marginTop:"auto",
        marginBottom:"auto"
    },
    edit:{
        position:"absolute",
        top:73,
        marginTop:"auto",
        marginBottom:"auto"
    },
    selected:{
        fontFamily:fonts.bold,
        color:colors.primary, 
    }
})