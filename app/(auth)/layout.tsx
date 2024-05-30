import Image from "next/image";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <main className="flex min-h-screen justify-between font-inter">
            {children}
            <div className="auth-asset">
                <div>
                    <Image
                        src='/auth-image.png'
                        alt="auth-image"
                        width={800}
                        height={800}
                        className="border-4 border-black-2 rounded-xl translate-x-28"
                    />
                </div>
            </div>
        </main>
    );
}
