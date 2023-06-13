import Layout from '../components/Layout';

const HostDetail = () => {
  return (
    <Layout chose="layout">
      <Layout
        chose="section"
        addClass="bg-base-100 flex justify-center py-16 px-20"
      >
        <div className="w-full h-[500px] flex">
          <div className="w-4/6 relative bg-cover bg-center">
            <div className="w-full h-full p-3">
              <img
                src="https://placehold.co/600x400/png?text=placeholder+image
              "
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </div>
            <button className="absolute btn btn-primary bottom-6 right-6">
              Click Me
            </button>
          </div>
          <div className="w-2/6 flex flex-col">
            <div className="h-1/2 w-full relative bg-cover bg-center">
              <div className="w-full h-full p-3">
                <img
                  src="https://placehold.co/600x400/png?text=placeholder+image
                "
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <button className="absolute btn btn-primary bottom-6 right-6">
                Click Me
              </button>
            </div>
            <div className="h-1/2 w-full relative bg-cover bg-center">
              <div className="w-full h-full p-3">
                <img
                  src="https://placehold.co/600x400/png?text=placeholder+image
                "
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <button className="absolute btn btn-primary bottom-6 right-6">
                Click Me
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default HostDetail;
