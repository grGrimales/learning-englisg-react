import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { listFilteredVocabulary, updateCategoryRepasar } from '../../../action/vocabulary';
import { useForm } from '../../../hooks/useForm';

const RememberActivity = props => {

    const dispatch = useDispatch();


    const navigate = useNavigate();

    const { listFiltered } = useSelector((state) => state.vocabulary);
    const { name } = useSelector((state) => state.auth);
    const category_repasar = "REPASAR_" + name;


    const handleClosessss = () => {
        navigate("/activity");
    };


    const handleShow = (id, showChange) => {
        const listFilteredUpdate = listFiltered.map((elementList) => {
            if (elementList.id === id) {
                elementList.show = !showChange
                return elementList
            } else {
                return elementList
            }
        })

        dispatch(listFilteredVocabulary(listFilteredUpdate));
    }

    const handleAddRepasar = (id) => {

        dispatch(updateCategoryRepasar(id));
    }

    useEffect(() => {

    }, [listFiltered])

    return (
        <main className=" animate__animated animate__fadeIn">
            <button type="button" onClick={handleClosessss}>
                X
            </button>


            <div className="table-responsive container mt-2">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">EnglishWord</th>
                            <th scope="col">SpanishWord</th>
                            <th scope="col">Show</th>
                            <th scope="col">Audio</th>
                            <th scope="col">Repasar</th>

                        </tr>
                    </thead>

                    <tbody>

                        {listFiltered?.map((elementList) => (
                            <tr key={elementList?.id}>

                                <td>{elementList?.englishWord}</td>
                                <td>
                                    {(elementList?.show) ? elementList?.spanishWord : ""}
                                </td>

                                <td>
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            name="show"
                                            id="show"
                                            value={elementList?.show}
                                            onChange={() => handleShow(elementList?.id, elementList?.show)}


                                        />


                                    </div>
                                    {elementList?.show}

                                </td>

                                <td>
                                    <audio id="audio" controls>
                                        <source src={elementList?.audio} type="audio/mp3" />
                                        Tu navegador no soporta audio HTML5.
                                    </audio>
                                </td>
                                <td>


                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"
                                        checked={elementList?.category.includes(category_repasar) ? true: false}
                                        onChange={() => handleAddRepasar(elementList?.id, true)}
                                    />
                                    <label className="form-check-label" htmlFor={`check${elementList?.id}`}>
                                        Repasar
                                    </label>
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