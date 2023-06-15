import Layout from "../components/Layout";
import withReactContent from "sweetalert2-react-content";
import swal from "../utils/swal";
import Card from "../components/CardList";
import { useCookies } from "react-cookie";
import api from "../utils/api";
import { useEffect, useState } from "react";
import LoadingFull from "../components/LoadingFull";

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [homestay, setHomestay] = useState<any>([]);
  const MySwal = withReactContent(swal);

  const [cookie, setCookie] = useCookies(["token", "pp", "role"]);
  const ckToken = cookie.token;
  const ckPP = cookie.pp;

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
      const response = await api.getAllHomestay(ckToken);
      setHomestay(response.data);
      console.log("response = ", response.data);
    } catch (error) {
      console.log("error = ", error);
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
            Stays
          </div>
          <div className="divider"></div>
          {loading ? (
            <LoadingFull />
          ) : (
            <div className="flex flex-col justify-center mt-10 gap-3 mb-10 p-3">
              {homestay?.data?.map((item: any) => (
                <Card
                  key={item.id}
                  to="detail"
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
      </Layout>
    </Layout>
  );
};

export default HomePage;
