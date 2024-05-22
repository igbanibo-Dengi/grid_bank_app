import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const loggedIn = await getLoggedInUser();
    // console.log(loggedIn);
    return (
        <main className="flex min-h-screen justify-between font-inter">
            {children}
            <div className="auth-asset">
                <div>
                    <Image
                        src='/icons/auth-image.svg'
                        alt="auth-image"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        </main>
    );
}
