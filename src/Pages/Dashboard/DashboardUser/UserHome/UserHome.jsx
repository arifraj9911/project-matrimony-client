import userHomeBanner from "../../../../assets/Images/welcome1.png";

const UserHome = () => {
  return (
    <div>
      <h2 className="text-3xl">
        Welcome to Love <span className="text-primary">NEST</span>{" "}
      </h2>
      <div className="mt-8">
        <img className="w-3/4 mx-auto" src={userHomeBanner} alt="" />
      </div>
    </div>
  );
};

export default UserHome;
