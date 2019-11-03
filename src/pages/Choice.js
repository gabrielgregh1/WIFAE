/*Modules*/
import React,{
    useState,
    useEffect
} from "react"
import {
    PermissionsAndroid,
    TouchableOpacity,
    ImageBackground,
    Image,
    StyleSheet,
    Text,
    View
} from "react-native"
import { createIconSetFromIcoMoon } from "react-native-vector-icons"
import IconIonic from "react-native-vector-icons/Ionicons"
import Geolocation  from "@react-native-community/geolocation"
import firebase  from "react-native-firebase"
import posed from "react-native-pose"
import axios  from "axios"
/*Components*/
import { HeaderPrim } from "../components/Headers"
/*Images*/
import perfil from "../../assets/image/perfil.png"
/*Styles*/
import fonts from "../styles/fonts"
/*Functions and Constants*/
import icoMoonConfig from "../../selection.json"
import colors from "../styles/colors"
import { Colors } from "react-native/Libraries/NewAppScreen"
  

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
            area_atuacao:false,
            isInfoAtivo:false,
            users:[],
            userExibido:{
                curso: null,
                data_nasc: null,
                foto_perfil: null,
                nome: null,
                sexo: null
            }
        }
    )

    useEffect(()=>{
        loadUsers()
        localAtuacao()
        

    },[])

    async function localAtuacao(){
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'App GPS Permission',
                'message': 'GPS App needs access to your location'
            }
        )
        if (granted) {
            Geolocation.watchPosition((position) => {
                lat = parseFloat(position.coords.latitude)
                lng = parseFloat(position.coords.longitude)
                console.warn(lat+" "+lng)
                axios.post("https://us-central1-wifae-1e225.cloudfunctions.net/coordsPosition",
                {
                    lat: lat,
                    lng: lng 
                }
                ).then(resp=>{
                    if(resp.data < 0.5){
                        alert("pode utilizar o app")
                    }else{
                        
                        alert("NAO pode utilizar o app")
                    }
                }).catch(err=>{
                    alert("ERROR:"+err)
                })
            } ,(error) => {
                console.warn( "ERROR"+JSON.stringify(error))  
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 })   
        }
    }

    function loadUsers(){
        const telEscolhedor = "+5519997335710"
        firebase.database().ref("users").once("value", users =>{ 
            let listUsers = []
            let firstUser = true
            let userExibido = null
            users.forEach(data=>{
                const dataJSON =  JSON.parse(JSON.stringify(data) ) 
                
                if(dataJSON.tel !== telEscolhedor){
                    listUsers.push( 
                            {
                                tel: dataJSON.tel,
                                curso: dataJSON.curso,
                                data_nasc: data.data_nasc,
                                foto_perfil: dataJSON.foto_perfil,
                                nome: dataJSON.nome,
                                sexo: dataJSON.sexo,
                                desc: dataJSON.desc
                            } 
                    )
                    if(firstUser){
                        userExibido={
                            tel: dataJSON.tel,
                            curso: dataJSON.curso,
                            data_nasc: dataJSON.data_nasc,
                            foto_perfil: dataJSON.foto_perfil,
                            nome: dataJSON.nome,
                            sexo: dataJSON.sexo,
                            desc: dataJSON.desc
                        }
                        firstUser=false
                    }
                }
            })
            setRepository(
                {
                    ...repository,
                    users:listUsers,
                    userExibido
                }
            )

        })
 
    }

    function changeAnimate(animate){
        if(!repository.isLoading){ 
            var users = repository.users
            var isFirst = true
            var like = 0
            users.shift() 
            const tel = repository.userExibido.tel
            const telEscolhedor = "+5519997335710"
             
            if(animate == "accept"){
                like=1
            } 

            users.forEach(data => 
                { 
                    if(isFirst){
                        userExibido={
                            tel: data.tel,
                            curso: data.curso,
                            data_nasc: data.data_nasc,
                            foto_perfil: data.foto_perfil,
                            nome: data.nome,
                            sexo: data.sexo,
                            desc: data.desc
                        } 
                        isFirst=false
                    } 
                }
            )
            if(!isFirst){
                console.warn(users)
                firebase.database().ref('likes/').push(
                    {
                        escolhedor:telEscolhedor,
                        escolhido:tel,
                        like:like
                    }
                ).then((data)=>
                    { 
                        console.warn('data ' , data) 
                    }
                ).catch((error)=>
                    { 
                        Alert.alert("Falha na conexão", "Verifique seu acesso a internet.") 
                        console.warn('data ' , error)
                    }
                )
                setRepository(
                    {
                        ...repository,
                        animate,
                        isLoading:true,
                        users:users
                    }
                )
                setTimeout(() => {
                    setRepository(
                        {
                            ...repository,
                            animate:"initial",
                            userExibido
                        }
                    )
                    setTimeout(() => {
                        setRepository(
                            {
                                ...repository,
                                animate:"neutral",
                                isLoading:false,
                                userExibido
                            }
                        )
                    },100)
                },200)
            }else{
                setRepository(
                    {
                        ...repository,
                        animate,
                        isLoading:true,
                        users:[],
                        userExibido:{
                            curso: null,
                            data_nasc: null,
                            foto_perfil: null,
                            nome: null,
                            sexo: null
                        }
                    }
                )
            }

        }
    }
    
    return(
        <View style={styles.conteiner}>
            <HeaderPrim 
                page="choice"
            />
            <View style={styles.conteinerBack}>
                {repository.userExibido.nome != null ?
                    <Box style={styles.photo} pose={repository.animate}>
                        <View style={styles.conteinerPhoto}>
                            {!repository.isInfoAtivo ?
                                <ImageBackground
                                    source={{uri:`https://firebasestorage.googleapis.com/v0/b/wifae-1e225.appspot.com/o/${repository.userExibido.foto_perfil}.png?alt=media&token=86b0facb-168e-45ed-a183-eaee44fcc768`}}
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
                                    <View style={styles.conteinerInfo}>
                                        <TouchableOpacity
                                            onPress={()=>setRepository({...repository, isInfoAtivo:!repository.isInfoAtivo})}
                                        >
                                            <Icon
                                                name={"info"} 
                                                size={20} 
                                                color={colors.primary} 
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </ImageBackground>
                            :
                            <View style={[styles.conteinerImage, {borderWidth:1}]}  >
                                <View style={ {padding:15, paddingBottom:0}}>
                                    <Text>Lorem ipsum hac ut litora vehicula imperdiet fusce donec, facilisis
                                     </Text>

                                </View>
                                <View style={styles.conteinerInfo}>
                                    <TouchableOpacity
                                        onPress={()=>setRepository({...repository, isInfoAtivo:!repository.isInfoAtivo})}
                                    >
                                        <IconIonic
                                            name={"ios-information"} 
                                            size={18} 
                                            color={"#fff"} 
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            }
                        </View>
                        {!repository.isInfoAtivo  &&
                        <View style={styles.conteinerLabel}>
                            <Text style={styles.label}>{repository.userExibido.nome}, 20</Text>
                            <Text style={styles.label}>{repository.userExibido.desc}</Text>
                        </View>
                        }
                    </Box>
                :
                    <View style={styles.semPhoto}/>
                }
                <View style={styles.conteinerBottom}>
                    <View style={styles.conteinerButtons}>
                        <TouchableOpacity
                            onPress={()=>  changeAnimate("refuse")}
                        >
                            <View style={{height:58, width:58, backgroundColor:colors.primary, alignItems:'center', borderRadius:100}}>
                                <IconIonic
                                    name={"md-close"} 
                                    size={40} 
                                    color="#FFF" 
                                    style={{marginTop:'auto', marginBottom:'auto'}}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>  changeAnimate("accept")}
                        >
                            <View style={{height:58, width:58, backgroundColor:colors.primary, alignItems:'center', borderRadius:100}}>
                                <IconIonic
                                    name={"ios-heart"} 
                                    size={40} 
                                    color="#FFF" 
                                    style={{marginTop:'auto', marginBottom:'auto'}}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
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
        height:20,
        width:20,
        backgroundColor:'#FFF'
    },
    conteinerPhoto:{
        height:"85%",
        width:"100%",
    },
    conteinerLabel:{
        paddingTop:15
    },
    conteinerVotos:{
        padding:15,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    photo:{
        height:"75%",
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
    }
})