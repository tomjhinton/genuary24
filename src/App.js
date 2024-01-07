import { RouterProvider } from "react-router-dom";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />)


function App() {
  return (
    <main>
      <RouterProvider router={router} />
      
    </main>
  );
}

export default App;