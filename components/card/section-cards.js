import Link from "next/link";
import Card from "./card";
import styles from "./section-cards.module.css";

const SectionCards = ({ title, videos = [], size }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((vid, index) => (
          <Link href={`/video/${vid.videoId}`} key={vid.videoId}>
            <a>
              <Card
                cardId={index}
                imgUrl={vid.imgUrl}
                size={size}
                lastId={videos.length - 1}
              />
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SectionCards;
