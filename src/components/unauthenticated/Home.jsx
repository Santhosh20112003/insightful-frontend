import React from "react";
import Bannar from "./parts/Bannar";
import Navbar from "./parts/Navbar";
import PageProgress from "./parts/PageProgress";
import Hero from "./parts/Hero";
import RecentBlogs from "./parts/RecentBlogs";
import HotTopics from "./parts/HotTopics";
import Insights from "./parts/Insights";
import Listen from "./parts/Listen";
import CloudPoint from "./parts/CloudPoint";
import Api from "./parts/Api";
import Working from "./parts/Working";
import Footer from "./parts/Footer";
import { useDetails } from "../../utils/Context/MetaDetails";

function Home() {
  const {ScrollToTop} = useDetails();
  return (
    <div className="">
      <PageProgress />
      <Bannar />
      <Navbar />
      <Hero />
      <RecentBlogs />
      <HotTopics />
      <Insights />
      <Api />
      <CloudPoint />
      <Listen />
      <Working />
      <ScrollToTop/>
      <Footer />
    </div>
  );
}

export default Home;
