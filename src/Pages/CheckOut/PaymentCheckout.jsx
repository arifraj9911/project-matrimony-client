import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const PaymentCheckout = ({setPaymentSuccess,transactionId,setTransactionId}) => {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
//   const [transactionId, setTransactionId] = useState("");
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();

  const price = 5;

  useEffect(() => {
    axios
      .post(`http://localhost:5000/create-payment-intent`, { price })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => console.log(err.message));
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
      console.log("payment error", error);
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
        className="bg-cyan-700 text-white py-2 mt-5 rounded-md px-6"
        type="submit"
        disabled={!stripe || !clientSecret }
      >
        Pay 
      </button>
      <p className="text-red-600 mt-2">{error}</p>
      {transactionId && (
        <p className="text-green-600 mt-2">Transaction ID: {transactionId}</p>
      )}
    </form>
  );
};

export default PaymentCheckout;
