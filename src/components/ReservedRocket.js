import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/reservedRocket.scss';

const ReservedRocket = () => {
  const rockets = useSelector((state) => state.rockets.rockets);
  const reservedRockets = rockets.filter((rocket) => rocket.reserve === true);

  return (
    <div id="rocket-filter">
      <h2>My Rockets</h2>
      <ul>
        {
            reservedRockets.map((rocket) => (
              <li key={rocket.id}>{rocket.name}</li>
            ))
        }
      </ul>
    </div>
  );
};

export default ReservedRocket;
