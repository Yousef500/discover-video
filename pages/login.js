import Head from "next/head";
import styles from "/styles/Login.module.css";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import magic from "../lib/magic-client";

const Login = () => {

    const [userMsg, setUserMsg] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleComplete = () => {
            setLoading(false)
        }
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete);
        }
    }, [router.events])

    const handleOnChangeEmail = (e) => {
        const input = e.target.value;
        if (input) {
            setEmail(input);
            setUserMsg("")
        } else {
            setEmail("")
        }

    }

    const handleLoginWithEmail = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log("login")
        if (email) {
            setUserMsg("")

            // log in a user by their email
            try {
                const didToken = await magic.auth.loginWithMagicLink({email});
                if (didToken) {
                    setLoading(false)
                    router.push('/')
                }
                setLoading(false)
            } catch (e) {
                console.log({e})
                setLoading(false)
            }

        } else {
            setLoading(false)
            setUserMsg("Enter a valid email address")
        }
    }
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerWrapper}>
                    <Head>
                        <title>Netflix SignIn</title>
                    </Head>

                    <Link href="/">
                        <a className={styles.logoLink}>
                            <div className={styles.logoWrapper}>
                                <Image
                                    src={"/static/netflix.svg"}
                                    width={"111px"}
                                    height={"30px"}
                                    alt={"Netflix logo"}
                                />
                            </div>
                        </a>
                    </Link>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.mainWrapper}>
                    <h1 className={styles.signinHeader}>Sign In</h1>
                    <input onChange={handleOnChangeEmail} type={"text"} placeholder={"Email address"}
                           className={styles.emailInput}/>
                    {userMsg && <p className={styles.userMsg}>{userMsg}</p>}
                    <button className={styles.loginBtn} onClick={handleLoginWithEmail}>
                        {loading ? "loading..." : "Sign In"}
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Login