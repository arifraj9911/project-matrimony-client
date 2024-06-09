import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const SuccessMarriage = () => {

    const {data:successCounter=0,isPending}=useQuery({
        queryKey:['successCounter'],
        queryFn:async()=>{
            const res = await axios.get('http://localhost:5000/successCounter');
            console.log(res.data);
            return res.data;
        }
    });

    const { data: getMarried = [], isPending:successPending } = useQuery({
        queryKey: ["successStory"],
        queryFn: async () => {
          const res = await axios.get("http://localhost:5000/successStory");
          return res.data;
        },
      });

    if(isPending || successPending){
        return <p>Loading...</p>
    }

    return (
        <div className="my-20 w-1/2 mx-auto">
            <div className="flex border border-r-0 border-l-0  gap-6 justify-between py-8">
            <div className="">
                <p>Total Biodata : {successCounter?.totalBiodata}</p>
            </div>
            <div>
                <p>Coupled Paired : {getMarried?.length}</p>
            </div>
            <div>
                <p>Mens : {successCounter?.maleBiodata}</p>
            </div>
            <div>
                <p>Womens : {successCounter?.femaleBiodata}</p>
            </div>
            </div>
        </div>
    );
};

export default SuccessMarriage;