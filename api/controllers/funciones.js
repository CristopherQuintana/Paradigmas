const ElimRepetidos = (frase) => {
    return [...new Set(frase.replace(/\W/g,"").toLowerCase().split(''))]
}

const Largo = (frase) => {return frase.length-1}

const FraseAMatriz = (str) => {

    let matrix = new Array(5).fill(0).map(()=> new Array(5).fill(0))
    const limit = str.length > 25 ? 25 : str.length 

    for(let i = 0; i < limit; i++){
        matrix[Math.floor(i/5)][i % 5] = str[i];
    }
    return matrix
}

const Encriptador = (matriz, frase, largo) => {
    const nuevo = new Array()
    for(let letra of frase){
        nuevo.push(EncriptadorLetra(matriz, letra, largo))
    }
    return nuevo.join('')
}

const EncriptadorLetra = (matriz, letra, largo) => {
    const largoI = Math.floor(largo/5)
    const largoJ = largo % 5
    let i;
    for(i = 0; i <= largoI; i++){
        let longJ = i < largoI ? 4 : largoJ
        for(let j = 0; j <= longJ; j++){
            if(letra === matriz[i][j]){
                if(j === 4 && i !== 4 && matriz[i+1][0] !== 0){  
                    return matriz[i+1][0]
                }
                else if(j !== 4 && matriz[i][j+1] !== 0){       
                    return matriz[i][j+1]
                }
                else if(j === largoJ && i === largoI){
                    return matriz[0][0]
                }
                else
                    return letra
            }
        }
    }
    return letra;
}

const Desencriptador = (matriz, frase, largo) => {
    const nuevo = new Array()
    for(let c of frase){
        nuevo.push(DesencriptadorLetra(matriz, c, largo))
    }
    return nuevo.join('')
}

const DesencriptadorLetra = (matriz, c, largo) => {
    const largoI = Math.floor(largo/5)
    const largoJ = largo % 5
    for(let i = 0; i <= largoI; i++){
        let longJ = i < largoI ? 4 : largoJ
        for(let j = 0; j <= longJ; j++){
            if(c === matriz[i][j]){
                if(j === 0 && i !== 0 && matriz[i-1][4] !== 0){
                    return matriz[i-1][4]
                }
                else if(j !== 0 && matriz[i][j-1] !== 0){
                    return matriz[i][j-1]
                }
                else if(j === 0 && i === 0){
                    return matriz[largoI][largoJ]
                }
                else
                    return c
            }
        }
    }
    return c;
}

module.exports = {
    ElimRepetidos,
    Largo,
    FraseAMatriz,
    Encriptador,
    Desencriptador
}