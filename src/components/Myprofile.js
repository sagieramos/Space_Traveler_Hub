import React from 'react';
import ReservedRocket from './ReservedRocket';
import ProfiledMission from './ProfiledMission';
import '../styles/myprofile.scss';

const Myprofile = () => (
  <div id="myprofile">
    <ProfiledMission />
    <ReservedRocket />
  </div>
);

export default Myprofile;
