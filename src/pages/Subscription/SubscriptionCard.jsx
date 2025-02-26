/* eslint-disable react/prop-types */
import { CheckCircledIcon } from "@radix-ui/react-icons";
import PaymentButton from "./PaymentButton";

const SubscriptionCard = ({ data }) => {
  const jwt = localStorage.getItem("jwt"); // Retrieve the JWT token from local storage
  const isCurrentPlan = data.buttonName === "Current Plan";

  return (
    <div className="rounded-xl bg-[#1b1b1b] bg-opacity-20 shadow-[#14173b] shadow-2xl card p-5 space-y-5 w-[18rem]">
      <p>{data.planName}</p>
      <p>
        <span className="text-xl font-semibold">SGD${data.price}/</span>
        <span>{data.planType}</span>
      </p>
      {data.planType === "ANNUALLY" && <p className="text-green-400">30% discount</p>}

      {/* Conditionally render the button */}
      {isCurrentPlan ? (
        <PaymentButton disabled className="w-full">
          Current Plan
        </PaymentButton>
      ) : (
        <PaymentButton planType={data.planType} jwt={jwt} className="w-full">
          {data.buttonName}
        </PaymentButton>
      )}

      <div>
        {data.features.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <CheckCircledIcon />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionCard;