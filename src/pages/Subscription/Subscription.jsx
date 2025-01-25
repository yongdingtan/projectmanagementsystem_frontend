/* eslint-disable no-constant-condition */
import SubscriptionCard from "./SubscriptionCard"

const plan1 = ["a","b","c"]
const plan2 = ["a","b","c","d","e","f"]
const plan3 = ["a","b","c","d","e","f","g","h","i"]

const Subscription = () => {
  return (
    <div className="p-10">
      <p className="text-5xl font-semibold py-5 pb-16 text-center">Pricing</p>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
        <SubscriptionCard data={{planName:"Free", features:plan1, planType:"FREE", price:0, buttonName:true?"Current Plan":"Get Started"}}/>
        <SubscriptionCard data={{planName:"Monthly Paid Plan", features:plan2, planType:"MONTHLY", price:5, buttonName:true?"Current Plan":"Get Started"}}/>
        <SubscriptionCard data={{planName:"Annually Paid Plan", features:plan3, planType:"ANNUALLY", price:42, buttonName:true?"Current Plan":"Get Started"}}/>
      </div>
    </div>
  )
}

export default Subscription
