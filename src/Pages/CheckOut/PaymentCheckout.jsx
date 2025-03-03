import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";

const PaymentCheckout = ({
  setPaymentSuccess,
  transactionId,
  setTransactionId,
  id,
}) => {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  //   const [transactionId, setTransactionId] = useState("");
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();

  const price = 5;

  useEffect(() => {
    axios
      .post(`https://project-matrimony-server.vercel.app/create-payment-intent`, { price })
      .then((res) => {
        // console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => toast.error(err.message));
  }, [setClientSecret]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.name || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
      setError(confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction Id:", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        setPaymentSuccess(true);
        elements.getElement(CardElement).clear();

        // payment info send to the database
        const payments = {
          biodata_id: id,
          price: price,
          email: user?.email,
          transactionId: paymentIntent.id,
        };

        axios.post("https://project-matrimony-server.vercel.app/payments", payments).then((res) => {
          console.log(res.data);
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white capitalize transition-colors duration-300 transform bg-blue-800 rounded-lg lg:w-auto "
      >
        pay
      </button>
      {/* <button
        className="bg-cyan-700 text-white py-2 mt-5 rounded-md px-6"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button> */}
      <p className="text-red-600 mt-2">{error}</p>
      {transactionId && (
        <p className="text-green-600 mt-2">Transaction ID: {transactionId}</p>
      )}
    </form>
  );
};

export default PaymentCheckout;
