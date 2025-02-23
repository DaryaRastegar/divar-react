import { BrowserRouter } from "react-router-dom";

import Routers from "./routers/Routers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import defaultOptions from "./configs/queryConfig.js";
import toast, { Toaster } from 'react-hot-toast';
import Layouts from "./layouts/Layouts";

function App() {
  const queryClient = new QueryClient({ defaultOptions });
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layouts>
          <Routers />
          <Toaster />
        </Layouts>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
