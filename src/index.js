import fs from 'fs'
import chalk from 'chalk'

// function promessa(teste) {
//     const x = teste
//     return new Promise((resolve, reject) => {
//         if (!x) {
//             reject(new Error("Falha na promessa"))
//         }
//         resolve("Sucesso na promessa")
//     })
// }


// function exibeResposta(textoResult){
//     console.log(textoResult)
// }

// promessa(true)
//     .then((texto) => exibeResposta(texto))

// function procuraArquivo(caminhoDoArquivo){
//     const encoding = "utf-8"
//     fs.readFile(caminhoDoArquivo, encoding, (erro, resposta) => {
//         if (erro){
//             deuErro(erro)
//         }
//         console.log(chalk.green(resposta))
//     })
// }

// function procuraArquivo(caminhoDoArquivo){
//     const encoding = "utf-8"
//     fs.promises.readFile(caminhoDoArquivo, encoding)
//     .then((resposta) => console.log(chalk.green(resposta)))
//     .catch(deuErro)
// }


function deuErro(erro){
    console.log(erro)
    throw new Error(chalk.red(erro.code, "Alguma coias deu errado..."))
}

function extraiLinks (texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm

    const capturas = [...texto.matchAll(regex)]
    const resultados = capturas.map((resultado) => ({[resultado[1]]: resultado[2]}))

    return resultados
}

async function procuraArquivo(caminhoDoArquivo){
    try {
        const encoding = "utf-8"
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
        return extraiLinks(texto)
    }
    catch(erro) {
        deuErro(erro)
    }
    finally {
        console.log(chalk.blue('Operação concluída, verifique se tudo ocorreu bem ou tente novamente...'))
    }
}

export default procuraArquivo