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

export default () => {

    return(
        <Router>
            <Scene key="root">
                <Scene
                    key="wellcome"
                    component={Wellcome}
                    hideNavBar
                    initial
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
                

            </Scene>
        </Router>
    )
}