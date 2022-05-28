import '../styles/globals.css'
import {useEffect, useState} from "react";
import magic from "../lib/magic-client";
import {useRouter} from "next/router";
import Loading from "../components/loading/loading";

function MyApp({Component, pageProps}) {
    const router = useRouter()
    const [iseLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const isLoggedIn = async () => {
            const loggedIn = await magic.user.isLoggedIn()
            if (loggedIn) {
                await router.push("/")
            } else {
                await router.push("/login")
            }
        }
        isLoggedIn().then(() => setIsLoading(false)).catch(() => setIsLoading(false));

    }, [router.pathname]);
    return iseLoading ? <Loading/> : <Component {...pageProps} />
}

export default MyApp
