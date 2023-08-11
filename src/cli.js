import chalk from 'chalk'
import fs from 'fs'
import procuraArquivo from './index.js'
import listaValidada from './http-validacao.js'

const path = process.argv

async function imprimeLista(validacao, resultado, identificador = '') {

    if (validacao) {
        console.log(
            chalk.yellow('Status dos links:'),
            chalk.black.bgGreen(identificador),
            await listaValidada(resultado)
        )
    } else {
        console.log(
            chalk.yellow('Lista completa de links dentro do arquivo:'),
            chalk.black.bgGreen(identificador),
            resultado
        )
    }
}

async function processaTexto(endereco) {
    const path = endereco[2]
    const validacao = endereco[3] === '--valida'

    try {
        fs.lstatSync(path)
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log(chalk.black.bgRed('Arquivo ou diretório não existe...'))
            return
        }
    }

    if (fs.lstatSync(path).isFile()) {
        const resultado = await procuraArquivo(path)
        imprimeLista(validacao, resultado)

    } else if (fs.lstatSync(path).isDirectory()) {
        const diretorio = await fs.promises.readdir(path)
        diretorio.forEach(async (arquivo) => {
            const lista = await procuraArquivo(`${path}/${arquivo}`)
            imprimeLista(validacao, lista, arquivo)
        })
    }
}

processaTexto(path)