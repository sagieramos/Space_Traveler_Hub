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

  return (
    <main>
      {rockets.map((rocket) => {
        const {
          flickr_images: img, name, description, active, id,
        } = rocket;
        return (
          <article key={id}>
            <img src={img} alt="Rocket" />
            <section>
              <h2>{name}</h2>
              <p>{description}</p>
              <button className={active ? 'reserved' : 'no-resersed'} type="button">
                {active ? 'Reserve Rocket' : 'Cancel Reservation'}
              </button>
            </section>
          </article>
        );
      })}
    </main>
  );
};

export default Rockets;
