import Layout from '../components/Layout';
import { data } from '../json/dummyTrip.json';
import { lazy, Suspense } from 'react';

const TripCard = lazy(() => import('../components/TripCard'));

const TripHistory = () => {
  return (
    <Layout chose="layout">
      <Layout
        chose="section"
        addClass="bg-base-100 flex flex-col  py-16 px-20"
      >
        <p className="text-4xl font-semibold text-neutral uppercase">
          History Trip
        </p>
        <div className="divider"></div>

        <div className="w-full p-4">
          <Suspense
            fallback={<span className="loading loading-dots loading-md"></span>}
          >
            <div className="grid grid-cols-1 gap-5">
              {data.map((data, idx) => {
                return (
                  <TripCard
                    key={idx}
                    category={data.category}
                    payment_status={data.payment_status}
                    check_in_date={data['check-in_date']}
                    check_out_date={data['check-out_date']}
                    gross_amount={data.gross_amount}
                    price={data.price}
                    quantitiy={data.quantity}
                  />
                );
              })}
            </div>
          </Suspense>
        </div>
      </Layout>
    </Layout>
  );
};

export default TripHistory;
