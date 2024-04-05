import { router } from "@/routes/Router";
import ThemeProvider from "@/theme/Theme";
import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import i18n from "@/locale/locale";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import appConfig from "@/configs/app.config";

function App() {
  const clientId = appConfig.googleClientId || "client-id";

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <I18nextProvider i18n={i18n}>
            <GoogleOAuthProvider clientId={clientId}>
              <RouterProvider router={router} />
              <ToastContainer />
            </GoogleOAuthProvider>
          </I18nextProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
