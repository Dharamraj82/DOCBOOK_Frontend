import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    height: 40px;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: linear-gradient(135deg, #10b981, #0ea5e9);
    animation: bounce 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
  }

  .dot:nth-child(1) {
    animation-delay: 0s;
  }

  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
    }
    50% {
      transform: translateY(-15px);
      box-shadow: 0 15px 15px rgba(14, 165, 233, 0.3);
      background: linear-gradient(135deg, #0ea5e9, #10b981);
    }
  }`;

export default Loader;
