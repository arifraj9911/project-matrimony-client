import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { Button, Label, TextInput } from "flowbite-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentCheckout from "./PaymentCheckout";

const stripePromise = loadStripe(
  "pk_test_51PLRJ5IIzM9oJ9jxP2Jgraq9LtM8Ok8eCWW78a2ymbYMgs0Uh3mr7hQ6bql7zQcknZuAr9lTuavgdJPWPIWxHVMH00JrDRoZES"
);

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [paymentSuccess, setPaymentSuccess] = useState(false);

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
              setPaymentSuccess={setPaymentSuccess}
            ></PaymentCheckout>
          </Elements>
        </div>

        <Button disabled={paymentSuccess === false} type="submit">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
