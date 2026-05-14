import React from "react";
import { createOrder, verifyPayment } from "./paymentService";

const RazorpayButton = ({ amount }) => {

    const handlePayment = async () => {

        try {

            // Step 1: Create Order
            const order = await createOrder(amount);

            const options = {
                key: "rzp_test_SoWqac341UeFbs",

                amount: amount * 100,

                currency: "INR",

                name: "MaisonBean",

                description: "Order Payment",

                order_id: order.orderId,

                handler: async function (response) {

                    console.log(response);

                    // Step 2: Verify Payment
                    const verifyData = {
                        razorpayOrderId:
                            response.razorpay_order_id,

                        razorpayPaymentId:
                            response.razorpay_payment_id,

                        razorpaySignature:
                            response.razorpay_signature
                    };

                    const result =
                        await verifyPayment(verifyData);

                    if (result.success) {
                        alert("Payment Success");
                    }
                    else {
                        alert("Payment Verification Failed");
                    }
                },

                prefill: {
                    name: "Customer Name",
                    email: "customer@gmail.com",
                    contact: "9999999999"
                },

                theme: {
                    color: "#0f172a"
                }
            };

            const razor = new window.Razorpay(options);

            razor.open();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button onClick={handlePayment}>
            Pay ₹{amount}
        </button>
    );
};

export default RazorpayButton;
