import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRockets } from '../redux/rocketSlice';

const Rockets = () => {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets.rockets);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchRockets());
      setDataFetched(true);
    }
  }, [dispatch, dataFetched]);

  console.log(rockets);

  return (
    <div>Rocket</div>
  );
};

export default Rockets;
