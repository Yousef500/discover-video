import Image from "next/image";
import { useState } from "react";
import styles from "./card.module.css";

const Card = ({ imgUrl, size = "medium" }) => {

    const [imgSrc, setImgSrc] = useState(imgUrl)

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = (e) => {
    console.log("hi error");
    setImgSrc("/static/clifford.webp")
  };

  return (
    <div className={styles.container}>
      <div className={classMap[size]}>
        <Image
          src={imgSrc}
          alt="image"
          layout={"fill"}
          className={styles.cardImg}
          onError={handleOnError}
        />
      </div>
    </div>
  );
};

export default Card;
