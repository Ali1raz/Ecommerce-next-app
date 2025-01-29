import {prisma} from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import generateCookie from "@/app/utils/generateCookie";

type SignUpFormData = {
    name: string;
    username: string;
    email: string;
    password: string;
}

export async function signup(formData: SignUpFormData) {
    try {
        const {name, username, email, password} = formData;
        if (!name || !username || !email || !password) {
            throw new Error("All fields are required");
        }

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {username: username},
                    {email: email}
                ]
            }
        })

        if (user) {
            throw new Error("User already exists");
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const avatar = `https://avatar.iran.liara.run/username?username=${username}`
        const newUser = await prisma.user.create({
            data: {
                name, username, email, password: hashedPassword, avatar
            }
        })

        if (newUser) {
            generateCookie(newUser.id)
            return newUser;
        }

    } catch (e: any) {
        return {error: e};
    }
}

export function login(formData: FormData) {
}

export function logout() {
}
