import { Api } from "helpers/Api";

const parseResponse = (response) => response.json();

const transformPaleta = (paleta) => {
    const [sabor, recheio] = paleta.sabor.split(" com ");
    return {
        ...paleta,
        id: paleta._id,
        titulo: paleta.sabor,
        sabor,
        ...(recheio && {recheio}),
        possuiRecheio: Boolean(recheio)
    }
};

const parseTrensformList = (response) => parseResponse(response).then((paletas) => paletas.map(transformPaleta))

export const PaletaService = {
  getList: () => fetch(Api.paletaList(), { method: "GET" }).then(parseTrensformList),
  getById: (id) =>
    fetch(Api.paletaById(), { method: "GET" }).then(parseResponse),
  create: () =>
    fetch(Api.createPaleta(), { method: "POST" }).then(parseResponse),
  updateById: (id) =>
    fetch(Api.updatePaletaById(), { method: "PUT" }).then(parseResponse),
  deleteById: (id) =>
    fetch(Api.deletePaletaById(), { method: "DELETE" }).then(parseResponse),
};
