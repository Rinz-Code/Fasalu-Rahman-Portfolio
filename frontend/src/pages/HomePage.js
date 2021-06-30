import React from 'react';
 import {Link} from "react-router-dom";

function HomePage() {
  return (<div>
      <h1>Home</h1>
      <p>To see this demo in action, please try to <Link to='/login'>login</Link>.</p>
    </div>);
}

export default HomePage;
