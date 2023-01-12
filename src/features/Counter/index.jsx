import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

function CounterFeature() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.count);
  const handleIncreaseClick = () => {
    const actions = increase(); //action creator
    dispatch(actions);
  };
  const handleDecreaseClick = () => {
    const actions = decrease(); //action creator
    dispatch(actions);
  };
  return (
    <div>
      Counter {counter}
      <div className="">
        <button onClick={handleIncreaseClick}>Increase</button>
        <button onClick={handleDecreaseClick}>Decrease</button>
      </div>
    </div>
  );
}

CounterFeature.propTypes = {};

export default CounterFeature;
