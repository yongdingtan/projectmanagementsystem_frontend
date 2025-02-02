import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateProjectForm from "../Project/CreateProjectForm";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PersonIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/action";

// Custom hook for dark mode logic
const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        const html = document.documentElement;
        if (html.classList.contains("dark")) {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        } else {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
        }
    };

    return { isDarkMode, toggleDarkMode };
};

const Navbar = () => {
    const { auth } = useSelector((store) => store);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="border-b py-4 px-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <p onClick={() => navigate("/")} className="cursor-pointer">
                    Project Management
                </p>
                <Dialog>
                    <DialogTrigger>
                        <Button variant="ghost">New Project</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>Create New Project</DialogHeader>
                        <CreateProjectForm />
                    </DialogContent>
                </Dialog>
                <Button onClick={() => navigate("/upgrade_plan")} variant="ghost">
                    Upgrade
                </Button>
            </div>
            <div className="flex gap-3 items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full border-2 border-gray-500"
                        >
                            <PersonIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <p>{auth.user?.fullName}</p>
                {/* Toggle Dark Mode Button */}
                <Button variant="outline" onClick={toggleDarkMode}>
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                </Button>
            </div>
        </div>
    );
};

export default Navbar;