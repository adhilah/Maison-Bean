import RazorpayButton from "./RazorpayButton";

function Checkout() {

    return (
        <div>
            <h1>Checkout</h1>

            <RazorpayButton amount={500} />
        </div>
    );
}

export default Checkout;