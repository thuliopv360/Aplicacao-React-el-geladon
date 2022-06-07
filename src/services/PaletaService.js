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

const parseTransformList = (response) => parseResponse(response).then((paletas) => paletas.map(transformPaleta))

const parseTransformItem = (response) => parseResponse(response).then(transformPaleta)

export const PaletaService = {
  getList: () => fetch(Api.paletaList(), { method: "GET" }).then(parseTransformList),
  getById: (id) =>
    fetch(Api.paletaById(id), { method: "GET" }).then(parseTransformItem),
  create: () =>
    fetch(Api.createPaleta(), { method: "POST" }).then(parseResponse),
  updateById: (id) =>
    fetch(Api.updatePaletaById(), { method: "PUT" }).then(parseResponse),
  deleteById: (id) =>
    fetch(Api.deletePaletaById(), { method: "DELETE" }).then(parseResponse),
};
