/* eslint-disable no-unused-vars */
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserSubscription, upgradeSubscription } from '../../redux/subscription/action'

const UpgradeResult = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { subscription} = useSelector(state => state.subscription)
    const queryParams = new URLSearchParams(location.search)
    const paymentId = queryParams.get("payment_id")
    const planType = queryParams.get("planType")
    const jwt = localStorage.getItem("jwt");

    console.log(planType)

    useEffect(() => {
      dispatch(getUserSubscription(jwt))
      dispatch(upgradeSubscription({paymentId, planType, jwt}))
    }, [])

  return (
    <div className='flex justify-center'>
      <Card className='mt-20 p-5 space-y-5 flex flex-col items-center'>
        <div className='flex items-center gap-4'>
            <CheckCircledIcon className='h-9 w-9 text-green-500'/>
                <p className='text-xl'>
                    Plan Upgrade Success
                </p>
        </div>
        <div className='space-y-3'>
            <p className='text-green-500'>
                Start Date: {subscription?.subscriptionStartDate}
            </p>
            <p className='text-red-500'>
                End Date: {subscription?.subscriptionEndDate}
            </p>
        </div>
        <Button onClick={()=> navigate("/")}>Home</Button>
      </Card>
    </div>
  )
}

export default UpgradeResult
