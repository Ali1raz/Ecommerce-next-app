'use client';

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {X} from "lucide-react";

export default function SearchFormReset() {
    const reset = () => {
        const form = document.querySelector('.searchForm') as HTMLFormElement;
        if (form) form.reset();
    }

    return (
        <Button type='reset' variant='destructive' className='' onClick={reset} asChild={true}>
            <Link className='bg-red-500/35 px-1  rounded-none  w-full h-full ' href='/'>
                <X/>
            </Link>
        </Button>
    )
}