/* eslint-disable no-constant-condition */
import { useDispatch, useSelector } from "react-redux"
import SubscriptionCard from "./SubscriptionCard"
import { useEffect } from "react"
import { getUserSubscription } from "../../redux/subscription/action"

const plan1 = ["a", "b", "c"]
const plan2 = ["a", "b", "c", "d", "e", "f"]
const plan3 = ["a", "b", "c", "d", "e", "f", "g", "h", "i"]

const Subscription = () => {
  const { subscription } = useSelector(state => state.subscription)
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserSubscription(jwt))
  }, [])

  return (
    <div className="p-10">
      <p className="text-5xl font-semibold py-5 pb-16 text-center">Pricing</p>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
        <SubscriptionCard data={{ planName: "Free", features: plan1, planType: "FREE", price: 0, buttonName: subscription?.planType === "FREE" ? "Current Plan" : "Get Started" }} />
        <SubscriptionCard data={{ planName: "Monthly Paid Plan", features: plan2, planType: "MONTHLY", price: 5, buttonName: subscription?.planType === "MONTHLY" ? "Current Plan" : "Get Started" }} />
        <SubscriptionCard data={{ planName: "Annually Paid Plan", features: plan3, planType: "ANNUALLY", price: 42, buttonName: subscription?.planType === "ANNUALLY" ? "Current Plan" : "Get Started" }} />
      </div>
    </div>
  )
}

export default Subscription
