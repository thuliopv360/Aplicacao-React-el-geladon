import Header from "components/Header";
import PaletaList from "components/PaletaList";
import "./style.css";

function Home() {
  return (
    <div className="Home">
      <Header />
      <div className="HomeContainer">
        <PaletaList />
      </div>
    </div>
  );
}



export default Home;