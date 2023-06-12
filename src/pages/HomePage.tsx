import Layout from '../components/Layout';

const HomePage = () => {
  return (
    <Layout chose="layout">
      <Layout
        chose="section"
        addClass="bg-base-100 flex items-center justify-center"
      >
        <div className="text-lg tracking-wider font-medium">
          Contoh penggunaan layout
        </div>
      </Layout>
    </Layout>
  );
};

export default HomePage;
