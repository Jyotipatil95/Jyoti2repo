import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.png" // replace with your logo file
            alt="Let's Go Vacation"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold text-teal-600">Let's Go Vacation</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="/packages">Packages</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* CTA Button */}
        <Link
          href="/book"
          className="hidden md:inline-block bg-teal-500 text-white px-5 py-2 rounded-lg hover:bg-teal-600 transition"
        >
          Book Now
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col space-y-4 p-4 text-gray-700">
            <Link href="/">Home</Link>
            <Link href="/destinations">Destinations</Link>
            <Link href="/packages">Packages</Link>
            <Link href="/contact">Contact</Link>
            <Link
              href="/book"
              className="bg-teal-500 text-white px-4 py-2 rounded-lg text-center"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}