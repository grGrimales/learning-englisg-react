import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListStorys } from '../../../action/storys';
import { HistoriaCard } from './HistoriaCard';

export const HistoriaList = () => {
  const { storys } = useSelector((state) => state.story)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListStorys());
  }, [])



  return (
    <div>

      d
      <div className="card-group row ">
        {
          storys?.map((story) => (
            <HistoriaCard key={story.id} story={story} />
          ))
        }
      </div>
    </div>
  )
}
