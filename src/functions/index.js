export function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

export function formatPhoneBrazil(valor_anterior ,valor_alterado){
    if(valor_alterado.indexOf(".") == -1 && valor_alterado.indexOf(",") == -1){
        if(valor_alterado.length > valor_anterior.length){
            if(valor_alterado.length > 2){
                if(valor_alterado.indexOf(" ") < 0)
                    valor_alterado = valor_alterado.substring(0, 2)+" "+valor_alterado.substring(2)
                else{
                    if(valor_alterado.match(/ /g).length > 1){
                        valor_alterado = replaceAll(valor_alterado, " ", "")
                        valor_alterado = valor_alterado.substring(0, 2)+" "+valor_alterado.substring(2)
                    }
                    else
                        if(valor_alterado.indexOf(" ") != 2){
                            valor_alterado = replaceAll(valor_alterado, "-", "")
                            valor_alterado = valor_alterado.substring(0, 2)+" "+valor_alterado.substring(2)
                        }
                }
                if(valor_alterado.length >= 9){
                    if(valor_alterado.indexOf("-") < 0){
                        valor_alterado = valor_alterado.substring(0, 8)+"-"+valor_alterado.substring(8)
                    }else{
                        if(valor_alterado.match(/-/g).length > 1){
                            valor_alterado = replaceAll(valor_alterado, "-", "")
                            valor_alterado = valor_alterado.substring(0, 8)+"-"+valor_alterado.substring(8)
                        }else
                            if(valor_alterado.indexOf("-") != 8){
                                valor_alterado = replaceAll(valor_alterado, "-", "")
                                valor_alterado = valor_alterado.substring(0, 8)+"-"+valor_alterado.substring(8)
                            }
                    }
                }else
                    valor_alterado = replaceAll(valor_alterado, "-", "")
                   
            }
        }
    }else{
        valor_alterado = replaceAll(valor_alterado, ".", "")
        valor_alterado = replaceAll(valor_alterado, ",", "")
        return valor_alterado
    }
    return valor_alterado
}