import AirBar from "./AirBar";
import AirLine from "./AirLine";
import CovidBar from "./CovidBar";
import CovidLine from "./CovidLine";

const Home = () => {
  return (
    <div>
      <CovidBar />      <CovidLine />
      <AirBar />
      <AirLine />
    </div>
  );
};

export default Home;