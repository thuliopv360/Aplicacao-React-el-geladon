import { useState, useEffect } from 'react';
import Modal from 'components/Modal';
import './style.css';
import { PaletaService } from 'services/PaletaService';
import { ActionMode } from 'constants';

function PutAndEditPaletaModal({ closeModal, onCreatePaleta, mode, paletaToUpdate, onUpdatePaleta }) {

    const form = {
        preco: paletaToUpdate?.preco ?? "",
        sabor: paletaToUpdate?.sabor ?? "",
        recheio: paletaToUpdate?.recheio ?? "",
        descricao: paletaToUpdate?.descricao ?? "",
        foto: paletaToUpdate?.foto ?? ""
    };

    const [state, setState] = useState(form);
    const [canDisable, setCanDisable] = useState(true);

    const handleChange = (e, name) => {
        setState({ ...state, [name]: e.target.value })
    }


    const canDisableSendButton = () => {
        const response = !Boolean(
            state.descricao.length
            && state.foto.length
            && state.sabor.length
            && String(state.preco).length
        )
        setCanDisable(response)
    }

    useEffect(() => {
        canDisableSendButton();
    })


    const handleSend = async () => {
        const renamePath = (fotoPath) => fotoPath.split('/\\|\//').pop();

        const { sabor, recheio, descricao, preco, foto } = state;

        const titulo = sabor + (recheio && ' com ' + recheio);

        const paleta = {
            ...(paletaToUpdate && { _id: paletaToUpdate?.id }),
            sabor: titulo,
            descricao,
            preco,
            foto: `assets/images/${renamePath(foto)}`
        }
        const serviceCall = {
            [ActionMode.NORMAL]: () => PaletaService.create(paleta),
            [ActionMode.ATUALIZAR]: () => PaletaService.updateById(paletaToUpdate?.id, paleta)
        }

        const response = await serviceCall[mode]();

        const actionResponse = {
            [ActionMode.NORMAL]: () => onCreatePaleta(response),
            [ActionMode.ATUALIZAR]: () => onUpdatePaleta(response)
        }

        actionResponse[mode]();

        const reset = {
            preco: "",
            sabor: "",
            recheio: "",
            descricao: "",
            foto: ""
        }

        setState(reset);

        closeModal();
        console.log("Ola")

    }
    return (
        <Modal
            closeModal={closeModal}
        >
            <div className="PutPaletaModal">
                <form autoComplete="off">
                    <h2>{ActionMode.ATUALIZAR === mode ? 'Atualizar' : 'Adicionar ao'} Cardápio</h2>
                    <div>
                        <label
                            htmlFor="sabor"
                            className="PutPaletaModalText">Sabor: </label>
                        <input
                            type="text"
                            id="sabor"
                            placeholder="Chocolate"
                            value={state.sabor}
                            onChange={(e) => handleChange(e, "sabor")}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="recheio"
                            className="PutPaletaModalText">Recheio: </label>
                        <input
                            type="text"
                            id="recheio"
                            placeholder="Banana"
                            value={state.recheio} onChange={(e) => handleChange(e, "recheio")}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="preco"
                            className="PutPaletaModalText">Preco: </label>
                        <input
                            type="text"
                            id="preco"
                            placeholder="R$ 10.00"
                            value={state.preco} onChange={(e) => handleChange(e, "preco")}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="descricao"
                            className="PutPaletaModalText">Descricao: </label>
                        <input
                            type="text"
                            id="descricao"
                            placeholder="Detalhe o produto"
                            value={state.descricao} onChange={(e) => handleChange(e, "descricao")}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="foto"
                            className="PutPaletaModalText PutPaletaModalFotoLabel">
                            {!state.foto.length ? "Selecione Uma Imagem" : state.foto}
                        </label>
                        <input
                            className="PutPaletaModalFoto"
                            type="file" accept="image/png, image/gif, image/jpeg"
                            id="foto" onChange={(e) => handleChange(e, "foto")}
                            required
                        />
                    </div>
                    <button
                        className="PutPaletaModalSubmit"
                        type="button"
                        disabled={canDisable}
                        onClick={handleSend}
                    >
                        {ActionMode.NORMAL === mode ? 'Enviar' : 'Atualizar'}
                    </button>
                </form>
            </div>
        </Modal>
    )
}

export default PutAndEditPaletaModal