import { AnimationControls, motion, useAnimation } from "framer-motion";
import { useLayoutEffect, useState } from "react";
import useSWR from "swr";
import "./App.css";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateWindowSize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateWindowSize);
    updateWindowSize();
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);
  return windowSize;
};

const useAnimationControlsList = () => {
  const controlsAd = useAnimation();
  const controlsPage1 = useAnimation();
  const controlsPage2 = useAnimation();
  const controlsPage3 = useAnimation();
  const controlsPage4 = useAnimation();
  const controlsPage5 = useAnimation();
  const controlsPage6 = useAnimation();
  const controlsPage7 = useAnimation();
  const controlsPage8 = useAnimation();
  const controlsPage9 = useAnimation();
  const controlsPage10 = useAnimation();
  const controlsPage11 = useAnimation();
  const controlsPage12 = useAnimation();
  const controlsPage13 = useAnimation();
  const controlsPage14 = useAnimation();
  const controlsPage15 = useAnimation();

  return [
    controlsAd,
    controlsPage1,
    controlsPage2,
    controlsPage3,
    controlsPage4,
    controlsPage5,
    controlsPage6,
    controlsPage7,
    controlsPage8,
    controlsPage9,
    controlsPage10,
    controlsPage11,
    controlsPage12,
    controlsPage13,
    controlsPage14,
    controlsPage15,
  ];
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const App = () => {
  const dimensions = useWindowSize();
  const controlsList = useAnimationControlsList();

  const [currentPage, setCurrentPage] = useState(0);

  const next = () => {
    if (currentPage === controlsList.length - 1) return;

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    controlsList.forEach((control) => {
      control.start({
        x: nextPage * dimensions[0] * 0.8,
      });
    });
  };

  const prev = () => {
    if (currentPage === 0) return;

    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    controlsList.forEach((control) => {
      control.start({
        x: prevPage * dimensions[0] * 0.8,
      });
    });
  };

  return (
    <>
      <h1>viewer demo</h1>
      <button onClick={prev}>prev</button>
      <button onClick={next}>next</button>
      <div className="contents-wrapper">
        {controlsList.map((control, index) => (
          <Contents
            key={index}
            controls={control}
            page={index}
            currentPage={currentPage}
          />
        ))}
      </div>
    </>
  );
};

const Contents = ({
  controls,
  page,
  currentPage,
}: {
  controls: AnimationControls;
  page?: number;
  currentPage?: number;
}) => {
  if (page === 0) {
    return (
      <motion.div
        style={{ display: "flex" }}
        animate={controls}
        transition={{ duration: 0.4 }}
      >
        <div style={{ width: "10vw" }} />
        <div style={{ width: "60vw", color: "white" }}>ad</div>
        <div style={{ width: "10vw" }} />
      </motion.div>
    );
  }

  const { data, error, isLoading } = useSWR<{ url: string }>(
    page ? `/page/${currentPage}` : null,
    fetcher
  );

  return (
    <motion.div
      style={{ display: "flex", minHeight: 500 }}
      animate={controls}
      transition={{ duration: 0.5 }}
    >
      <div style={{ width: "10vw" }} />
      {data ? (
        <img src={data.url} style={{ width: "60vw" }} />
      ) : (
        <div style={{ width: "60vw", color: "white" }}>Loading</div>
      )}
      <div style={{ width: "10vw" }} />
    </motion.div>
  );
};

export default App;
