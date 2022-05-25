import Card from "./card";
import styles from "./section-cards.module.css";

const SectionCards = ({ title, videos = [], size }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((vid, index) => (
          <Card
            cardId={index}
            key={vid.videoId}
            imgUrl={vid.imgUrl}
            size={size}
            lastId={videos.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default SectionCards;
