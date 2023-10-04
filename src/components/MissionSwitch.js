import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { reservedMission } from '../redux/missisonSlice';

const MissionSwitch = ({ type, status, itemId }) => {
  const dispatch = useDispatch();

  if (type === 'button') {
    return (
      <button
        data-testid={`button${itemId}`}
        onClick={() => { dispatch(reservedMission(itemId)); }}
        type="button"
      >
        {status ? 'Leave ' : 'Join '}
        Mission
      </button>
    );
  }

  if (type === 'badge') {
    return (
      <div
        data-testid={`badge${itemId}`}
      >
        {status ? 'Active Member' : 'NOT A MEMBER'}
      </div>
    );
  }

  return (
    <div>Missing Type</div>
  );
};

MissionSwitch.propTypes = {
  type: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
};

export default MissionSwitch;
