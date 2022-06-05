import logo from "../../assets/icons/logo.svg"
import sacola from "../../assets/icons/sacola.svg"
import "./style.css"

function Header() {
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
                    <img src={sacola} alt="Sacola de compras" className="BadgeIcon" width="40px" />
                </div>
            </div>
        </header>
    )
}

export default Header;