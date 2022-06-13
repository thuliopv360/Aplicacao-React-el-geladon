import { ActionMode } from 'constants';
import './style.css'

function PaletaListItem({ paleta, amountSelected, index, onRemove, onAdd, clickItem, mode }) {
    // funcao que faz o span aparecer na pagina quando nao esta com 0 items
    const badgeCounter = (canRender, index) => Boolean(canRender) && (<span className="PaletaListItemBadge">{amountSelected}</span>)

    const badgeAction = (canRender) => {
        if (canRender) return (
            <span
                className={ActionMode.ATUALIZAR === mode ? 'PaletaListItemTagEdit'
                    : ActionMode.DELETAR === mode ? 'PaletaListItemTagDelete'
                        : 'Deletar'}
            >
                {mode}
            </span>
        )
    }
    // funcao que faz o botao Remover aparecer
    const removeButton = (canRender, index) =>
        Boolean(canRender) && (<button disabled={mode !== ActionMode.NORMAL} className="ActionRemove" onClick={(e) => {
            e.stopPropagation();
            onRemove(index);
        }}>Remover<i className="bi bi-trash"></i></button>);



    return (
        <div 
        className={`PaletaListItem 
        ${mode !== ActionMode.NORMAL && 'PaletaListItem--disable'} 
        ${mode === ActionMode.DELETAR && 'PaletaListItem--delete'}`}
        onClick={() => clickItem(paleta._id)}>
            {badgeCounter(amountSelected, index)}
            {badgeAction(mode !== ActionMode.NORMAL)}
            <div>
                <div className="PaletaListItemTitulo">{paleta.titulo}</div>
                <div className="PaletaListItemPreco"> R$ {paleta.preco}</div>
                <div className="PaletaListItemDescricao">{paleta.descricao}</div>
                <div className="PaletaListItemAction Action">
                    <button
                        disabled={mode !== ActionMode.NORMAL}
                        className={`ActionPut ${!amountSelected && "ActionPutFill"} ${mode === ActionMode.ATUALIZAR && 'ButtonAtualizar--disable'}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            onAdd(index);
                        }}
                    >{ActionMode.ATUALIZAR === mode ? `Atualizar` : ActionMode.NORMAL === mode ? 'Adicionar' : 'Deletar'} <i className={ActionMode.NORMAL === mode ? `bi bi-plus-square` : ActionMode.ATUALIZAR === mode ? `bi bi-pencil` : `bi bi-trash`}></i>
                    </button>
                    {removeButton(amountSelected, index)}

                </div>
            </div>
            <img src={paleta.foto} className="PaletaListItemFoto" alt={`Paleta de ${paleta.sabor}`} />
        </div>
    )
}
// Adicionar bi bi-plus-square
// {ActionMode.ATUALIZAR === mode ? 'Atualizar esta Paleta' : ActionMode.DELETE === mode ? 'Deletar': 'Adicionar'}
export default PaletaListItem;