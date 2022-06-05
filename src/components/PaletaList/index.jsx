import "./style.css"
import { paletas } from "../../mocks/paletas.js"
import { useState } from 'react'

function PaletaList() {

    const [paletaSelecionada, setPaletaSelecionada] = useState({})

    const adicionarItem = (paletaIndex) => {
        const paleta = { [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) + 1};
        setPaletaSelecionada({...paletaSelecionada, ...paleta});
    } 
 
    return (
        <div className="PaletaList">
            {paletas.map((paleta, index) =>
                <div className="PaletaListItem" key={`PaletaListItem${index}`}>
                    <span className="PaletaListItemBadge">{paletaSelecionada[index] || 0}</span>
                    <div>
                        <div className="PaletaListItemTitulo">{paleta.titulo}</div>
                        <div className="PaletaListItemPreco"> R$ {paleta.preco}</div>
                        <div className="PaletaListItemDescricao">{paleta.descricao}</div>
                        <div className="PaletaListItemAction Action">
                            <button className="ActionPut ActionPutFill" onClick={() => adicionarItem(index)}>Adicionar</button>
                        </div>
                    </div>
                    <img src={paleta.foto} className="PaletaListItemFoto" alt={`Paleta de ${paleta.sabor}`} />
                </div>
            )}
        </div>
    )
}

export default PaletaList