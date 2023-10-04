import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRockets, toggleReserve } from '../redux/rocketSlice';
import '../styles/rocket.scss';

const Rockets = () => {
  const dispatch = useDispatch();
  const rockets = useSelector((state) => state.rockets.rockets);

  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  const handleToggleReserve = (rocketId) => {
    dispatch(toggleReserve(rocketId));
  };

  return (
    <main>
      {rockets.map((rocket) => {
        const {
          flickr_images: img, name, description, reserve, id,
        } = rocket;

        const reserved = reserve ? <span>Reserved</span> : null;

        return (
          <article key={id}>
            <img src={img[0]} alt="Rocket" />
            <section>
              <h2>{name}</h2>
              <p>
                {reserved}
                {description}
              </p>
              <button
                onClick={() => handleToggleReserve(id)}
                className={reserve ? 'no-reserved' : 'reserved'}
                type="button"
              >
                {reserve ? 'Cancel Reservation' : 'Reserve Rocket'}
              </button>
            </section>
          </article>
        );
      })}
    </main>
  );
};

export default Rockets;
