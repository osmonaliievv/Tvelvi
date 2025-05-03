import RegisterPage from "../pages/RegisterPage/RegisterPage";
import MessagePage from "../pages/MessagePage/MessagePage";
import HomePage from "../pages/HomePage/HomePage";
import PartnersPage from "../pages/PartnersPage/PartnersPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import NextPartnersPage from "../pages/NexrPartnersPage/NextPatnersPage";
import FeaturesFlow from "../pages/FeatureCard/FeaturesFlow";
import BasicFeaturesPage from "../pages/BasicFeaturesPage/BasicFeaturesPage";
import DesignPage from "../pages/DesighPage/DesighPage";
import FinalPricePage from "../pages/FinalPricePage/FinalPricePage";
import AdditionalFeaturesPage from "../pages/AdditionalFeaturesPage/AdditionalFeaturesPage";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import MyComponent from "../components/MyComponent";
const routes = [
  { id: 1, path: "/", element: <RegisterPage /> },
  { id: 2, path: "/message", element: <MessagePage /> },
  { id: 3, path: "/home", element: <HomePage /> },
  { id: 4, path: "/partners", element: <PartnersPage /> },
  { id: 5, path: "/profile", element: <ProfilePage /> },
  { id: 6, path: "/nextPartners", element: <NextPartnersPage /> },
  { id: 7, path: "/basicFeaturesPage", element: <BasicFeaturesPage /> },
  {
    id: 8,
    path: "/additionalFeaturesPage",
    element: <AdditionalFeaturesPage />,
  },
  { id: 9, path: "/designPage", element: <DesignPage /> },
  { id: 10, path: "/finalPrice", element: <FinalPricePage /> },
  { id: 11, path: "/features/*", element: <FeaturesFlow /> },
];

const MainRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <MyComponent />
      <Routes>
        {routes.map(({ id, path, element }) => (
          <Route key={id} path={path} element={element} />
        ))}
      </Routes>
    </>
  );
};

export default MainRoutes;
