import Link from 'next/link'
import { headers } from 'next/headers'

export default async function NotFound() {
    const headersList = await headers()
    const domain = headersList.get('host')
    // const data = await getSiteData(domain)
    return (
        <div>
            <h2>Not Found: {domain}</h2>
            <p>Could not find requested resource</p>
            <p>
                Go <Link href="/">home</Link>
            </p>
        </div>
    )
}