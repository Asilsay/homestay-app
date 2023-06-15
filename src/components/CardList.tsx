import { FC } from 'react';
import { AiTwotoneStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

interface listProps {
  id: number;
  title: string;
  address?: string;
  price?: any;
  rating?: number;
  description?: string;
  image?: string;
  to?: string;
}

const Card: FC<listProps> = ({
  id,
  title,
  price,
  description,
  image,
  rating,
  to,
}) => {
  const navigate = useNavigate();

  function onClickDetail() {
    navigate(`/${to}/${id}`);
  }
  return (
    <div
      className="card card-side cursor-pointer bg-slate-100"
      onClick={onClickDetail}
    >
      <div className="card-body w-1/2">
        <figure>
          <img
            className="w-full h-full"
            src={image}
            alt="Hotel Room"
          />
        </figure>
      </div>

      <div className="card-body px-2 py-4 w-1/2">
        <div className="card-title font-semibold text-[#291334] text-4xl md:text-md  mb-2">
          {title}
        </div>
        <p className="font-semibold text-[#291334] text-xl mb-2">
          {description}
        </p>
        <p className="flex items-center">
          <AiTwotoneStar className="text-[#291334]" /> {rating}
        </p>
        <p className="font-bold text-[#291334] text-2xl mb-2">{price}</p>
      </div>
    </div>
  );
};

export default Card;
