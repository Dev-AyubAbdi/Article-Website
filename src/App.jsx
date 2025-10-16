import "./App.css";
import { Routes, Route } from "react-router";
import { HomePage } from "./Pages/HomePage";
import { ArticlesPage } from "./Pages/ArticlesPage";
import { ArticlePage } from "./Pages/ArticlePage";
import { SignInPage } from "./Pages/SignInPage";
import { SignUpPage } from "./Pages/SignUpPage";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";


function App() {
  return (
    <div>
      {/* header */}
      <Header />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          {/* unauthenticated routes (redirect to home if logged in) */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </main>
      {/* footer */}
      <Footer />
    </div>
  );
}

export default App;
