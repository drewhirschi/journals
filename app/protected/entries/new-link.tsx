"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function NewEntryLink() {
    return (

        <Button asChild>
            <Link href={"entry/" + new Date().toLocaleDateString('en-CA')}>Today</Link>
        </Button>
    )
}