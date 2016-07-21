//import scripts
import React from 'react';

//import styles
import '../styles/Note.scss';

//import images
const partyTime = require('../images/its-party-time.png');


//stateless functional component
const Note = ({title}) => (
  <div>
    <p>{title}</p>
    <img src={partyTime} />
    <em className="sup">SUsdfdsfP mAN</em>
  </div>
)

export default Note;
