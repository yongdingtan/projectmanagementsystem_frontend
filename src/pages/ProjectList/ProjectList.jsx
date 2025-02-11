import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import ProjectCard from '../Project/ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import { tags } from './tags';
import { fetchProjects, searchProjects } from '../../redux/project/action';

const ProjectList = () => {
    const { project } = useSelector((store) => store.project) // Access the correct state
    const [keyword, setKeyword] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all'); // Track selected category
    const [selectedTag, setSelectedTag] = useState('all'); // Track selected tag
    const dispatch = useDispatch()

    const handleFilterCategory = (value) => {
        setSelectedCategory(value); // Update selected category
        dispatch(fetchProjects({ category: value, tag: selectedTag })); // Include both category and tag
    };

    const handleFilterTag = (tag) => {
        setSelectedTag(tag); // Update selected tag
        dispatch(fetchProjects({ category: selectedCategory, tag })); // Include both category and tag
    };

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value.trim().toLowerCase();
        setKeyword(searchTerm);
        dispatch(searchProjects({ search: searchTerm}));
    };

    return (
        <div className='relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5'>
            <section className='filterSection'>
                <Card className='p-5 sticky top-10'>
                    <div className='flex justify-between lg:w-[20rem]'>
                        <p className='text-xl -tracking-wider'>Filters</p>
                        <Button variant="ghost" size='icon'>
                            <MixerHorizontalIcon />
                        </Button>
                    </div>
                    <CardContent className='mt-5'>
                        <ScrollArea className='space-y-7 h-[70vh]'>
                            <div>
                                <h1 className='pb-3 text-gray-400 border-b'>Category</h1>
                                <div className='pt-5'>
                                    <RadioGroup className='space-y-3 pt-5' defaultValue="all" onValueChange={(value) => handleFilterCategory(value)}>
                                        <div className='flex items-center gap-2'>
                                            <RadioGroupItem value='all' id="all" className='radio-item' />
                                            <Label htmlFor="all">All</Label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <RadioGroupItem value='fullStack' id="fullStack" className='radio-item' />
                                            <Label htmlFor="fullStack">Full Stack</Label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <RadioGroupItem value='frontEnd' id="frontEnd" className='radio-item' />
                                            <Label htmlFor="frontEnd">Frontend</Label>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <RadioGroupItem value='backEnd' id="backEnd" className='radio-item' />
                                            <Label htmlFor="backEnd">Backend</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className='pt-9'>
                                <h1 className='pb-3 text-gray-400 border-b'>Tag</h1>
                                <div className='pt-5'>
                                    <RadioGroup className='space-y-3 pt-5' defaultValue="all" onValueChange={(value) => handleFilterTag(value)}>
                                        {tags.map((item) => (
                                            <div key={item} className='flex items-center gap-2'>
                                                <RadioGroupItem value={item} id={`r1-${item}`} className='radio-item' />
                                                <Label htmlFor={`r1-${item}`}>{item}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </section>
            <section className='projectListSection w-full lg:w-[48rem]'>
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
                    <div className="space-y-5 min-h-[74vh]">
                        {project && project.length > 0 ? (
                            project
                                .filter((item) => item.name?.toLowerCase().includes(keyword.toLowerCase())) // Filtering logic
                                .map((item) => (
                                    <ProjectCard key={item.id} item={item} />
                                ))
                        ) : (
                            <div>No project found</div> // Message when no project matches the filter
                        )}

                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectList;