import React, { useEffect } from 'react'
import { useSelector , useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { listFilteredVocabulary } from '../../../action/vocabulary';
import { useForm } from '../../../hooks/useForm';
/* import { useDispatch, useSelector } from "react-redux"; */


const RememberActivity = props => {

  const dispatch = useDispatch();



    const navigate = useNavigate();

    const { listFiltered } = useSelector((state) => state.vocabulary);


    const handleClosessss = () => {
        navigate("/activity");
    };


    const handleShow = (id, showChange) => {

        const listFilteredUpdate =listFiltered.map((elementList) => {
            if (elementList.id === id) {
                console.log("entro...")
                elementList.show = !showChange
                return elementList
            } else {
                return elementList
            }
          })

        dispatch(listFilteredVocabulary(listFilteredUpdate));


    }

    
    return (
        <main className=" animate__animated animate__fadeIn">
            <button type="button" onClick={handleClosessss}>
                X
            </button>


            <div className="table-responsive container mt-2">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">englishWord</th>
                            <th scope="col">spanishWord</th>
                            <th scope="col">show</th>
                            <th scope="col">audio</th>
                        </tr>
                    </thead>

                    <tbody>

                        {listFiltered.map((elementList) => (
                            <tr key={elementList.id}>

                                <td>{elementList.englishWord}</td>
                                <td>
                                    {(elementList.show) ? elementList.spanishWord : ""}
                                </td>
                 
                                <td>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            /* id="flexSwitchCheckDefault"
                                           */
                                            name="show"
                                            id="show"
                                            value={elementList.show}
                                            onChange={() => handleShow(elementList.id, elementList.show)}


                                        />


                                    </div>
                                    {elementList.show}

                                </td>

                                <td>
                                    <audio id="audio" controls>
                                        <source src={elementList?.audio} type="audio/mp3" />
                                        Tu navegador no soporta audio HTML5.
                                    </audio>
                                </td>



                            </tr>
                        ))}



                    </tbody>
                </table>
            </div>

        </main>
    )
}

RememberActivity.propTypes = {}

export default RememberActivity