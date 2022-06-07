const PaletaContext = {
    paletaEndpoint: () => `${Api.baseUrl}/paletas`,
    paletaList: () => `${PaletaContext.paletaEndpoint()}/all-paletas`,
    paletaById: (id) => `${PaletaContext.paletaEndpoint()}/one-paleta/${id}`,
    createPaleta: () => `${PaletaContext.paletaEndpoint()}/create-paleta`,
    updatePaletaById: (id) => `${PaletaContext.paletaEndpoint()}/update-paleta/${id}`,
    deletePaletaById: (id) => `${PaletaContext.paletaEndpoint()}/delete-paleta/${id}`,
}

export const Api = {
    baseUrl: "https://api-elgeladonn.herokuapp.com",
    ...PaletaContext
}