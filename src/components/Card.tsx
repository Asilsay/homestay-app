import { FC } from 'react';

interface Props {
  full_name?: string;
  user_picture?: string;
  rating?: number;
  review?: string;
}
const LazyCardReviews: FC<Props> = (props) => {
  const { full_name, user_picture, review } = props;

  return (
    <div className="h-32 w-full p-4 justify-between bg-base-200 rounded-box shadow-md flex flex-row">
      <div className="w-1/6 h-auto ">
        <img
          className="mask mask-squircle"
          src={user_picture}
          alt={`${full_name}'s picture`}
        />
      </div>
      <div className="w-5/6 pl-2">
        <p className="text-lg text-neutral font-normal tracking-wide">
          {full_name}:
        </p>
        <p className="mt-1 text-lg text-neutral font-medium">{review}</p>
      </div>
    </div>
  );
};

export default LazyCardReviews;
