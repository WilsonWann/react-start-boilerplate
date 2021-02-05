import css from './HelloWorld.css'
import React from 'react';
import _ from 'lodash';

import SealLogo from 'file-loader!./seal.png';

const demoName = 'Load Image'

const HelloWorld = () => {
  const test = _.map([1, 2, 3, 4, 5], (num) => num * num)

  return (
    <div>
      <h3>Hello World</h3>
      <img src={SealLogo} height="100" width="100" />
      {
        _.map(test, (item, index) => <p key={index}>{item}</p>)
      }
    </div>
  );
};

export default HelloWorld;