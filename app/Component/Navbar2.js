"use client";
import { useRouter } from "next/navigation";

export default function Navbar2() {
  const router = useRouter();
  return (
    <nav className="navbar navbar-light bg-light px-4">
      
      <button
        className="btn btn-primary"
        onClick={() => router.push("/register")}
      >
        Register
      </button>
    </nav>
  );
}