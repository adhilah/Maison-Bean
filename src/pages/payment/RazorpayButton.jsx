import React from "react";

import { useNavigate }
from "react-router-dom";

import {
    createOrder,
    verifyPayment
}
from "./paymentService";

const RazorpayButton = ({ amount }) => {

    const navigate = useNavigate();

    const handlePayment = async () => {

        try {

            // =====================================
            // CREATE ORDER
            // =====================================

            const order =
                await createOrder(amount);

            const options = {

                key:
                    "rzp_test_SoWqac341UeFbs",

                amount:
                    amount * 100,

                currency:
                    "INR",

                name:
                    "MaisonBean",

                description:
                    "Order Payment",

                order_id:
                    order.orderId,

                // =====================================
                // PAYMENT SUCCESS
                // =====================================

                handler: async function (
                    response
                ) {

                    console.log(response);

                    const verifyData = {

                        razorpayOrderId:
                            response
                                .razorpay_order_id,

                        razorpayPaymentId:
                            response
                                .razorpay_payment_id,

                        razorpaySignature:
                            response
                                .razorpay_signature
                    };

                    const result =
                        await verifyPayment(
                            verifyData
                        );

                    // =====================================
                    // SUCCESS
                    // =====================================

                    if (result.success) {

                        alert(
                            "Payment Success"
                        );

                        // NAVIGATE TO ORDERS PAGE
                        window.location.href = "/orders";
                    }

                    // =====================================
                    // FAILED
                    // =====================================

                    else {

                        alert(
                            "Payment Verification Failed"
                        );
                    }
                },

                // =====================================
                // PREFILL
                // =====================================

                prefill: {

                    name:
                        "Customer Name",

                    email:
                        "customer@gmail.com",

                    contact:
                        "9999999999"
                },

                // =====================================
                // THEME
                // =====================================

                theme: {
                    color:
                        "#0f172a"
                }
            };

            const razor =
                new window.Razorpay(
                    options
                );

            razor.open();

        }

        catch (error) {

            console.error(error);

            alert(
                "Payment Failed"
            );
        }
    };

    return (
        <button onClick={handlePayment}>
            Pay ${amount}
        </button>
    );
};

export default RazorpayButton;