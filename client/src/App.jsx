import { RouterProvider } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import router from "./routes/routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { Toaster } from "react-hot-toast";

import "../node_modules/react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import queryClient from "./queryClient";

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ style: { padding: "2rem 4rem" } }}
        />

        <GlobalStyles />

        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
