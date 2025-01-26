'use client';

import Link from "next/link";

export default function SearchFormReset(props) {
    const reset = () => {
        const form = document.querySelector('.searchForm');
        if (form) form.reset();
    }

    return (
        <button type='reset' className='' onClick={reset}>
            <Link href='/' className='bg-red-500/35 py-1 px-2'>❌</Link>
        </button>
    )
}