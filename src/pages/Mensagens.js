/*Modules*/
import React, {
    useState,
    useEffect
} from "react"
import {
    Image,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import firebase from "react-native-firebase"
/*Styles*/
import colors from "../styles/colors"
/*Components*/
import { HeaderPrim } from "../components/Headers"
/*Styles*/
import fonts from "../styles/fonts"
/*Images*/
import background from "../../assets/image/background.png"
import perfil from "../../assets/image/perfil.png"
import { Actions } from "react-native-router-flux"

export default function Mensagens(){
    
    const [repository, setRepository] = useState(
        {
            data:[
                // {
                //     key:"1"
                // },
                // {
                //     key:"2"
                // },
                // {
                //     key:"3"
                // },
                // {
                //     key:"4"
                // },
                // {
                //     key:"5"
                // },
                // {
                //     key:"6"
                // },
                // {
                //     key:"7"
                // }
            ],
            dataMsg:[]
        }
    )
    var mensagnsCompletas = []
    useEffect(()=>{
        carregarCombinacoes()

        setTimeout(()=>{
            setRepository({...repository,data:mensagnsCompletas })
        },5000)
    },[])

    function carregarCombinacoes(){ 
        var data = []
        firebase.database().ref('likes').orderByChild("escolhedor").equalTo("+5519997335710")
        .once("value", escolhedor =>
            {
                firebase.database().ref('likes').orderByChild("escolhido").equalTo("+5519997335710")
                .once("value", escolhido =>
                    { 

                        console.warn(JSON.stringify(escolhedor))
                        escolhido.forEach(itemEscolhi => 
                            {
                                itemEscolhido = JSON.parse(JSON.stringify(itemEscolhi))
                                if(itemEscolhido.like == 1){
                                    cadastrado = false

                                    console.warn("PASSOU=>>>>>"+escolhedor)

                                    escolhedor.forEach(itemEscolhe => 
                                        {
                                            itemEscolhedor = JSON.parse(JSON.stringify(itemEscolhe))
                                            // console.warn(itemEscolhedor.like+" == 1 && "+!cadastrado+
                                            //     "&& "+itemEscolhedor.escolhido+" == "+itemEscolhido.escolhedor)

                                            if(itemEscolhedor.like == 1 && !cadastrado 
                                                && itemEscolhedor.escolhido == itemEscolhido.escolhedor){
                                                cadastrado = true
                                                podeCadastrar = true
                                                data.forEach(element => {
                                                    console.warn("ASSSSSIM+>"+element)
                                                    if(element == itemEscolhedor.escolhido){
                                                        podeCadastrar=false
                                                    }
                                                }); 
                                                    

                                                if(podeCadastrar){
                                                    data.push(itemEscolhedor.escolhido)
                                                    console.warn("COMBINOU: "+(JSON.stringify(itemEscolhedor.escolhido)))
                                                    
                                                     
        

                                                } 
                                            }
                                        }
                                    )
                                    
                                }
                            }
                        )
                        data.forEach(element1 => 
                            {
                                console.warn(element1)
                                firebase.database().ref('users').orderByChild("tel").equalTo(element1)
                                .once("value", users =>
                                        { 
                                        console.warn(users)
                                        limit=0
                                        users.forEach(element => 
                                            {
                                                if(limit==0){
                                                    limit++
                                                    itemUsers = JSON.parse(JSON.stringify(element))
                                                    
                                                    dados = {
                                                        key:itemUsers.tel,
                                                        tel:itemUsers.tel,
                                                        nome:itemUsers.nome,
                                                        foto_perfil:itemUsers.foto_perfil
                                                    } 

                                                    mensagnsCompletas.push(dados)
                                                    
                                                   
                                                }
                                            }
                                        );
                                    }
                                )
                            }
                        )
                    }      
                )
            }
        )
    }

    return(
        <View style={styles.conteiner}>
            <HeaderPrim 
                page="mensagem"
            />
            <View style={styles.conteinerBody}>
                <View style={styles.conteinerHeader}>
                    <View style={styles.conteinerOptions}>
                        <View style={styles.conteinerlabel}>
                            <Text style={[styles.labelSelect,  {marginRight:"auto"}]}>Mensagens</Text>
                        </View>
                        <View style={styles.block}/>
                        <View style={styles.conteinerlabel}>
                            <Text style={[styles.label, {marginLeft:50}]}>Social</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.conteinerSearch}>

                </View>
                <View style={{flex:1}}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={repository.data}
                        // keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({item}) =>
                        <TouchableOpacity
                            onPress={()=>Actions.inChat({nome:item.nome, imagem:`https://firebasestorage.googleapis.com/v0/b/wifae-1e225.appspot.com/o/${item.foto_perfil}.png?alt=media&token=86b0facb-168e-45ed-a183-eaee44fcc768`})}
                        >
                            <View style={styles.conteinerMessage}>
                                <View style={styles.conteinerImage}>
                                    <Image 
                                        source={{uri:`https://firebasestorage.googleapis.com/v0/b/wifae-1e225.appspot.com/o/${item.foto_perfil}.png?alt=media&token=86b0facb-168e-45ed-a183-eaee44fcc768`}}
                                        style={styles.imagePerfil}
                                    />
                                </View>
                                <View style={styles.conteinerBlock}/>
                                <View style={styles.conteinerNome}>
                                    <View style={styles.conteinerText}>
                                        <Text style={styles.nome}>{item.nome}</Text>
                                        <Text style={styles.mensagem}>Disponivel</Text>
                                    </View>
                                    <View style={styles.qtdMensagens}>
                                        <Text style={styles.labelMenssage}>1</Text> 
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    />             
                    
                </View>
            </View>
        </View>
    )
}

// <Text>Social</Text>
// <View style={styles.block}/>
const styles = StyleSheet.create(
    {
        conteiner:{
            backgroundColor:"rgba(0,0,0,.9)",
            height:"100%",
            width:"100%",
        },
        conteinerBody:{
            // backgroundColor:"#FFF",
            height:"100%",
            marginLeft:"auto",
            marginRight:"auto",
            width:"90%",

        },
        conteinerHeader:{
            height:40,
            width:"100%",
            borderBottomWidth:1,
            marginLeft:"auto",
            marginRight:"auto",
            // flexDirection:"row",
            borderColor:colors.primary
        },
        conteinerOptions:{
            // backgroundColor:"blue",
            flexDirection:"row",
            height:40,
            marginRight:"auto",
            marginLeft:"auto",
            justifyContent:"space-between",
            width:"90%",
        },
        conteinerSearch:{
            backgroundColor:"#FFF",
            borderRadius:40,
            height:35,
            width:"100%",
            marginTop:15
        },
        conteinerlabel:{
            width:110
        },
        conteinerImage:{
            borderRadius:100,
            elevation:2,
            height:80,
            position:"absolute",
            width:80,
        },
        conteinerNome:{
            borderBottomRightRadius:40,
            borderTopRightRadius:40,
            backgroundColor:"rgba(53,51,51,1)",
            marginTop:3,
            height:70,
            paddingLeft:50,
            paddingTop:5,
            flexDirection:"row",
            justifyContent:"space-between",
            width:"87%",
        },
        conteinerMessage:{
            // flex:1,
            flexDirection:"row",
            marginTop:15
        },
        conteinerBlock:{
            backgroundColor:"rgba(0,0,0,0)",
            height:1,
            width:40
        },
        conteinerText:{
        },
        block:{
            backgroundColor:colors.primary,
            width:1,
            height:"80%",
            marginTop:"auto",
            marginBottom:"auto"
        },
        imagePerfil:{
            flex:1,
            borderRadius:100,
            height:"100%",
            width:"100%"
        },  
        label:{
            color:"#FFF",
            fontFamily:fonts.medium,
            fontSize:16,
            marginTop:"auto",
            marginBottom:"auto"
        },
        labelSelect:{
            color:colors.primary,
            fontFamily:fonts.medium,
            fontSize:16,
            marginTop:"auto",
            marginBottom:"auto",
        },
        qtdMensagens:{
            backgroundColor:"#FFF",
            borderRadius:100,
            height:20,
            marginTop:20,
            marginRight:20,
            width:20
        },
        labelMenssage:{
            color:colors.primary,
            fontFamily:fonts.medium,
            marginTop:"auto",
            marginBottom:"auto",
            marginRight:"auto",
            marginLeft:"auto"
        },
        nome:{
            color:"#FFF",
            fontFamily:fonts.regular,
            fontSize:16
        },
        mensagem:{
            color:"#FFF",
            fontFamily:fonts.regular,
            fontSize:12
        }
    }
)