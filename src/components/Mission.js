import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMission, setMission } from '../redux/missisonSlice';
import MissionSwitch from './MissionSwitch';

const Mission = () => {
  const dispatch = useDispatch();
  const { mission } = useSelector(selectMission);

  useEffect(() => {
    const fetchMission = () => {
      fetch('https://api.spacexdata.com/v3/missions')
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error();
        })
        .then((data) => {
          dispatch(setMission(data));
        })
        .catch((err) => err.message);
    };
    if (mission.length === 0) fetchMission();
  }, [dispatch, mission.length]);

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Mission</th>
              <th>Description</th>
              <th>Status</th>
              <th aria-label="action-button" />
            </tr>
          </thead>
          <tbody>
            {mission.map((item) => (
              <tr key={item.mission_id}>
                <td data-testid={item.mission_id}>
                  {item.mission_name}
                </td>
                <td>
                  {item.description}
                </td>
                <td>
                  <MissionSwitch status={item.reserved} type="badge" itemId={item.mission_id} />
                </td>
                <td>
                  <MissionSwitch status={item.reserved} type="button" itemId={item.mission_id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mission;
