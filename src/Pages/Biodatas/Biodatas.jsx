import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BiodatasCard from "./BiodatasCard";
import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

const Biodatas = () => {
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [division, setDivision] = useState(null);

  const [count, setCount] = useState(0);
  // console.log(count);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const numberOfPages = Math.ceil(count / itemsPerPage);

  const pages = [...Array(numberOfPages).keys()];

  const {
    data: allBio = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allBio", gender, age, division, currentPage, itemsPerPage],
    queryFn: async () => {
      if (gender !== null && age !== null && division !== null) {
        const res = await axios.get(
          `http://localhost:5000/allMembers?gender=${gender}&age=${age}&division=${division}&page=${currentPage}&size=${itemsPerPage}`
        );
        return res.data;
      } else {
        const res = await axios.get(
          `http://localhost:5000/initialAllMembers?page=${currentPage}&size=${itemsPerPage}`
        );
        return res.data;
      }
    },
  });

  useEffect(() => {
    fetch("http://localhost:5000/initialAllMembersCount")
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        refetch();
      });
  }, [refetch]);

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    // console.log(val);
    setItemsPerPage(val);
    setCurrentPage(0);
    refetch();
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
    refetch();
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
    refetch();
  };

  if (isPending) {
    return <PacmanLoader color="#36d7b7" />;
  }

  const handleSearchProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    setGender(form.gender.value);
    setAge(form.age.value);
    setDivision(form.division.value);
    refetch();
  };
  return (
    <div className="">
      <div className="my-20 max-w-screen-xl mx-auto">
        <div className="flex items-start gap-6 ">
          {/* filtered option */}
          <form
            onSubmit={handleSearchProfile}
            className="border  p-6 space-y-8 w-1/4 "
          >
            <div className="space-y-2">
              <h2 className="text-lg">I am looking for</h2>
              <select
                defaultValue={gender}
                className="w-full"
                name="gender"
                id=""
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg">Age</h2>
              <select defaultValue={age} className="w-full" name="age" id="">
                <option value="18-30">18-30</option>
                <option value="31-40">31-40</option>
                <option value="41-50">41-50</option>
              </select>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg">Division</h2>
              <select
                defaultValue={division}
                className="w-full"
                name="division"
                id=""
              >
                <option value="Dhaka">Dhaka</option>
                <option value="Khulna">Khulna</option>
                <option value="Barisal">Barisal</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Chattagram">Chattagram</option>
                <option value="Maymansign">Maymansign</option>
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg lg:w-auto "
              >
                Search Profile
              </button>
            </div>
          </form>

          {/* biodatas  */}
          <div className="flex-1">
            <h2 className="text-2xl">Showing {allBio?.length} Profile</h2>
            <hr className="my-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allBio?.map((member) => (
                <BiodatasCard key={menubar._id} member={member}></BiodatasCard>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center py-20 flex items-center justify-center ">
          <button className="mr-2  join-item btn " onClick={handlePrevPage}>
            Prev
          </button>
          {pages.map((page) => (
            <button
              className={`${
                currentPage === page ? "bg-[#FF9F66]" : undefined
              } mx-3  px-5 py-1 join-item btn`}
              onClick={() => setCurrentPage(page)}
              key={page}
            >
              {page}
            </button>
          ))}
          <button className="ml-2 join-item btn" onClick={handleNextPage}>
            Next
          </button>
          <select
            className="join-item btn ml-8 px-2 py-1"
            value={itemsPerPage}
            onChange={handleItemsPerPage}
            name=""
            id=""
          >
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Biodatas;
