import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

const CommentCard = () => {
    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarFallback>
                        R
                    </AvatarFallback>
                </Avatar>
                <div className='space-y-1'>
                    <p>test</p>
                    <p>asd</p>
                </div>
            </div>
            <Button className='rounded-full' variant='ghost' size='icon'>
                <TrashIcon />
            </Button>
        </div>
    )
}

export default CommentCard
