import "./style.css"
import PaletaListItem from "components/PaletaListItem"
import { paletas } from "mocks/paletas.js"
import { useState } from 'react'


function PaletaList() {
    const [paletaSelecionada, setPaletaSelecionada] = useState({})

    const putItem = (paletaIndex) => {
        const paleta = { [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) + 1 };
        setPaletaSelecionada({ ...paletaSelecionada, ...paleta });
    }

    const deleteItem = (paletaIndex) => {
        const paleta = { [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) - 1 };
        setPaletaSelecionada({ ...paletaSelecionada, ...paleta });
    }

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
                />
            )}
        </div>
    )
}

export default PaletaList