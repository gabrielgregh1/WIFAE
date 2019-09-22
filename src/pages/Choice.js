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
import firebase  from "react-native-firebase"
import posed from "react-native-pose"
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
    },[])

    function loadUsers(){
        firebase.database().ref("users").once("value", users =>{ 
            let listUsers = []
            let firstUser = true
            let userExibido = null
            users.forEach(data=>{
                const dataJSON =  JSON.parse(JSON.stringify(data) ) 
                listUsers.push( 
                        {
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
                        curso: dataJSON.curso,
                        data_nasc: dataJSON.data_nasc,
                        foto_perfil: dataJSON.foto_perfil,
                        nome: dataJSON.nome,
                        sexo: dataJSON.sexo,
                        desc: dataJSON.desc
                    }
                    firstUser=false
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
            users.shift() 
            users.forEach(data => 
                { 
                    if(isFirst){
                        userExibido={
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
                                    <TouchableOpacity>
                                        <Icon
                                            name={"info"} 
                                            size={20} 
                                            color="#B3B3B3" 
                                        />
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.conteinerLabel}>
                            <Text style={styles.label}>{repository.userExibido.nome}, 20</Text>
                            <Text style={styles.label}>{repository.userExibido.desc}</Text>
                        </View>
                    </Box>
                :
                    <View style={styles.semPhoto}/>
                }
                <View style={styles.conteinerBottom}>
                    <View style={styles.conteinerButtons}>
                        <TouchableOpacity
                            onPress={()=>  changeAnimate("refuse")}
                        >
                            <View>
                                <Icon
                                    name={"info"} 
                                    size={58} 
                                    color="#B3B3B3" 
                                />
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={()=>  changeAnimate("accept")}
                        >
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