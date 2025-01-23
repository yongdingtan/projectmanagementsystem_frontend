import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import ProjectCard from '../Project/ProjectCard'

const ProjectList = () => {

    const [keyword, setKeyword] = useState('')
    const handleFilterChange = (section) => {
        console.log("value = ", section)
    }

    const handleSearchChange = (e) => {
        setKeyword(e.target.value)
    }

    const tags = [
        "all", "react", "spring", "mysql", "angular", "mongodb", "nodejs", "express", "java", "python", "django", "flask", "c#", "asp.net", "sql", "postgresql", "oracle", "firebase", "aws", "azure", "gcp", "docker", "kubernetes", "jenkins"
    ]

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
                                <h1 className='pb-3 text-gray-400 border-b'>Project List</h1>
                                <div className='pt-5'>
                                    <RadioGroup className='space-y-3 pt-5' defaultValue="all" onValueChange={(value) => handleFilterChange(value)}>
                                        <div className='flex items-center gap-2'>
                                            <RadioGroupItem value='all' id="all" className='radio-item' />
                                            <Label htmlFor="all">all</Label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <RadioGroupItem value='r2' id="r2" className='radio-item' />
                                            <Label htmlFor="r2">r2</Label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <RadioGroupItem value='r3' id="r3" className='radio-item' />
                                            <Label htmlFor="r3">r3</Label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <RadioGroupItem value='r4' id="r4" className='radio-item' />
                                            <Label htmlFor="r4">r4</Label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <RadioGroupItem value='r5' id="r5" className='radio-item' />
                                            <Label htmlFor="r5">r5</Label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <RadioGroupItem value='r6' id="r6" className='radio-item' />
                                            <Label htmlFor="r6">r6</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className='pt-9'>
                                <h1 className='pb-3 text-gray-400 border-b'>Tag</h1>
                                <div className='pt-5'>
                                    <RadioGroup className='space-y-3 pt-5' defaultValue="all" onValueChange={(value) => handleFilterChange(value)}>
                                        {tags.map((item) => <div key={item} className='flex items-center gap-2'>
                                            <RadioGroupItem value={item} id={`r1-${item}`} className='radio-item' />
                                            <Label htmlFor={`r1-${item}`}>{item}</Label>
                                        </div>)}
                                    </RadioGroup>
                                </div>
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </section>
            <section className='projectListSection w-full lg:w-[48rem'>
                <div className='flex gap-2 items-center pb-5 justify-between'>
                    <div className='relative p-0 w-full'>
                        <Input
                            onChange={handleSearchChange}
                            placeholder='Search project'
                            className='40% px-9 text-white placeholder-white'
                        />
                        <MagnifyingGlassIcon className='absolute top-3 left-4 text-white' />
                    </div>
                </div>
                <div>
                    <div className='space-y-5 min-h-[74vh]'>
                        {
                            keyword
                                ? [1, 1, 1].map((item) => <ProjectCard key={item} />)
                                : [1, 1, 1, 1, 1].map((item) => (<ProjectCard key={item} />))
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProjectList
