import { Link } from "react-router";
export const Footer = () => {
  return (
    <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          {/* nav Links */}
          <nav className="-mx-5 -m7-2 flex flex-wrap justify-center">
            <div className="px-5 py-2">
              <Link to="/" className="text-base text-gray-500 hover:text-gray-900">Home</Link>
               
            </div>
            <div className="px-5 py-2">
              <Link to="/articles" className="text-base text-gray-500 hover:text-gray-900">Articles</Link>
               
            </div>
            <div className="px-5 py-2">
              <Link to="/articles" className="text-base text-gray-500 hover:text-gray-900">Articles</Link>
               
            </div>
            <div className="px-5 py-2">
             <Link to="/tags" className="text-base text-gray-500 hover:text-gray-900">Tags</Link>
               
            </div>
             <div className="px-5 py-2">
               <Link to="/aboutus" className="text-base text-gray-500 hover:text-gray-900">About Us</Link>
               
            </div>
             <div className="px-5 py-2">
               <Link to="/contect" className="text-base text-gray-500 hover:text-gray-900">Contect</Link>
               
            </div>
           
               
               
                 
          </nav>
          {/* social media links */}
        </div>
    </div>
  )
};
