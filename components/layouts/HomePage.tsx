import React from "react";

export default function HomePage({
                                     children,
                                 }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <h1>Home page</h1>
            {children}
            <footer>home footer</footer>
        </div>
    )
}