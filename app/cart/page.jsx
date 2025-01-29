import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {redirect} from "next/navigation";
import {LoginLink, RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default async function Cart() {
    const {isAuthenticated} = getKindeServerSession();
    if (!(await isAuthenticated())) {
        // redirect("/api/auth/login");
        return (
            <div>
                <h1 className="text-2xl text-center">Verify to See Cart</h1>
                <div>
                    <LoginLink>Login</LoginLink>
                    <RegisterLink>Sign Up</RegisterLink>
                </div>
            </div>
        )
    }

    return (
        <div>
            you re verified Cart
        </div>
    )
}