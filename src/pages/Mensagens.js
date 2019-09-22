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
    View
} from "react-native"
/*Styles*/
import colors from "../styles/colors"
/*Components*/
import { HeaderPrim } from "../components/Headers"
/*Styles*/
import fonts from "../styles/fonts"
/*Images*/
import background from "../../assets/image/background.png"
import perfil from "../../assets/image/perfil.png"

export default function Mensagens(){
    
    const [repository, setRepository] = useState(
        {
            data:[
                {
                    key:"1"
                },
                {
                    key:"2"
                },
                {
                    key:"3"
                },
                {
                    key:"4"
                },
                {
                    key:"5"
                },
                {
                    key:"6"
                },
                {
                    key:"7"
                }
            ]
        }
    )


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
                    <View style={styles.conteinerMessage}>
                        <View style={styles.conteinerImage}>
                            <Image
                                source={perfil}
                                style={styles.imagePerfil}
                            />
                        </View>
                        <View style={styles.conteinerBlock}/>
                        <View style={styles.conteinerNome}>
                            <View style={styles.conteinerText}>
                                <Text style={styles.nome}>Ricardo Nunes</Text>
                                <Text style={styles.mensagem}>manda foto de agora gata</Text>
                            </View>
                            <View style={styles.qtdMensagens}>
                                <Text style={styles.labelMenssage}>1</Text> 
                            </View>
                        </View>
                    </View>
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