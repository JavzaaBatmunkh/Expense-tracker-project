import { Button } from "./ui/button";
import { useRouter } from 'next/navigation'

export function Header() {
    const router = useRouter()
    return <header> Header
        <Button onClick={() => router.push(`?create=new`)}>+Record</Button>
    </header>
}