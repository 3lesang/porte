import { Link } from "@tanstack/react-router";

function Footer() {
  return (
    <footer className="bg-gray-50 mt-8">
      <div className="flex gap-2">
        <div className="flex-1" />
        <Link to="/about">
          <p className="text-xs text-gray-500 hover:underline inline-block w-fit">
            About
          </p>
        </Link>
        <Link to="/about">
          <p className="text-xs text-gray-500 hover:underline inline-block w-fit">
            Policy
          </p>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
