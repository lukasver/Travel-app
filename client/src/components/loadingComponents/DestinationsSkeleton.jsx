import React from 'react';
import ContentLoader from 'react-content-loader';

const DestionationsLoader = (props) => (
  <ContentLoader
    height={200}
    width={320}
    {...props}
    backgroundColor="#AEADB3"
    foregroundColor="#eceeeb"
  >
    <rect x="3" y="3" rx="10" ry="10" width="300" height="180" />
  </ContentLoader>
);

export default DestionationsLoader;
