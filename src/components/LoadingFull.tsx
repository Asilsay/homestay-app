import Layout from './Layout';

const LoadingFull = () => {
  return (
    <Layout
      chose="section"
      addClass="h-screen flex justify-center items-center"
    >
      <span className="loading loading-dots loading-lg"></span>
    </Layout>
  );
};

export default LoadingFull;
