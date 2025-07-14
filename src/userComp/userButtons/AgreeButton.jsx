import React, { useState } from 'react';

export default function AgreeButton() {
  const [agreed, setAgreed] = useState(false);

  const toggle = () => {
    setAgreed(!agreed);
  };

  const switchContainer = {
    width: '120px',
    height: '40px',
    borderRadius: '20px',
    backgroundColor: agreed ? '#0d6efd' : '#6c757d',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    boxSizing: 'border-box',
    fontSize: '12px',
  };

  const textStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'white',
    pointerEvents: 'none',
  };

  const leftText = {
    ...textStyle,
    left: '10px',
  };

  const rightText = {
    ...textStyle,
    right: '10px',
  };

  const circle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    position: 'absolute',
    top: '5px',
    left: agreed ? '85px' : '5px',
    transition: 'left 0.3s',
  };

  return (
    <div style={switchContainer} onClick={toggle}>
      {agreed ? (
        <span style={leftText}>allow</span>
      ) : (
        <span style={rightText}>not allow</span>
      )}
      <div style={circle} />
    </div>
  );
}
