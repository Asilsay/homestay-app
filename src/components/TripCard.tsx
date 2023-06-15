import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  reservation_id?: string;
  homestay_price?: number;
  homestay_name?: string;
  duration?: number;
  amount?: number;
  checkin_date?: string;
  checkout_date?: string;
  payment_status?: string;
}

const TripCard: FC<Props> = (props) => {
  const {
    reservation_id,
    homestay_name,
    homestay_price,
    duration,
    amount,
    checkin_date,
    checkout_date,
    payment_status,
  } = props;
  const navigate = useNavigate();

  return (
    <div className="h-full w-full p-5 justify-between bg-gray-200 rounded-box shadow-md flex flex-row">
      <div className="w-3/6">
        <p className="text-2xl text-neutral font-semibold tracking-wide mb-2">
          {homestay_name}:
        </p>
        <div className="flex gap-3">
          <div className="w-max h-max rounded-lg p-3 bg-gray-400">
            {checkin_date}
          </div>
          <div className="w-max h-max rounded-lg p-3 bg-gray-400">
            {checkout_date}
          </div>
        </div>

        <p className="text-xl font-semibold text-neutral capitalize mt-3 ">
          Rp{homestay_price} x {duration}{' '}
          <span className="font-normal">{` `}Night</span>
        </p>
        <div className="divider w-96 my-1"></div>
        <p className="text-xl font-semibold text-neutral capitalize mt-3 ">
          Total Rp{amount}
        </p>
      </div>
      <div className="w-3/6 flex flex-col h-full justify-between items-end">
        {payment_status !== 'pending' ? (
          <>
            <p className="text-lg text-neutral font-normal tracking-wide p-4 badge badge-success">
              Status: {payment_status}
            </p>

            <label
              className="btn btn-primary w-32 mt-1 text-lg text-neutral font-medium"
              htmlFor="modal-review"
            >
              Review
            </label>
          </>
        ) : (
          <>
            <div>
              <p className="text-lg text-neutral font-normal tracking-wide p-4 badge badge-error">
                Status: {payment_status}
              </p>
            </div>
            <button
              className="btn btn-warning w-32 mt-1 text-lg text-neutral font-medium"
              onClick={() => navigate(`/confirm/${reservation_id}`)}
            >
              PAY HERE
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TripCard;
