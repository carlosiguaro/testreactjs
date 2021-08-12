import { React, useEffect, useState, useRef } from 'react';
import Structure from "../common/Structure/Structure";

import flechaizq from "../../assets/img/icons/flechaizq.svg";
import flechader from "../../assets/img/icons/flechader.svg";
import lupablanca from "../../assets/img/icons/lupablanca.svg";
import lupanegra from "../../assets/img/icons/lupanegra.svg";
import computer from "../../assets/img/icons/computer.svg";
import eliminar from "../../assets/img/icons/eliminar.svg";
import trdot from "../../assets/img/icons/trdot.svg";
import "./dashboard.scss";

import DATA from "./data";

function Dashboard() {

    const searchInput = useRef();
    const btnNext = useRef();
    const btnPrev = useRef();

    const [data, setData] = useState(DATA);
    const [vdata, setVdata] = useState([]);
    const [rangevdata, setRangevdata] = useState(5);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [checkedRecord, setCheckedRecord] = useState([]);
    const [checkedSelectAll, SetCheckedSelectAll] = useState(false);
    const [statuActive, setStatuActive] = useState(["active"])

    useEffect(()=> {
        // Set number pages
        let npagesupdated = [];
        let npages = data.length / rangevdata;
        npages =  npages.toString().indexOf('.') !== -1 ? (npages+1) : npages;
        npages = parseInt(npages.toString().substring(0,1));
        for (let i=0; i<npages; i++) {
            npagesupdated[i] = i+1;
        }
        setPages(npagesupdated);

        //Reset checked records
        let listCheckedRecord = new Array(data.length);
        for (let i=0; i<data.length; i ++) {
            if (data[i]){
                listCheckedRecord[data[i].id] = false;
            }
        }
        setCheckedRecord(listCheckedRecord);
        //Listar visual data
        listVdata();
    }, [rangevdata, data]);

    useEffect(() => {
        listVdata();
    }, [currentPage]);

    const listVdata = () => {
        let rvd = parseInt(rangevdata);
        let from = (currentPage * rvd) - rvd;
        let calcTo = currentPage * rvd;
        let to = data.length >= calcTo ? calcTo : data.length;

        if (from >= to) {
            from = 0;
            to = rvd;
            setCurrentPage(1)
            setStatuActive(["active"]);
        }
        setVdata(data.slice(from, to));
    };

    const findRecord = (cdata)=> {
        let matchData = [];
        if (cdata.length > 0) {
            for (let i in data) {
                if (data[i].dni.toLowerCase().indexOf(cdata.toLowerCase()) === 0 || 
                    data[i].nombres.toLowerCase().indexOf(cdata.toLowerCase()) === 0 || 
                    data[i].apellidos.toLowerCase().indexOf(cdata.toLowerCase()) === 0) {
                    matchData.push(data[i]);
                }
            }
            setVdata(matchData);
        } else {
            listVdata();
        }
    };

    const switchCheckedRecord = (e) => {
        SetCheckedSelectAll(false);
        let updatedCheckedRecord = JSON.stringify(checkedRecord);
        updatedCheckedRecord = JSON.parse(updatedCheckedRecord);
        updatedCheckedRecord[e.target.value] = e.target.checked;
        setCheckedRecord(updatedCheckedRecord);
    };

    const selectAllRecords = (check) => {
        SetCheckedSelectAll(check);
        let idRecord = vdata.map((reg, key)=> { return reg.id; });
        let _checkedRecord = JSON.stringify(checkedRecord);
        _checkedRecord = JSON.parse(_checkedRecord);

        for (let i in idRecord) {
            _checkedRecord[idRecord[i]] = check;
        }
        setCheckedRecord(_checkedRecord);        
    }

    const deleteRecord = () => {
        SetCheckedSelectAll(false);

        let idRecord = [];
        for (let i in checkedRecord) {
            if (checkedRecord[i]) {
                idRecord.push(parseInt(i));
            }
        }
        if (idRecord.length > 0) {
            let _vdata = JSON.stringify(data);
            _vdata = JSON.parse(_vdata);
            for (let i in _vdata) {
                for (let j in idRecord) {
                    if (_vdata[i].id === idRecord[j]) {
                        delete _vdata[i];
                        break;
                    }
                }
            }
            let updatedRecords = _vdata.filter((data) => {
                if (data !== undefined){
                    return data;
                }
            });
            setData(updatedRecords);
            if (searchInput.current.value.length) {
                searchInput.current.value = "";
            }
        }
    };

    const refreshVdata = (i)=> {
        if (i > 0 & i <= pages.length) {
            let x = i.toString();
            let posActive = parseInt(x);
            posActive-=1;
            let statuActiveUpdated = [];
            statuActiveUpdated[posActive] = "active";
            setStatuActive(statuActiveUpdated);
            setCurrentPage(i);
        }
    }

    return (
        <Structure in={"Pacientes"}>
            <div id="pacientes">
                <div>
                    <label>Pacientes</label>
                    <label>A continuación podrás ver la lista de pacientes agendados.</label>

                    <div>
                        <img alt="loadimg" src={lupanegra} />
                        <input
                            placeholder="Buscar por DNI, Nombre, Apellido"
                            onChange={e => findRecord(e.target.value)}
                            ref={searchInput}
                        />
                        <button>
                            <img alt="loadimg" src={lupablanca} width="16px" height="16px" />
                        </button>
                    </div>
                </div>


                <div>
                    <div>
                        <div>
                            <input 
                                type="checkbox" 
                                name="checkbox"
                                checked={checkedSelectAll}
                                onChange={e => selectAllRecords(e.target.checked)}
                            />
                        </div>
                        <button onClick={e => deleteRecord(e) }>
                            <img alt="loadimg" src={eliminar} />
                            Eliminar
                        </button>          
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nro. de historia</th>
                                <th>DNI / CE</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Teléfono</th>
                                <th>Correo</th>
                                <th>Citas Program.</th>
                                <th>Usuario que Registró</th>
                                <th>Fecha registro</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                vdata.map((reg, key)=> {
                                    return(
                                        <tr key={key}>
                                            <td>
                                                <div>
                                                    <input type="checkbox" 
                                                        name="checkbox" 
                                                        value={reg.id}
                                                        checked={checkedRecord[reg.id]}
                                                        onChange={e => switchCheckedRecord(e)}
                                                    />
                                                </div>
                                            </td>
                                            <td>{reg.nrohist}</td>
                                            <td>{reg.dni}</td>
                                            <td>{reg.nombres}</td>
                                            <td>{reg.apellidos}</td>
                                            <td>{reg.telefono}</td>
                                            <td>{reg.correo}</td>
                                            <td><img alt="loadimg" src={computer} width="16px" height="16px" /></td>
                                            <td>{reg.usreg}</td>
                                            <td>{reg.fechreg}</td>
                                            <td><img alt="loadimg" src={trdot} width="16px" height="16px" /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div>
                    <label>
                        Mostrando {rangevdata} pacientes de {data.length}
                    </label>
                    <div>
                        <button ref={btnPrev} onClick={e => refreshVdata(currentPage-1)}>
                            <img alt="loadimg" src={flechaizq} />
                        </button>
                    
                        <div>
                            {
                                pages.map((i, key) => {
                                    return (
                                        <button key={key} className={statuActive[key]} onClick={e => refreshVdata(i)}>
                                            {i}
                                        </button>
                                    )
                                })
                            }   
                        </div>

                        <button ref={btnNext} onClick={e => refreshVdata(currentPage+1)}>
                            <img alt="loadimg" src={flechader} />
                        </button>
                    </div>
                    <div>
                        <select value={rangevdata} onChange={e => setRangevdata(e.target.value)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                </div>
            </div>
        </Structure>
    )
}

export default Dashboard;
