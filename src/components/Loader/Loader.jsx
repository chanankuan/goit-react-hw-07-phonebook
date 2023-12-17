import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

const Loader = ({ width }) => {
  return (
    <RotatingLines
      strokeColor="green"
      strokeWidth="5"
      animationDuration="0.75"
      width={width}
      visible={true}
    />
  );
};

export default Loader;
