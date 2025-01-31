'use client';

import Link from "next/link";

export default function SearchFormReset() {
    const reset = () => {
        const form = document.querySelector('.searchForm') as HTMLFormElement;
        if (form) form.reset();
    }

    return (
        <button type='reset' className='' onClick={reset}>
            <Link className='bg-red-500/35 py-1 px-2' href='/'>❌</Link>
        </button>
    )
}