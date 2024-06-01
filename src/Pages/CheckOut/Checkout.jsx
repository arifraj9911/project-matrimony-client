import { useContext } from "react";
import {  useParams } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { Button, Label, TextInput } from "flowbite-react";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  return (
    <div className="w-1/4 mx-auto my-20">
      <h2 className="text-2xl text-center">Request Contact Information</h2>
      <hr className="my-6" />
      <form className="flex  flex-col gap-4">
        <div className="flex gap-4">
          <div>
            <div className="mb-2 block">
              <Label value="Biodata ID" />
            </div>
            <TextInput value={id} readOnly type="text" required shadow />
          </div>
          <div>
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

        <div>
          <div className="mb-2 block">
            <Label value="Stripe Card Number" />
          </div>
          <TextInput type="number" required shadow />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Checkout;
