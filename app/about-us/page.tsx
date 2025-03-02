export default function AboutPage () {
    return (
        <div className='max-w-5xl mx-auto'>
            <h1 className='text-2xl font-bold'>Ecommerce App</h1>
            <div>
                <h3>Technologies Used:</h3>
                <ul className='px-4'>
                    <li><b>Next JS</b> a React JS framework for frontend and server actions.</li>
                    <li><b>Prisma ORM:</b> Simplifies database access with type-safe queries.</li>
                    <li><b>PostgreSQL:</b> A rock-solid relational database that&#39;s reliable, scalable, and loaded with advanced features for complex data handling.</li>
                    <li><b>Kinde</b> Streamlines user authentication, handling the heavy lifting of sign-ups, logins,
                        and security so I can focus on building app.
                    </li>
                    <li><b>Lucide React Icons:</b> Provides a sleek, modern set of icons.</li>
                    <li><b>Tailwind CSS:</b> A utility-first CSS framework.</li>
                    <li>TypeScript: Adds static typing to code, catching bugs before they hit production.</li>
                    <li>Recharts: Turns data into interactive, responsive charts effortlessly.</li>
                </ul>
            </div>
        </div>
    )
}