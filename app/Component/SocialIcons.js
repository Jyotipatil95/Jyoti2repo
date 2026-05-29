"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { get } from "aws-amplify/api";

export default function SocialIcons() {

//  const [whatsappNumbers, setWhatsappNumbers] = useState([]);

//  useEffect(() => {
//     async function fetchNumbers() {
//       try {
//         // Call your API endpoint configured in Amplify
//         const response = await get({
//           apiName: "LGVApi",          // must match the name in Amplify.configure
//           path: "/whatsapp-numbers",  // your backend route
//         }).response;

//         const data = await response.body.json();
//         setWhatsappNumbers(data);
//       } catch (error) {
//         console.error("Error fetching WhatsApp numbers:", error);
//       }
//     }
//     fetchNumbers();
//   }, []);
  return (
    <div className="d-flex align-items-center justify-content-center gap-3">
  {/* Facebook */}
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <i className="bi bi-facebook fs-3 text-primary"></i>
  </a>

  {/* Instagram */}
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
    <i className="bi bi-instagram fs-3 text-danger"></i>
  </a>

  {/* WhatsApp */}
   <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
   <i className="bi bi-whatsapp fs-3 text-success"></i>
   </a>
    {/* {whatsappNumbers.map((item, index) => (
        <Link
          key={index}
          href={`https://wa.me/${item.number}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success d-flex align-items-center"
        >
          <i className="bi bi-whatsapp me-2"></i>
          {item.label}
        </Link>
      ))} */}
     
</div>
  );
}
