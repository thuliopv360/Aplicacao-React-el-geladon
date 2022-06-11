import { useState } from "react";
import Header from "components/Header";
import PaletaList from "components/PaletaList";
import PutAndEditPaletaModal from "components/PutAndEditPaletaModal";
import "./style.css";
import { ActionMode } from "constants";

function Home() {
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
  }
  return (
    <div className="Home">
      <Header
        mode={currentMode}
        createPaleta={() => setCanShow(true)} updatePaleta={() => handleActions(ActionMode.ATUALIZAR)}
      />
      <div className="HomeContainer">
        <PaletaList
          mode={currentMode}
          paletaCreated={paletaForPut}
          deletePaleta={handleDeletePaleta}
          updatePaleta={handleUpdatePaleta}
        />
        {
          canShow && (<PutAndEditPaletaModal
            mode={currentMode}
            paletaToUpdate={paletaForEdit}
            closeModal={handleCloseModal}
            onCreatePaleta={(paleta) => setPaletaForPut(paleta)}
          />)
        }
      </div>
    </div>
  );
}



export default Home;