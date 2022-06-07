import './style.css';
import Modal from 'components/Modal'


function PaletaDetalhadaModal({paleta, closeModal}){
    return(
        <Modal closeModal={closeModal}>
            <div className="PaletaDetalhadaModal">
                <div>
                    <div className="PaletaDetalhadaModalTitulo">{paleta.titulo}</div>
                    <div className="PaletaDetalhadaModalPreco">R$ {paleta.preco}</div>
                    <div className="PaletaDetalhadaModalDescricao"><b>Sabor:</b>{paleta.sabor}</div>
                    {paleta.recheio &&<div className="PaletaDetalhadaModalDescricao"><b>Recheio:</b>{paleta.recheio}</div>}
                    <div className="PaletaDetalhadaModalDescricao"><b>Descricao:</b>{paleta.descricao}</div>
                </div>
                <img src={paleta.foto} alt={`Paleta de ${paleta.sabor}`} className="PaletaDetalhadaModalFoto" />
            </div>
        </Modal>
    );
}

export default PaletaDetalhadaModal;