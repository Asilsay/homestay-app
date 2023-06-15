import Layout from "../components/Layout";
import Card from "../components/CardList";
import LoadingFull from "../components/LoadingFull";
import hotel from "../assets/Untitled.jpg";

import swal from "../utils/swal";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyHosting = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [myHosting, setMyHosting] = useState<any>([]);
  const [cookie, setCookie] = useCookies(["token", "pp", "role"]);
  const ckToken = cookie.token;
  const ckPP = cookie.pp;
  const navigate = useNavigate();
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
          <div>
            <button
              type="button"
              className="btn btn-primary w-auto text-white"
              onClick={() => navigate("/hosting")}
            >
              Add Hosting
            </button>
          </div>
          <div className="flex flex-col justify-center mt-10 gap-3 mb-10 p-3">
            <Card
              id={69}
              image={hotel}
              title={"Hostingku A8"}
              price={`Rp.6666666`}
              description={"kolam renang 3 buah"}
              rating={4.5}
            />
            <Card
              id={69}
              image={hotel}
              title={"Hostingku A9"}
              price={`Rp.6666666`}
              description={"kolam renang 3 buah"}
              rating={4.5}
            />
            <Card
              id={69}
              image={hotel}
              title={"Hostingku 10"}
              price={`Rp.6666666`}
              description={"kolam renang 3 buah"}
              rating={4.5}
            />
            <Card
              id={69}
              image={hotel}
              title={"Hostingku A11"}
              price={`Rp.6666666`}
              description={"kolam renang 3 buah"}
              rating={4.5}
            />
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default MyHosting;
