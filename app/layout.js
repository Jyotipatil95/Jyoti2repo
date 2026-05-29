
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import BootstrapClient from "./Component/BootstrapClient";
import Footer from "./Component/Footer";

import "./styles/packages.css";
import "./styles/globals.css";
import "./awsConfig";
export const metadata = { title: 'Lets go for Vacation' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
        
      <body>
        <BootstrapClient/>
       
        {children}
        </body>
      
    </html>
  );
}



