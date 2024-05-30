import HeaderBox from "@/components/HeaderBox";
import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const loggedIn = await getLoggedInUser();
    // console.log(loggedIn);

    if (!loggedIn) redirect('/sign-in')


    return (
        <main className="flex h-screen w-full font-inter no-scrollbar">
            <SideBar user={loggedIn} />
            <div className="flex size-full flex-col">
                <div className="root-layout">
                    <Image
                        src='/icons/logo.svg'
                        width={30}
                        height={30}
                        alt='Gringotts logo'
                    />
                    <div>
                        <MobileNav user={loggedIn} />
                    </div>
                </div>
                <div className="h-screen no-scrollbar overflow-y-scroll flex flex-col bg-[#F4F7FA] " >
                    <HeaderBox
                        type="greeting"
                        title="Welome"
                        user={loggedIn?.firstName || 'Guest'}
                        subtext="Acess and manage your account and transactions efficiently"
                    />
                    <div className="no-scrollbar overflow-y-scroll rounded-tl-3xl">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}
