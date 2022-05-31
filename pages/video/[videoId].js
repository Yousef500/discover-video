import cls from "classnames";
import { useRouter } from "next/router";
import Modal from "react-modal";
import NavBar from "../../components/nav/navbar";
import { getYoutubeVideoById } from "../../lib/videos";
import styles from "/styles/Video.module.css";

Modal.setAppElement("#__next");

export async function getStaticProps(ctx) {
  // const video = {
  //   title: "Hi cute dog",
  //   publishTime: "1990-01-01",
  //   description: "A big red dog... can he get any bigger?",
  //   channelTitle: "Paramount Pictures",
  //   viewCount: 10000,
  // };

  const data =
    process.env.DEVELOPMENT === "true"
      ? [
          {
            videoId: "Q_vjDDWczG8",
            title: "Gintama's love confession | Gintoki X Tsukuyo | Gintama",
            imgUrl:
              "https://www.google.com.sa/url?sa=i&url=https%3A%2F%2Fwww.deviantart.com%2Fblackotakuz%2Fjournal%2FWhy-do-I-think-that-Gintoki-has-some-feelings-for-553336121&psig=AOvVaw0QLmdprjxJg6jd2i-5qSRa&ust=1654080805333000&source=images&cd=vfe&ved=2ahUKEwiSkPanyYn4AhVSM8AKHW6EBH4QjRx6BAgAEAs",
            description: `Anime : "Gintama". 


  DISCLAIMER: Be aware this channel is for promotion and entertainment purposes only.
  All belongs to the original creators and to the respective owners.
  
  Copyright Disclaimer Under Section 107 of the Copyright Act 1976, allowance is made for "fair use" for purposes such as criticism, comment, news reporting, teaching, scholarship, and research. Fair use is a use permitted by copyright statute that might otherwise be infringing. Non-profit, educational or personal use tips the balance in favor of fair use.`,
            publishTime: "Feb 6, 2022",
            channelTitle: "Anime Crash Point",
            viewCount: "9,564",
          },
        ]
      : await getYoutubeVideoById(ctx.params.videoId);

  return {
    props: {
      video: data.length > 0 ? data[0] : {},
    },
    revalidate: 10, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const listOfVideos = ["zqrF1L8Jiwo", "XEZ1awvi-FA", "rU-EgcWaUPk"];

  const paths = listOfVideos.map((videoId) => ({ params: { videoId } }));
  return { paths, fallback: "blocking" };
}

const Video = ({ video }) => {
  const router = useRouter();

  const { title, publishTime, description, channelTitle, viewCount } = video;
  const videoId =
    process.env.NEXT_PUBLIC_DEVELOPMENT === "true"
      ? "Q_vjDDWczG8"
      : router.query.videoId;

  const handleClose = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <Modal
        className={styles.modal}
        isOpen={true}
        contentLabel="watch the video"
        onRequestClose={handleClose}
        shouldCloseOnEsc={true}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=1&rel=1`}
          frameBorder="0"
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
