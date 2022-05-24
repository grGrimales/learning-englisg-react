import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Router, useParams, useRoutes } from 'react-router-dom'
import { getStoryById } from '../../../action/storys';
import { HistoriaCard } from './HistoriaCard';

export const ShowStory = () => {
    const { id } = useParams();
    const [indexAudio, setIndexAudio] = useState(1);
    const [playAudio, setPlayAudio] = useState(false);
    const [showSpanishFrase, setShowSpanishFrase] = useState(false);
    const [showEnglishFrase, setShowEnglishFrase] = useState(true)
    const { storyActive } = useSelector((state) => state.story);
    const frasesLength = storyActive?.frases.length;


    const dispatch = useDispatch();
    const audioRef = document.getElementById(`audio_${indexAudio}`);
    const sizeFont = '28px';

    const onToggleAudio = () => {
        setPlayAudio(!playAudio);

    }


    const hadleEndAudio = () => {
        if (indexAudio === frasesLength) {
            audioRef?.pause();
            setPlayAudio(false);
            setIndexAudio(1);
            return;
        }

        setIndexAudio(indexAudio + 1);
    }

    const onClickFrase = (idFrase) => {
        audioRef?.pause();
        audioRef.currentTime = 0;
        setIndexAudio(idFrase);

    }

    const handleShowSpanishFrase = () => {
        setShowSpanishFrase(!showSpanishFrase);
    }

    const handleShowEnglishFrase = () => {
        setShowEnglishFrase(!showEnglishFrase);

    }



    useEffect(() => {

        if (playAudio === false) {
            audioRef?.pause();
            return;
        }
        setTimeout(() => {
            if (playAudio === true) {
                audioRef?.play();
            }
        }, 300);
    }, [indexAudio]);

    useEffect(() => {
        if (playAudio === true) {
            audioRef?.play();
        } else if (playAudio === false) {
            audioRef?.pause();
        }
    }, [playAudio]);




    useEffect(() => {
        dispatch(getStoryById(id));
    }, [])
    return (
        <div className='row mt-3'>

            <div className='col-sm-4'>
                <div className="card">
                    <img className="card-img-top" src={storyActive?.frases[0]?.img} alt="Card image cap" style={{
                        width: "100%"
                    }} />
                    <div className="card-body">
                        <h5 className="card-title">{storyActive?.title}</h5>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={showSpanishFrase}
                                id="flexCheckDefault"
                                onChange={handleShowSpanishFrase}
                                checked = {showSpanishFrase}

                                
                            />
                            <label className="form-check-label" >
                                Sub Español
                            </label>


                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={showEnglishFrase}
                                id="flexCheckDefault"
                                onChange={handleShowEnglishFrase}
                                checked = {showEnglishFrase}
                            />
                            <label className="form-check-label" >
                                Sub Ingles
                            </label>


                        </div>


                    </div>

                    <a className="btn btn-primary" onClick={onToggleAudio}>{(playAudio) ? 'Stop' : 'Play'}</a>
                </div>
            </div>
            <div className='col-sm-8'>
                {
                    storyActive?.frases?.map((f) => (
                        <div
                            onClick={() => onClickFrase(f.id)}
                            key={f.id}
                            className={(indexAudio === f.id) ? 'alert alert-primary' : 'alert alert-light'}
                            role="alert">
                            <p style={{ fontSize: sizeFont }}>{(showEnglishFrase) ?  f.EnglishPhrase: ''}</p>
                            <p style={{ fontSize: sizeFont }}>   {(showSpanishFrase) ? f.phraseSpanish : ''}</p>
                            <div className="container__audio">
                                <audio onEnded={hadleEndAudio} id={`audio_${f.id}`} controls hidden={true}>
                                    <source src={f?.audio} type="audio/mp3" />
                                    Tu navegador no soporta audio HTML5.
                                </audio>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}
