import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { Button, Label, TextInput } from "flowbite-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentCheckout from "./PaymentCheckout";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { PacmanLoader } from "react-spinners";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
  "pk_test_51PLRJ5IIzM9oJ9jxP2Jgraq9LtM8Ok8eCWW78a2ymbYMgs0Uh3mr7hQ6bql7zQcknZuAr9lTuavgdJPWPIWxHVMH00JrDRoZES"
);

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  // const [clientSecret, setClientSecret] = useState("");

  const {
    data: contactRequest = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["contactRequest"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/contactRequest/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      // console.log(res.data)
      return res.data;
    },
  });

  // console.log(contactRequest)

  const handleContactRequest = () => {
    // e.preventDefault();

    axios
      .post("http://localhost:5000/contactRequestSend", contactRequest)
      .then((res) => {
        // console.log(res.data);
        refetch();
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "contact request send for admin approval",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => toast.error(err.message));
  };

  if (isPending) {
    return <PacmanLoader color="#36d7b7" />;
  }

  return (
    <div className="w-1/3 mx-auto my-20">
      <h2 className="text-2xl text-center">Request Contact Information</h2>
      <hr className="my-6" />
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="w-full">
            <div className="mb-2 block">
              <Label value="Biodata ID" />
            </div>
            <TextInput value={id} readOnly type="text" required shadow />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label value="Amount Charged (USD)" />
            </div>
            <TextInput value={`$5`} readOnly type="text" required shadow />
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Email" />
          </div>
          <TextInput
            value={user?.email}
            readOnly
            type="email"
            placeholder="name@flowbite.com"
            required
            shadow
          />
        </div>

        <div className="my-4">
          <Elements stripe={stripePromise}>
            <PaymentCheckout
              id={id}
              setPaymentSuccess={setPaymentSuccess}
              setTransactionId={setTransactionId}
              transactionId={transactionId}
            ></PaymentCheckout>
          </Elements>
        </div>

        <Button
          onClick={handleContactRequest}
          disabled={paymentSuccess === false}
          type="submit"
          className="w-full px-3 py-1 mt-6 text-sm tracking-wider text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg lg:w-auto "
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
