import './style.css'


function PaletaListItem({paleta,amountSelected, index, onRemove, onAdd}) {
    // funcao que faz o span aparecer na pagina quando nao esta com 0 items
    const badgeCounter = (canRender, index) => Boolean(canRender) && (<span className="PaletaListItemBadge">{amountSelected}</span>)

    // funcao que faz o botao Remover aparecer
    const removeButton = (canRender, index) => Boolean(canRender) && (<button className="ActionRemove" onClick={() => onRemove(index)}>Remover
        <i className="bi bi-trash"></i></button>)


    return (
        <div className="PaletaListItem">
            {badgeCounter(amountSelected, index)}
            <div>
                <div className="PaletaListItemTitulo">{paleta.titulo}</div>
                <div className="PaletaListItemPreco"> R$ {paleta.preco}</div>
                <div className="PaletaListItemDescricao">{paleta.descricao}</div>
                <div className="PaletaListItemAction Action">
                    <button className={`ActionPut ${!amountSelected && "ActionPutFill"}`} onClick={() => onAdd(index)}>Adicionar  <i className="bi bi-plus-square"></i></button>
                    {removeButton(amountSelected, index)}
                </div>
            </div>
            <img src={paleta.foto} className="PaletaListItemFoto" alt={`Paleta de ${paleta.sabor}`} />
        </div>
    )
}


export default PaletaListItem;