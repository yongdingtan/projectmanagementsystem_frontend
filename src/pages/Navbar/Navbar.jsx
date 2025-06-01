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
    // Initialize state based on localStorage or system preference
    const [isDarkMode, setIsDarkMode] = useState(() => {
      // Check localStorage first
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      // Fallback to system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });
  
    useEffect(() => {
      // Apply the theme immediately when component mounts
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }, [isDarkMode]);
  
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };
  
    return { isDarkMode, toggleDarkMode };
  };
  
  const Navbar = () => {
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
  
    const handleLogout = () => {
      dispatch(logout());
      navigate("/", { replace: true });
    };
  
    return (
      <div className="border-b py-4 px-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p onClick={() => navigate("/")} className="cursor-pointer">
            Project Management
          </p>
          <Dialog>
            <DialogTrigger asChild>
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
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
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