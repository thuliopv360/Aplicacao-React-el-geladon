import "./style.css";
import PaletaListItem from "components/PaletaListItem";
import {PaletaService} from 'services/PaletaService.js';
import { useState, useEffect } from 'react';
import PaletaDetalhadaModal from 'components/PaletaDetalhadaModal'

function PaletaList() {

    const [paletas, setPaletas] = useState([]);

    const [paletaSelecionada, setPaletaSelecionada] = useState({});

    const [paletaModal,setPaletaModal] = useState(false);

    const putItem = (paletaIndex) => {
        const paleta = { [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) + 1 };
        setPaletaSelecionada({ ...paletaSelecionada, ...paleta });
    }

    const deleteItem = (paletaIndex) => {
        const paleta = { [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) - 1 };
        setPaletaSelecionada({ ...paletaSelecionada, ...paleta });
    }

    const getList = async() => {
        const response = await PaletaService.getList();
        setPaletas(response);
    }

    useEffect(() => {getList();},[])

    return (
        <div className="PaletaList">
            {paletas.map((paleta, index) =>
                <PaletaListItem
                    key={`PaletaListaItem-${index}`}
                    paleta={paleta}
                    amountSelected={paletaSelecionada[index]}
                    index={index}
                    onRemove={index => deleteItem(index)}
                    onAdd={index => putItem(index)}
                    clickItem={(paletaId) => setPaletaModal(paleta)}
                />
                )}
                {paletaModal && <PaletaDetalhadaModal paleta={paletaModal} closeModal={() => setPaletaModal(false)} />} 
        </div>
    )
}

export default PaletaList