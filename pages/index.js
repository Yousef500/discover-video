import Head from "next/head";
import Banner from "../components/banner/banner";
import SectionCards from "../components/card/section-cards";
import NavBar from "../components/nav/navbar";
import {getPopularVideos, getVideos} from "../lib/videos";
import styles from "../styles/Home.module.css";
import {magic} from "../lib/magic-client";

export async function getServerSideProps() {
    const disneyVideos = await getVideos("Disney trailer");
    const travelVideos = await getVideos("Travel");
    const productivityVideos = await getVideos("Productivity");
    const popularVideos = await getPopularVideos();
    return {
        props: {
            disneyVideos,
            travelVideos,
            productivityVideos,
            popularVideos,
        },
    };
}

export default function Home({disneyVideos, travelVideos, productivityVideos, popularVideos}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Netvideo</title>
                <meta name="description" content="a netflix like app"/>
            </Head>
            <div className={styles.main}>
                <NavBar/>

                <Banner
                    title={"Clifford the red dog"}
                    subtitle={"a very cute dog"}
                    imgUrl={"/static/clifford.webp"}
                    videoId=""
                />

                <div className={styles.sectionWrapper}>
                    <SectionCards title={"Disney"} videos={disneyVideos} size="large"/>
                    <SectionCards title={"Travel"} videos={travelVideos} size="small"/>
                    <SectionCards
                        title={"Productivity"}
                        videos={productivityVideos}
                        size="medium"
                    />
                    <SectionCards title={"Popular"} videos={popularVideos} size="small"/>
                </div>
            </div>
        </div>
    );
}
