import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import { BasketProvider } from "./context/BaskerContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ChakraProvider>
          <BasketProvider>
            <AppRoutes />
          </BasketProvider>
        </ChakraProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
