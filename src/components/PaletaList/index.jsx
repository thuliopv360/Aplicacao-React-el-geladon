import "./style.css";
import PaletaListItem from "components/PaletaListItem";
import { PaletaService } from 'services/PaletaService.js';
import { useState, useEffect, useCallback } from 'react';
import PaletaDetalhadaModal from 'components/PaletaDetalhadaModal'
import { ActionMode } from "constants";

function PaletaList({ paletaCreated, mode, updatePaleta, deletePaleta, editedPaleta, paletaRemoved }) {

    const selecionadas = JSON.parse(localStorage.getItem('selecionadas')) ?? {};

    const [paletas, setPaletas] = useState([]);

    const [paletaSelecionada, setPaletaSelecionada] = useState(selecionadas);

    const [paletaModal, setPaletaModal] = useState(false);

    const putItem = (paletaIndex) => {
        const paleta = { [paletaIndex]: (paletaSelecionada[paletaIndex] || 0) +1 }
        setPaletaSelecionada({ ...paletaSelecionada, ...paleta});
      }

    const setSelecionadas = useCallback(() => {
        if(!paletas.length) return
    
        const entries = Object.entries(paletaSelecionada);
        const sacola = entries.map(arr => ({
          paletaId: paletas[arr[0]].id,
          quantidade: arr[1]
        }))
    
        localStorage.setItem('sacola', JSON.stringify(sacola))
        localStorage.setItem('selecionadas', JSON.stringify(paletaSelecionada))
      }, [ paletaSelecionada, paletas ])


    const deleteItem = (paletaIndex) => {
        const paleta = { [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) - 1 };
        setPaletaSelecionada({ ...paletaSelecionada, ...paleta });
    }

    const getList = async () => {
        const response = await PaletaService.getList();
        setPaletas(response);
    }

    const getPaletaById = async (paletaId) => {
        const response = await PaletaService.getById(paletaId);

        const mapper = {
            [ActionMode.NORMAL]: () => setPaletaModal(response),
            [ActionMode.ATUALIZAR]: () => updatePaleta(response),
            [ActionMode.DELETAR]: () => deletePaleta(response)
        };
        mapper[mode]();
    }

    const putPaletaInList = useCallback(
        (paleta) => {
            const list = [...paletas, paleta];
            setPaletas(list)
        },
        [paletas]
    );


    useEffect(() => {
        if (
            paletaCreated &&
            !paletas.map(({ id }) => id).includes(paletaCreated.id)
        ) {
            putPaletaInList(paletaCreated);
        }
    }, [putPaletaInList, paletaCreated, paletas]);

    useEffect(() => {
        getList();
    }, [editedPaleta, paletaRemoved]);

    useEffect(() => {
        setSelecionadas();
      }, [ setSelecionadas, paletaSelecionada ]);

    return (
        <div className="PaletaList">
            {paletas.map((paleta, index) =>
                <PaletaListItem
                    mode={mode}
                    key={`PaletaListaItem-${index}`}
                    paleta={paleta}
                    amountSelected={paletaSelecionada[index]}
                    index={index}
                    onRemove={index => deleteItem(index)}
                    onAdd={index => putItem(index)}
                    clickItem={(paletaId) => getPaletaById(paletaId)}
                />
            )}
            {paletaModal && <PaletaDetalhadaModal paleta={paletaModal} closeModal={() => setPaletaModal(false)} />}
        </div>
    )
}

export default PaletaList