import "./style.css";
import { ActionMode } from "constants";
import { useState } from "react";
import PaletaList from "components/PaletaList";
import Header from "components/Header";
import PutAndEditPaletaModal from "components/PutAndEditPaletaModal";
import { SacolaService } from "services/SacolaService";
import SacolaModal from "components/SacolaModal";

function Home() {
  const [canOpenBag, setCanOpenBag] = useState();
  const [paletaEdited, setPaletaEdited] = useState();
  const [canShow, setCanShow] = useState(false);
  const [paletaForPut, setPaletaForPut] = useState();
  const [currentMode, setCurrentMode] = useState(ActionMode.NORMAL);

  const handleActions = (action) => {
    const newAction = currentMode === action ? ActionMode.NORMAL : action;
    setCurrentMode(newAction)
  }

  const [paletaForEdit, setPaletaForEdit] = useState();
  const [paletaForDelete, setPaletaForDelete] = useState();

  const handleDeletePaleta = (paletaToDelete) => {
    setPaletaForDelete(paletaToDelete)
  }

  const handleUpdatePaleta = (paletaToUpdate) => {
    setPaletaForEdit(paletaToUpdate);
    setCanShow(true);
  }

  const handleCloseModal = () => {
    setCanShow(false);
    setPaletaForPut();
    setPaletaForDelete();
    setPaletaForEdit();

    setCurrentMode(ActionMode.NORMAL);
  }
  
  const abrirSacola = async () => {
    const lista = JSON.parse(localStorage.getItem('sacola'));
    const sacola = lista.filter(i => i.quantidade > 0);
  
    await SacolaService.create(sacola)
  
    setCanOpenBag(true)
  }
  

  return (
    <div className="Home">
      <Header
        mode={currentMode}
        createPaleta={() => setCanShow(true)} 
        updatePaleta={() => handleActions(ActionMode.ATUALIZAR)}
        deletePaleta={() => handleActions(ActionMode.DELETAR)}
        openBag={abrirSacola}
      />
      <div className="HomeContainer">
        <PaletaList
          mode={currentMode}
          paletaCreated={paletaForPut}
          editedPaleta={paletaEdited}
          deletePaleta={handleDeletePaleta}
          updatePaleta={handleUpdatePaleta}
        />
        {
          canShow && (<PutAndEditPaletaModal
            mode={currentMode}
            paletaToUpdate={paletaForEdit}
            closeModal={handleCloseModal}
            onCreatePaleta={(paleta) => setPaletaForPut(paleta)}
            onUpdatePaleta={(paleta) => setPaletaEdited(paleta)}
          />)
        }
        {
          canOpenBag &&
          <SacolaModal closeModal={() => setCanOpenBag(false)}/>
        }
      </div>
    </div>
  );
}



export default Home;