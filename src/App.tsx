import Layout from 'antd/lib/layout/layout';
import ContentWrap from './components/content-wrap';
import HeaderWrap from './components/header-wrap';
import React from 'react';

function App() {
  return (
    <Layout style={LayoutStyles}>
      <HeaderWrap />
      <ContentWrap />
    </Layout>
  );
}

export default App;

const LayoutStyles = {
  width: '100vw',
  background: '#f8f8f8',
};
