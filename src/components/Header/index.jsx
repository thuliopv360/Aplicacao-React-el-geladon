import logo from "assets/icons/logo.svg";
import paleta from "assets/icons/paleta.svg";
import sacola from "assets/icons/sacola.svg";
import "./style.css";

function Header({createPaleta}) {

    return (
        <header className="HomeHeader Header">
            <div className="row">
                <div className="HeaderLogo Logo">
                    <img src={logo} width="70px" alt="Logo El Geladon" className="LogoIcon" />
                    <span className="LogoTitle">
                        El Geladon
                    </span>
                </div>
                <div className="HeaderOptions Options">
                    <button type="button" className="OptionsPaleta Paleta" onClick={() => createPaleta()}>
                        <img src={paleta} alt="Adicionar paleta" width="40px" className="PaletaIcon" />
                    </button>
                    <div className="OptionsBadge Badge">
                        <img src={sacola} alt="Sacola de compras" className="BadgeIcon" width="40px" />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;