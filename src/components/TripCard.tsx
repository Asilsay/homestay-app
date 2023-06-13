import { FC } from 'react';

interface Props {
  category?: string;
  price?: number;
  quantitiy?: number;
  gross_amount?: number;
  check_in_date?: string;
  check_out_date?: string;
  payment_status?: string;
}
const TripCard: FC<Props> = (props) => {
  const {
    category,
    price,
    quantitiy,
    gross_amount,
    check_in_date,
    check_out_date,
    payment_status,
  } = props;

  return (
    <div className="h-full w-full p-5 justify-between bg-gray-200 rounded-box shadow-md flex flex-row">
      <div className="w-3/6">
        <p className="text-2xl text-neutral font-semibold tracking-wide mb-2">
          {category}:
        </p>
        <div className="flex gap-3">
          <div className="w-max h-max rounded-lg p-3 bg-gray-400">
            {check_in_date}
          </div>
          <div className="w-max h-max rounded-lg p-3 bg-gray-400">
            {check_out_date}
          </div>
        </div>

        <p className="text-xl font-semibold text-neutral capitalize mt-3 ">
          Rp{price} x {quantitiy}{' '}
          <span className="font-normal">{` `}Night</span>
        </p>
        <div className="divider w-96 my-1"></div>
        <p className="text-xl font-semibold text-neutral capitalize mt-3 ">
          Total Rp{gross_amount}
        </p>
      </div>
      <div className="w-3/6 flex flex-col h-full justify-between items-end">
        {payment_status !== 'pending' ? (
          <>
            <p className="text-lg text-neutral font-normal tracking-wide p-4 badge badge-success">
              Status: {payment_status}
            </p>
            <p className="mt-1 text-lg text-neutral font-medium">
              <label
                className="btn btn-primary w-32"
                htmlFor="modal-review"
              >
                Review
              </label>
            </p>
          </>
        ) : (
          <p className="text-lg text-neutral font-normal tracking-wide p-4 badge badge-error">
            Status: {payment_status}
          </p>
        )}
      </div>
    </div>
  );
};

export default TripCard;
