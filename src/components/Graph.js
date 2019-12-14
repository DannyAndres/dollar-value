import React from 'react';
import Trend from 'react-trend';

export default (props) => {
  return(
    <Trend
      smooth
      autoDraw
      autoDrawDuration={1000}
      autoDrawEasing="ease-out"
      data={props.period}
      gradient={['white', 'white', 'white']}
      radius={10}
      height={100}
      width={270}
      strokeWidth={5}
      strokeLinecap={'round'}
    />
  ) 
};