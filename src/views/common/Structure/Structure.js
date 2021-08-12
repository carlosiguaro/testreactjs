import { React } from 'react';
import { Link } from 'react-router-dom';

// import Imagotipo from "../../../assets/img/imagotipo.png";
import { IoIosArrowDown } from "react-icons/io";

import imagotipo from "../../../assets/img/icons/imagotipo.svg";
import isotipo from "../../../assets/img/icons/isotipo.svg";

import inicio from "../../../assets/img/icons/incio.svg";
import pacientes from "../../../assets/img/icons/pacientes.svg";
import medicos from "../../../assets/img/icons/medicos.svg";
import consultorio from "../../../assets/img/icons/consultorio.svg";
import agenda from "../../../assets/img/icons/agenda.svg";

import info from "../../../assets/img/icons/info.svg";
import flechaderecha from "../../../assets/img/icons/flechaderecha.svg";

import "./Structure.scss";


function Structure(props) {

    const menu = [
        {
            text: "Inicio",
            icon: <img alt="loadimg" src={inicio} width="22px" height="18.9px" />
        },
        {
            text: "Pacientes",
            icon: <img alt="loadimg" src={pacientes} width="18.75px" height="18.75px" />
        },
        {
            text: "Medicos",
            icon: <img alt="loadimg" src={medicos} width="18.75px" height="18.75px" />
        },
        {
            text: "Consultorios",
            icon: <img alt="loadimg" src={consultorio} width="21px" height="12.75px" />
        },
        {
            text: "Agenda",
            icon: <img alt="loadimg" src={agenda} width="21px" height="22px" />
        }
    ]

    return (
        <main>
            <header>
                <div>
                    <img alt="loadimg" src={imagotipo} height="42px" width="133px" />
                </div>

                <div>
                    <div>
                        <label>KR</label>
                    </div>
                    <label>Katerina Rios</label>
                    <button>
                        <IoIosArrowDown />
                    </button>
                </div>
            </header>
            <section>
                <div>
                    <ul>
                        {
                            menu.map((item, key) => {
                                return (
                                    <li key={key}>
                                        <Link to={item.text === "Pacientes" ? "/" : item.text.toLowerCase() }>
                                            {item.icon}
                                            {item.text}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                <div>

                    <div>
                        <label>
                            <img alt="loadimg" src={info} width="16px" height="16px" />
                            Toda es informativo para editar , agregar mas información realizar por el SIC
                        </label>
                    </div>

                    <div>
                        <label>Incio</label>
                        <img alt="loadimg" src={flechaderecha} width="16px" height="16px" />
                        <label>{props.in}</label>
                    </div>

                    <div>
                        <div>
                            { props.children }
                        </div>
                    </div>

                    <footer>
                        <img alt="loadimg" src={isotipo} width="40px" height="40px" />
                        <label>Copyright © 2021 Clinica San Felipe</label>
                    </footer>
                </div>
            </section>
        </main>
    )
}

export default Structure;
