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

  const data = await getYoutubeVideoById(ctx.params.videoId);

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
  const { videoId } = router.query;

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
