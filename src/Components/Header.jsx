import { useState } from "react";
import { Link } from "react-router";
import { CgProfile } from "react-icons/cg";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../Context/AuthContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const {isLoggedIn, profile,  logOut} = useAuth()


  // console.log("you're profile", profile);
    
  const avatorUrl = ""
    // "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500";

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* left and right */}
        <div className="flex justify-between h-16">
          {/* left */}
          <div className="flex">
            {/* logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-orange-600">
                Blogify
              </Link>
            </div>
            {/* nav */}
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-orange-500 text-base font-medium text-gray-900"
              >
                Home
              </Link>
              <Link
                to="/articles"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-base font-medium text-gray-900"
              >
                Articles
              </Link>
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-base font-medium text-gray-900"
              >
                Write
              </Link>
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-base font-medium text-gray-900"
              >
                Write
              </Link>
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-base font-medium text-gray-900"
              >
                Write
              </Link>
            </nav>
          </div>
          {/* Right */}
          {/* profile */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <div className="text-sm text-gray-700">
                  <span>Hello, {profile?.username}</span>
                </div>
                <div className="relative">
                  <button
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    onMouseEnter={() => setIsDropDownOpen(true)}
                    onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                  >
                    {avatorUrl ? (
                      <img
                        className="w-8 h-8  rounded-full"
                        src={avatorUrl}
                        alt=""
                      />
                    ) : (
                      <CgProfile />
                    )}
                  </button>
                  {/* dropdown Menu */}
                  {isDropDownOpen && (
                    <div
                      className="absolute right-0 bg-white w-48 mt-1 rounded-md z-10 shadow-lg"
                      onMouseLeave={() => setIsDropDownOpen(false)}
                    >
                      <div className="absolute h-3 w-fll top-[12px]"></div>
                      <Link to="/profilePage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Your Profile
                      </Link>
                      <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Manage Articles
                      </Link>
                      <button onClick={()=> logOut()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Signout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent 
                text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 "
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2 border
                text-sm font-medium rounded-md text-orange-600 bg-white border-orange-600
                 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2
                  focus:ring-orange-500 "
                >
                  Sign Up
                </Link>
              </div>
            )}
            {/* hamburger */}
            <div className="mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400"
              >
                {isMenuOpen ? (
                  <CiMenuBurger className="block w-6 h-6" />
                ) : (
                  <IoMdClose className="block w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* menu menu */}
      {isMenuOpen && (
        <div className="sm:hidden py-4">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2  items-center px-1 pt-1 border-l-2 border-orange-500 text-base font-medium text-gray-900 text-orange-700 bg-orange-50"
            >
              Home
            </Link>
            <Link
              to="/articles"
              className=" block pl-3 pr-4 py-2 px-1 pt-1 border-b-2 border-transparent text-base font-medium text-gray-600 focus:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            >
              Articles
            </Link>
          </div>
          {/* Is Logged in */}
           {
        isLoggedIn && (
             <div>
             <Link
                to="/articles"
                className=" block pl-3 pr-4 py-2 px-1 pt-1 border-b-2 border-transparent text-base font-medium text-gray-600 focus:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
                Write
              </Link>
               <Link
                to="/articles"
                className=" block pl-3 pr-4 py-2 px-1 pt-1 border-b-2 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
               My Articles
              </Link>
               <Link
                to="/articles"
                className=" block pl-3 pr-4 py-2 px-1 pt-1 border-b-2 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
                My profile
              </Link>
              <button 
              onClick={logOut}
              className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">
                Sign out
              </button>
          </div> 
        )
    }
    {/* if is not  logged in */}
    {
      !isLoggedIn && (
        <>
        <Link
                to="/articles"
                className=" block pl-3 pr-4 py-2 px-1 pt-1 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
                Sign In
              </Link>
              <Link
                to="/articles"
                className=" block pl-3 pr-4 py-2 px-1 pt-1 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
                Sing Up
              </Link>
        </>
      )
    }
        </div>
      )}
    </header>
  );
};
