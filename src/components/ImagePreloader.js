import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { symbolImages } from '../assets/images/symbols';

const ImagePreloader = ({ children }) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [loadErrors, setLoadErrors] = useState([]);

  useEffect(() => {
    console.log('开始加载图片...');
    // 收集所有图片URL
    const imageUrls = [];
    Object.keys(symbolImages).forEach(category => {
      Object.values(symbolImages[category]).forEach(url => {
        imageUrls.push(url);
      });
    });

    console.log('需要加载的图片:', imageUrls);
    setTotalImages(imageUrls.length);

    let loadedCount = 0;
    const errors = [];

    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setLoadedCount(loadedCount);
          setLoadingProgress(Math.round((loadedCount / imageUrls.length) * 100));
          console.log(`图片加载成功: ${url}`);
          resolve();
        };
        img.onerror = (error) => {
          console.error(`图片加载失败: ${url}`, error);
          errors.push(url);
          setLoadErrors(prev => [...prev, url]);
          reject(error);
        };
        img.src = url;
      });
    };

    Promise.all(imageUrls.map(url => loadImage(url).catch(err => err)))
      .then(() => {
        console.log('所有图片加载完成');
        if (errors.length > 0) {
          console.warn('部分图片加载失败:', errors);
        }
        setImagesLoaded(true);
      });
  }, []);

  if (!imagesLoaded) {
    return (
      <LoadingContainer>
        <LoadingText>Memuat Sumber Permainan...</LoadingText>
        <ProgressBar>
          <ProgressFill progress={loadingProgress} />
        </ProgressBar>
        <ProgressText>{loadingProgress}%</ProgressText>
        <LoadingDetails>
          <div>Dimuat: {loadedCount} / {totalImages}</div>
          {loadErrors.length > 0 && (
            <ErrorText>
              Gagal memuat: {loadErrors.length} imej
              <ErrorList>
                {loadErrors.map((url, index) => (
                  <ErrorItem key={index}>{url}</ErrorItem>
                ))}
              </ErrorList>
            </ErrorText>
          )}
        </LoadingDetails>
      </LoadingContainer>
    );
  }

  return children;
};

const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 20px;
`;

const LoadingText = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
`;

const ProgressBar = styled.div`
  width: 300px;
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const ProgressFill = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: #4CAF50;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  color: #666;
  font-size: 16px;
  margin-bottom: 10px;
`;

const LoadingDetails = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: #666;
  text-align: center;
`;

const ErrorText = styled.div`
  color: #f44336;
  margin-top: 10px;
  font-weight: bold;
`;

const ErrorList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0;
  max-height: 100px;
  overflow-y: auto;
`;

const ErrorItem = styled.li`
  color: #666;
  font-size: 12px;
  margin: 5px 0;
`;

export default ImagePreloader; 