import { useState } from "react"
import Login from "./Login"
import SignUp from "./SignUp"
import { Button } from "@/components/ui/button"
import "./Auth.css"

const Auth = () => {
    const [active, setActive] = useState(true)
  return (
    <div className="loginContainer">
        <div className="box h-[30rem] w-[25rem]">
            <div className="minContainer login">
                <div className="loginBox w-full px-10 space-y-5">
                    {active?<SignUp/>:<Login/>}
                    <div>
                        <span>{active? "Already have account?":"Don't have account?"}</span>
                        <Button variant="ghost" onClick={() => setActive(!active)}>{active? "Login":"Register"}</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Auth
