/*Modules*/
import React, {
    useState,
    useEffect
} from "react"
import {
    ImageBackground,
    StyleSheet,
    Text,
    View
} from "react-native"
import firebase from "react-native-firebase"
import { TextField } from "react-native-material-textfield"
/*Components*/
import {ButtonPrimary} from "../components/Buttons"
/*Styles*/
import colors from "../styles/colors"
import fonts from "../styles/fonts"
/*Image*/
import background from "../../assets/image/background.png"
/*Functions and Constants*/
import {
    formatPhoneBrazil,
    replaceAll
} from "../functions"
export default function Code(props){
    const [repositories, setRepositories] = useState({
        button:"Continuar",
        code1:"",
        code2:"",
        code4:"",
        code5:"",
        code6:"",
        error_phone:"",
        is_loading:true
    })

    useEffect(()=>{
        tryLogin()
    },[])

    function tryLogin(){
        firebase.auth()
        .verifyPhoneNumber(props.phone)
        .on('state_changed', (phoneAuthSnapshot) => { 
            switch (phoneAuthSnapshot.state) { 
            case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
                // console.warn('code sent'); 
                break;
            case firebase.auth.PhoneAuthState.ERROR: // or 'error'
                console.warn('verification error');
                // console.warn(phoneAuthSnapshot.error);
                break;
 
            case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
                console.warn('auto verify on android timed out'); 
                break;
            case firebase.auth.PhoneAuthState.AUTO_VERIFIED: 
                // console.warn('auto verified on android');
                // console.warn(phoneAuthSnapshot); 
                
                setRepositories(
                    {
                        isLoading:true, 
                        button:"Analisando code. . ."
                    }
                )
                alert("CODE CONFIRMADO")
                break;
            }
        }, (error) => {
            // optionalErrorCb would be same logic as the ERROR case above,  if you've already handed
            // the ERROR case in the above observer then there's no need to handle it here
            console.warn(error);
            // verificationId is attached to error if required
            console.warn(error.verificationId);
        }, (phoneAuthSnapshot) => {
            // optionalCompleteCb would be same logic as the AUTO_VERIFIED/CODE_SENT switch cases above
            // depending on the platform. If you've already handled those cases in the observer then
            // there's absolutely no need to handle it here.

            // Platform specific logic:
            // - if this is on IOS then phoneAuthSnapshot.code will always be null
            // - if ANDROID auto verified the sms code then phoneAuthSnapshot.code will contain the verified sms code
            //   and there'd be no need to ask for user input of the code - proceed to credential creating logic
            // - if ANDROID auto verify timed out then phoneAuthSnapshot.code would be null, just like ios, you'd
            //   continue with user input logic.
            console.log(phoneAuthSnapshot);
        });
    }

    return(
        <View style={styles.conteiner}>
            <ImageBackground 
                source={background}
                style={styles.conteiner}
            > 
                <View style={styles.conteinerGlobal}>
                    <View style={{ height:"24%"}}/>
                    <View style={styles.conteinerCenter}>
                        <View style={styles.conteinerLine}>
                            <Text style={styles.title}>Digite o</Text>
                            <Text style={[styles.title,{color:colors.primary}]}> Código</Text>
                        </View> 
                        <View style={styles.conteinerNumber}> 

                            <View style={styles.conteinerPhone}>
                                <TextField
                                    fontSize={16} 
                                    keyboardType="numeric"
                                    label=""
                                    maxLength={1}
                                    autoCapitalize='none'                        
                                    labelTextStyle={{fontFamily:fonts.medium}}
                                    onChangeText={value => setRepositories({...repositories, code1:value})}
                                    style={{fontFamily:fonts.medium, color:colors.primary}}
                                    textColor={colors.secundary}
                                    tintColor={colors.primary}
                                    baseColor={colors.primary}
                                    value={repositories.code1}
                                />
                            </View>
                            
                            <View style={styles.conteinerPhone}>
                                <TextField
                                    fontSize={16} 
                                    keyboardType="numeric"
                                    label=""
                                    maxLength={1}
                                    autoCapitalize='none'                        
                                    labelTextStyle={{fontFamily:fonts.medium}}
                                    onChangeText={value => setRepositories({...repositories, code2:value})}
                                    style={{fontFamily:fonts.medium, color:colors.primary}}
                                    textColor={colors.secundary}
                                    tintColor={colors.primary}
                                    baseColor={colors.primary}
                                    value={repositories.code2}
                                />
                            </View>
                            
                            <View style={styles.conteinerPhone}>
                                <TextField
                                    fontSize={16} 
                                    keyboardType="numeric"
                                    label=""
                                    maxLength={1}
                                    autoCapitalize='none'                        
                                    labelTextStyle={{fontFamily:fonts.medium}}
                                    onChangeText={value => setRepositories({...repositories, code4:value})}
                                    style={{fontFamily:fonts.medium, color:colors.primary}}
                                    textColor={colors.secundary}
                                    tintColor={colors.primary}
                                    baseColor={colors.primary}
                                    value={repositories.code3}
                                />
                            </View>

                            <View style={styles.conteinerPhone}>
                                <TextField
                                    fontSize={16} 
                                    keyboardType="numeric"
                                    label=""
                                    maxLength={1}
                                    autoCapitalize='none'                        
                                    labelTextStyle={{fontFamily:fonts.medium}}
                                    onChangeText={value => setRepositories({...repositories, code4:value})}
                                    style={{fontFamily:fonts.medium, color:colors.primary}}
                                    textColor={colors.secundary}
                                    tintColor={colors.primary}
                                    baseColor={colors.primary}
                                    value={repositories.code4}
                                />
                            </View>
                            
                            <View style={styles.conteinerPhone}>
                                <TextField
                                    fontSize={16} 
                                    keyboardType="numeric"
                                    label=""
                                    maxLength={1}
                                    autoCapitalize='none'                        
                                    labelTextStyle={{fontFamily:fonts.medium}} 
                                    onChangeText={value => setRepositories({...repositories, code5:value})}
                                    style={{fontFamily:fonts.medium, color:colors.primary}}
                                    textColor={colors.secundary}
                                    tintColor={colors.primary}
                                    baseColor={colors.primary}
                                    value={repositories.code5}
                                />
                            </View>

                            <View style={styles.conteinerPhone}>
                                <TextField
                                    fontSize={16} 
                                    keyboardType="numeric"
                                    label=""
                                    maxLength={1}
                                    autoCapitalize='none'                        
                                    labelTextStyle={{fontFamily:fonts.medium}}
                                    onChangeText={value => setRepositories({...repositories, code6:value})}
                                    style={{fontFamily:fonts.medium, color:colors.primary}}
                                    textColor={colors.secundary}
                                    tintColor={colors.primary}
                                    baseColor={colors.primary}
                                    value={repositories.code6}
                                />
                            </View>
                        </View>
                        <ButtonPrimary
                            onPress={() => sendMessage()}
                            isLoading={repositories.is_loading}
                            label={repositories.button}
                        />

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
    conteinerCenter:{
        alignSelf:"center",
        width:"90%"
    },
    conteinerLine:{
        flexDirection:"row"
    },
    conteinerDDD:{
        width:75
    },
    conteinerPhone:{
        width:35
    },
    conteinerNumber:{
        marginLeft:"auto",
        marginRight:"auto",
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:"20%",
        marginBottom:70,
        width:"100%"

    },
    title:{
        color:colors.secundary,
        fontFamily:fonts.bold,
        fontSize:23
    }
})