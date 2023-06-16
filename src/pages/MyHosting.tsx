import Layout from "../components/Layout";
import { CardMy } from "../components/CardList";
import LoadingFull from "../components/LoadingFull";
import api from "../utils/api";

import swal from "../utils/swal";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";

const MyHosting = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [myHosting, setMyHosting] = useState<any>([]);
  const [cookie, setCookie] = useCookies(["token", "pp", "role"]);
  const MySwal = withReactContent(swal);
  const ckToken = cookie.token;
  const ckPP = cookie.pp;
  const navigate = useNavigate();

  const fetchProfile = async () => {
    if (!ckPP) {
      await api
        .getUserById(ckToken)
        .then((response) => {
          const { data } = response.data;
          setCookie("pp", data.profile_picture, { path: "/" });
          setCookie("role", data.role, { path: "/" });
        })
        .catch((error) => {
          const { data } = error.response;
          MySwal.fire({
            icon: "error",
            title: "Failed",
            text: `error :  ${data.message}`,
            showCancelButton: false,
          });
        });
    }
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.getMyHosting(ckToken);
      setMyHosting(response.data);
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Failed",
        text: `error :  ${error}`,
        showCancelButton: false,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout chose="layout">
      <Layout
        chose="section"
        addClass="bg-base-100 flex items-center justify-center"
      >
        <div className="flex-row pb-5">
          <div className="text-[#291334] text-5xl tracking-wider font-bold text-center pt-5">
            My Hosting
          </div>
          <div className="divider"></div>
          <div className="items-center justify-center">
            <button
              type="button"
              className="btn btn-primary w-auto text-white"
              onClick={() => navigate("/hosting")}
            >
              Add Hosting
            </button>
          </div>
          <div className="flex flex-col justify-center mt-10 gap-3 mb-10 p-3">
            {loading ? (
              <LoadingFull />
            ) : (
              <div className="flex flex-col justify-center mt-10 gap-3 mb-10 p-3">
                {myHosting?.data?.map((item: any) => (
                  <CardMy
                    key={item.id}
                    to={"host"}
                    id={item.homestay_id}
                    image={
                      item.homestay_picture
                        ? item.homestay_picture
                        : "https://placehold.co/600x400/png?text=image"
                    }
                    title={item.name}
                    price={`Rp.${item.price}`}
                    description={item.description}
                    rating={item.average_rating}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default MyHosting;
