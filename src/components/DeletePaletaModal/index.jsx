import './style.css'
import Modal from "components/Modal";
import { PaletaService } from "services/PaletaService";

function DeletePaletaModal({ closeModal, paletaParaDeletar, onDeletePaleta }) {
  const handleDelete = async (paleta) => {
    await PaletaService.deleteById(paleta.id);
    onDeletePaleta(paleta);
    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="DeletaPaletaModal">
        <h2>Confirmação</h2>
        <p>
          Você realmente deseja remover a Paleta de <b>{paletaParaDeletar.titulo}</b> do
          cardápio?
        </p>

        <img
          className="DeletaPaletaModal__foto"
          src={paletaParaDeletar.foto}
          alt={paletaParaDeletar.titulo}
        />

        <br />

        <div>
          <button
            onClick={() => handleDelete(paletaParaDeletar)}
            className="DeletaPaletaModal__confirmar"
          >
            {" "}
            Confirmar{" "}
          </button>
          <button onClick={closeModal} className="DeletaPaletaModal__cancelar">
            {" "}
            Cancelar{" "}
          </button>
        </div>
      </div>
    </Modal>
  );
}
export default DeletePaletaModal;