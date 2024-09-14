"use client"

import { useRouter } from 'next/navigation';
import { BackIcon } from '@/components/Icons';

function BackButton() {
    const router = useRouter();

    return (
        <button
            className="btn btn-circle bg-base-content hover:bg-neutral-content absolute top-5 md:top-10 left-3 md:left-10"
            onClick={() => router.back()}
        >
            <BackIcon />
        </button>
    )
}

export default BackButton