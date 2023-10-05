import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMission } from '../redux/missisonSlice';
import MissionSwitch from './MissionSwitch';

import '../styles/myprofile.scss';

const ProfiledMission = () => {
  const { mission } = useSelector(selectMission);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (mission.length > 0) setData(mission.filter((item) => item.reserved === true));
  }, [mission]);

  return (
    <div className="mis-profile">
      <h1>My Missions</h1>
      <div className="mis-col">
        {data.length > 0 ? (
          data.map(((item) => (
            <div
              key={item.mission_id}
              data-testid={`mission-${item.mission_id}`}
              className="mis-data"
            >
              {item.mission_name}
              <MissionSwitch status={item.reserved} type="button" itemId={item.mission_id} />
            </div>
          )))
        ) : (
          <div className="mis-none">
            currently no mission
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfiledMission;
