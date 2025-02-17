import { CheckCircledIcon } from '@radix-ui/react-icons'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const UpgradeResult = () => {
    const navigate = useNavigate()
  return (
    <div className='flex justify-center'>
      <Card className='mt-20 space-y-5 flex flex-col items-center'>
        <div className='flex items-center gap-4'>
            <CheckCircledIcon className='h-9 w-9 text-green-500'/>
                <p className='text-xl'>
                    Plan Upgrade Success
                </p>
        </div>
        <div className='space-y-3'>
            <p className='text-green-500'>
                Start Date:
            </p>
            <p className='text-red-500'>
                End Date:
            </p>
            <p className=''>
                Start Date:
            </p>
        </div>
        <Button onClick={()=> navigate("/")}>Home</Button>
      </Card>
    </div>
  )
}

export default UpgradeResult
