import React from 'react'
import { useNavigate } from 'react-router-dom';

export const HistoriaCard = ({ story }) => {
    const navigate = useNavigate();

   // const { id, title, frases } = story;
    const img = story?.frases[0].img

    const showStory = () => {
        navigate(`/historias/${story.id}`)
    }

    return (
        <>
            <div className='col-md-4 col-lg-3  mt-4'>
                <div className="card">
                    <img className="card-img-top" src={img} alt="Card image cap"  />
                    <div className="card-body">
                        <h5 className="card-title">{story?.title}</h5>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>

                    <a onClick={showStory} className="btn btn-primary">Ver Historia</a>
                </div>
            </div>
        </>
    )
}
