import React, { useState } from 'react';
import styled from 'styled-components';

const SafeImage = ({ src, alt, size = 'medium', fallback = 'Image not found' }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  if (hasError) {
    return <FallbackContainer size={size}>{fallback}</FallbackContainer>;
  }

  return (
    <ImageContainer size={size}>
      {!isLoaded && <LoadingPlaceholder />}
      <StyledImage
        src={src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        style={{ display: isLoaded ? 'block' : 'none' }}
      />
    </ImageContainer>
  );
};

const getSizeValue = (size) => {
  switch (size) {
    case 'small':
      return '30px';
    case 'large':
      return '60px';
    case 'medium':
    default:
      return '45px';
  }
};

const ImageContainer = styled.div`
  width: ${props => getSizeValue(props.size)};
  height: ${props => getSizeValue(props.size)};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const LoadingPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
`;

const FallbackContainer = styled.div`
  width: ${props => getSizeValue(props.size)};
  height: ${props => getSizeValue(props.size)};
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  color: #666;
  font-size: 12px;
  text-align: center;
  padding: 4px;
  border-radius: 4px;
`;

export default SafeImage; 