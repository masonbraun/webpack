//import scripts
import React, { PropTypes } from 'react';


//import styles
import './Note.scss';

//import images
const partyTime = require('../../images/its-party-time.png');

const clickIt = () => {
  alert("clicked");
}

//stateless functional presentation component
const Note = ({test}) => (
  <div className="note" onClick={clickIt}>
    <p>{test}</p>
  </div>
)

Note.propTypes = {
  test: PropTypes.string.isRequired
}

export default Note;
