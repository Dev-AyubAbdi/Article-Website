import "./App.css";
import { Routes, Route } from "react-router";
import { HomePage } from "./Pages/HomePage";
import { ArticlesPage } from "./Pages/ArticlesPage";
import { ArticlePage } from "./Pages/ArticlePage";
import { SignInPage } from "./Pages/SignInPage";
import { SignUpPage } from "./Pages/SignUpPage";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { AuthProvider } from "./Context/AuthContext";
import UnAuthenticatedRoute from "./Components/UnAuthenticatedRoute";
import {ArticleEditorPage}   from "./Pages/ArticleEditorPage";
import {ManageArticlePage}  from "./Pages/ManageArticlePage";
import {ProfilePage}  from "./Pages/ProfilePage";
import ProtectedRoute from "./Components/ProtectedRoute"


function App() {
  return (
    <AuthProvider> 
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
            <Route
              path="/signin"
              element={
                <UnAuthenticatedRoute>
                  <SignInPage />
                </UnAuthenticatedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <UnAuthenticatedRoute>
                  <SignUpPage />
                </UnAuthenticatedRoute>
              }
            />

            {/* Protected Routes */}

            <Route path="/editor" element={
              <ProtectedRoute>
                <ArticleEditorPage/>
              </ProtectedRoute>
              
              } /> 
            <Route path="editor/:id" element={ 
              <ProtectedRoute>
                  <ArticleEditorPage/>
              </ProtectedRoute>
            
              } /> 
            <Route path="/manageArticle" element={
              <ProtectedRoute>
                 <ManageArticlePage/>
              </ProtectedRoute>
             
              } /> 
            <Route path="/ProfilePage" element={
              <ProtectedRoute>
                 <ProfilePage/>
              </ProtectedRoute>
             
              } /> 
          </Routes>
        </main>
        {/* footer */}
        <Footer />
      </div>
   </AuthProvider>
  );
}

export default App;
