/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux"
import { createPayment } from "../../redux/payment/action"
import { Button } from "@/components/ui/button"

const PaymentButton = ({ planType, jwt, className, children }) => {
  const dispatch = useDispatch();

  const handlePayment = () => {
    dispatch(createPayment({ planType, jwt }));
  };

  return (
    <Button onClick={handlePayment} className={className}>
      {children}
    </Button>
  );
};

export default PaymentButton;