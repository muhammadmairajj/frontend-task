import { BrowserRouter as Router } from "react-router-dom";

import { Header } from "./layouts/Header";

import AppRouter from "./router";


function App() {
 
  return (
    <Router>
      <Header />
      <main className="pt-18">
        <AppRouter />
      </main>
    </Router>
  );
}

export default App;
