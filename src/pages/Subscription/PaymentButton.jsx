/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { createPayment } from "../../redux/payment/action";

const PaymentButton = ({ planType, jwt, className, children, disabled }) => {
  const dispatch = useDispatch();

  const handlePayment = () => {
    if (!disabled) {
      dispatch(createPayment({ planType, jwt }));
    }
  };

  return (
    <button
      onClick={handlePayment}
      className={`${className }  rounded-lg h-8 ${disabled ? "bg-gray-700 opacity-50 cursor-not-allowed" : "bg-white text-black hover:bg-gray-100"}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PaymentButton;