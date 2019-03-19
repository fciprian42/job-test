import React from 'react';
import ReactDOM from 'react-dom';

// Routing
import Routes from './routes';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFont, faThList, faStarHalfAlt, faThumbsUp, faThumbsDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { fab, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

library.add(fab, faFont, faLinkedinIn, faThList, faStarHalfAlt, faThumbsUp, faThumbsDown, faTimes);

// Reset CSS
import 'normalize.css';
import './index.scss';

ReactDOM.render(<Routes />, document.getElementById('app'));