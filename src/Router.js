/*Modules*/
import React from "react"
import {
    Router,
    Scene,
} from "react-native-router-flux"
/*Pages*/
import Code from "./pages/Code"
import Phone from "./pages/Phone"
import Wellcome from "./pages/Wellcome"
import Choice from "./pages/Choice"
import Perfil from "./pages/Perfil"
import Invate from "./pages/Invate" 
import Profile from "./pages/Profile"
import Convite from "./pages/Convite"
import Mensagens from "./pages/Mensagens"
import EditPolariod from "./pages/EditPolariod"
import InChat from "./pages/InChat"

export default () => {

    return(
        <Router>
            <Scene key="root">
                <Scene
                    key="wellcome"
                    component={Wellcome}
                    hideNavBar
                    
                /> 
                <Scene
                    key="phone"
                    component={Phone}
                    hideNavBar
                /> 
                <Scene
                    key="code"
                    component={Code}
                    hideNavBar
                /> 
                <Scene
                    key="choice"
                    component={Choice}
                    hideNavBar
                    initial
                /> 
                <Scene
                    key="perfil"
                    component={Perfil}
                    hideNavBar
                /> 
                <Scene
                    key="invate"
                    component={Invate}
                    hideNavBar
                    
                /> 
                <Scene
                    key="profile"
                    component={Profile}
                    hideNavBar
                    
                /> 
                <Scene
                    key="convite"
                    component={Convite}
                    hideNavBar
                    
                /> 
                <Scene
                    key="mensagem"
                    component={Mensagens}
                    hideNavBar
                    
                /> 
                <Scene
                    key="editPolariod"
                    component={EditPolariod}
                    hideNavBar
                    
                /> 
                
                <Scene
                    key="inChat"
                    component={InChat}
                    hideNavBar
                    // 
                /> 

            </Scene>
        </Router>
    )
}