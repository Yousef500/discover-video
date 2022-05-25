import cls from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import styles from "./card.module.css";

const Card = ({ imgUrl = "", size = "medium", cardId, lastId }) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    console.log("hi error");
    setImgSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1159"
    );
  };

  const scale = cardId === 0 || cardId === lastId ? { scaleY: 1.1 } : { scale: 1.1 };

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        whileHover={scale}
      >
        <Image
          src={imgSrc}
          alt="image"
          layout={"fill"}
          className={styles.cardImg}
          onError={handleOnError}
          priority="high"
        />
      </motion.div>
    </div>
  );
};

export default Card;
