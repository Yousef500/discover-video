import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import styles from "./navbar.module.css";
import magic from "../../lib/magic-client";

const NavBar = () => {
    const router = useRouter();

    const [showDropdown, setShowDropdown] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const getUser = async () => {
            // Assumes user is already logged in
            try {
                const {email, publicAddress} = await magic.user.getMetadata();
                if (email) {
                    setUsername(email)
                }
            } catch (e) {
                console.log({"error retrieving email address": e})
                setUsername("")
            }
        }

        getUser();

    }, []);

    const handleSignOut = async (e) => {
        e.preventDefault()

        try {
            await magic.user.logout();
            console.log(magic.user.isLoggedIn())
            router.push('/login')
        } catch (e) {
            console.log({"Error logging out": e})
            router.push('/login')
        }
    }

    const handleOnClickHome = (e) => {
        e.preventDefault();
        router.push("/");
    };

    const handleOnClickMyList = (e) => {
        e.preventDefault();
        router.push("/browse/my-list");
    };

    const handleShowDropdown = (e) => {
        e.preventDefault();
        setShowDropdown(!showDropdown);
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
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
                <ul className={styles.navItems}>
                    <li className={styles.navItem} onClick={handleOnClickHome}>
                        Home
                    </li>
                    <li className={styles.navItem2} onClick={handleOnClickMyList}>
                        My List
                    </li>
                </ul>
                <nav className={styles.navContainer}>
                    <div>
                        <button className={styles.usernameBtn} onClick={handleShowDropdown}>
                            <p className={styles.username}>{username}</p>
                            <Image
                                src={"/static/expand_more.svg"}
                                width={"24px"}
                                height={"24px"}
                                alt={"expand dropdown"}
                            />
                        </button>
                        {showDropdown && (
                            <div className={styles.navDropdown}>
                                <div>
                                    <div className={styles.lineWrapper}>
                                        <a onClick={handleSignOut} className={styles.linkName}>Sign out</a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default NavBar;
