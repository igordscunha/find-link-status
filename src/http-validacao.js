function extraiLinks(arrLinks) {
    return arrLinks.map((link) => Object.values(link).join())
}

async function checaStatus(listaURL) {
    const arrStatus = await Promise.all(
        listaURL.map(async (url) => {
            try {
                const res = await fetch(url, {redirect: 'manual'})
                return res.status
            }
            catch (erro) {
                return manejaErro(erro)
            }
        })
    )
    return arrStatus
}

function manejaErro (erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'Este link não existe...'
    }
}

export default async function listaValidada(listaDeLinks) {
    const links = await extraiLinks(listaDeLinks)
    const status = await checaStatus(links)

    return listaDeLinks.map((objeto, index) => ({
        ...objeto,
        status: status[index]
    }))
}