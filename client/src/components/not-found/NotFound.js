// import React from 'react'

// export default () => {
//   return (
//     <div>
//       <h1 className="display-4">Page Not Found</h1>
//       <p>Sorry, this page does not exist</p>
//     </div>
//   )
// }

import React, { Component } from 'react';

export default class NotFound extends Component {
  componentDidMount() {
    console.log('NotFound: did mount!!');
  }
  render() {
    return (
      <div>
        <h1 className="display-4">Page Not Found</h1>
        <p>Sorry, this page does not exist</p>
      </div>
    );
  }
}
