import Layout from "../components/Layout";
import CardList from "../components/CardList";

const HomePage = () => {
  return (
    <Layout chose="layout">
      <Layout
        chose="section"
        addClass="bg-base-100 flex items-center justify-center"
      >
        <div className="flex-row pb-5">
          <div className="text-[#291334] text-5xl tracking-wider font-bold text-center pt-5">
            Stays
          </div>
          <div className="flex-col my-32 pb-10">
            <CardList
              title="Living Room A6"
              address="Suromadu"
              description="2 Guest - 1 Bedroom - 1 Bed - Bath
          Pool - Wifi - Kitchen"
              price="$25"
            />
            <CardList
              title="Living Room A6"
              address="Suromadu"
              description="2 Guest - 1 Bedroom - 1 Bed - Bath
          Pool - Wifi - Kitchen"
              price="$25"
            />
            <CardList
              title="Living Room A6"
              address="Suromadu"
              description="2 Guest - 1 Bedroom - 1 Bed - Bath
          Pool - Wifi - Kitchen"
              price="$25"
            />
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default HomePage;
