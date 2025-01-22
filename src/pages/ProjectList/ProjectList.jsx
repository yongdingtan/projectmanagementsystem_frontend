import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
 
const ProjectList = () => {

    const handleFilterChange = (section, value) => {
        console.log("value",value, section)
    }

  return (
    <div className='relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5'>
        <section className='filterSection'>
            <Card className='p-5 sticky top-10'>
                <div className='flex justify-between lg:w-[20rem]'>
                    <p className='text-xl -tracking-wider'>
                        Filters
                    </p>
                        <Button variant="ghost" size='icon'>
                            <MixerHorizontalIcon>

                            </MixerHorizontalIcon>
                        </Button>
                    </div>
                <CardContent className='mt-5'>
                    <ScrollArea className='space-y-7 h-[70vh]'>
                        <div>
                        <h1>Project List</h1>
                            <div className='pt-5'>
                                <RadioGroup defaultValue="all" onValueChange={(value) => handleFilterChange("category", value)}>
                                    <div className='flex items-center gap-2'>
                                        <RadioGroupItem value='all' id="all" className='radio-item' />
                                        <Label htmlFor="all">all</Label>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <RadioGroupItem value='r2' id="r2" className='radio-item'/>
                                        <Label htmlFor="r2">r2</Label>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <RadioGroupItem value='r3' id="r3" className='radio-item'/>
                                        <Label htmlFor="r3">r3</Label>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <RadioGroupItem value='r4' id="r4" className='radio-item'/>
                                        <Label htmlFor="r4">r4</Label>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <RadioGroupItem value='r5' id="r5" className='radio-item'/>
                                        <Label htmlFor="r5">r5</Label>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <RadioGroupItem value='r6' id="r6" className='radio-item'/>
                                        <Label htmlFor="r6">r6</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </section>
        <section className='projectListSection w-full lg:w-[48rem'>

        </section>
    </div>
  )
}

export default ProjectList
