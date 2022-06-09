import { useState } from "react";
import Header from "components/Header";
import PaletaList from "components/PaletaList";
import PutPaletaModal from "components/PutPaletaModal";
import "./style.css";

function Home() {
  const [canShow, setCanShow] = useState(false);
  return (
    <div className="Home">
      <Header createPaleta={() => setCanShow(true)}/>
      <div className="HomeContainer">
        <PaletaList />
        {
          canShow && (<PutPaletaModal closeModal={() => setCanShow(false)}/>)
        }
      </div>
    </div>
  );
}



export default Home;