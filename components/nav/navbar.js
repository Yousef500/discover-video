import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./navbar.module.css";

const NavBar = ({ username }) => {
  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/brows/my-list");
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
                    <Link href="/">
                      <a className={styles.linkName}>Sign out</a>
                    </Link>
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
