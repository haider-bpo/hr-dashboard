import { useState, useEffect } from "react";
import { useRoutes, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import "aos/dist/aos.css"; // Import AOS styles
import AOS from "aos"; // Import the AOS library
import routes from "./routes";
import Loader from "./components/@core/Loader";
import { Toaster } from "./components/ui/toaster";

const AppRoutes = () => {
  return useRoutes(routes);
};

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  // Start loading on route change
  useEffect(() => {
    const handleStartLoading = () => setProgress(30);
    const handleFinishLoading = () => setProgress(100);

    const handleRouteChange = () => {
      handleStartLoading();

      if (document.readyState === "complete") {
        handleFinishLoading();
      } else {
        window.addEventListener("load", handleFinishLoading);
      }
    };
    handleRouteChange();

    return () => {
      window.removeEventListener("load", handleFinishLoading);
      setProgress(0);
    };
  }, [navigate]);

  useEffect(() => {
    AOS.init({
      duration: 400, // Animation duration (ms)
      easing: "ease-in-out", // Easing function
      once: false, // Whether animations should happen only once
    });
  }, []);

  // Show or hide loader based on showLoader state
  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 500);
  }, []);

  // Render loading bar if showLoader is true
  if (showLoader) return <Loader />;

  return (
    <>
      <LoadingBar
        color="#005BEA"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Toaster />
      <AppRoutes />
    </>
  );
}

export default App;
