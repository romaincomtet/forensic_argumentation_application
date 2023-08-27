import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../Provider/AuthProvider";

interface INavbarProps {
  pageName: string;
}

const Navbar = ({ pageName }: INavbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { logout, user } = useAuth();

  return (
    <div className="flex w-full items-center justify-between bg-white p-4 shadow-md">
      <div className="flex items-center">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="transform cursor-pointer text-grey-dark transition-transform duration-150 hover:text-blue-default"
          onClick={() => router.back()}
          onMouseDown={(e) =>
            (e.target as HTMLElement).classList.add("scale-95")
          }
          onMouseUp={(e) =>
            (e.target as HTMLElement).classList.remove("scale-95")
          }
          onMouseLeave={(e) =>
            (e.target as HTMLElement).classList.remove("scale-95")
          }
        />
        <h1
          className="ml-4 cursor-pointer text-xl font-bold text-blue-default"
          onClick={() => router.push("/protect")}
        >
          Forensic Argumentation
        </h1>
      </div>
      <h1 className="text-3xl font-semibold text-grey-dark">{pageName}</h1>
      <div className="flex items-center space-x-4">
        <Link href="/protect/profile" className="font-medium text-grey-dark">
          {user?.name}
        </Link>
        <div className="relative">
          <FontAwesomeIcon
            icon={faUser}
            className="cursor-pointer text-grey-dark transition-colors duration-200 hover:text-blue-default"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            role="button"
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md border border-grey-light bg-white py-2 shadow-lg">
              <Link
                href="/protect/profile"
                className="block px-4 py-2 transition-colors duration-200 hover:bg-grey-lightest hover:text-blue-default"
              >
                Profile
              </Link>
              <a
                className="block cursor-pointer px-4 py-2 transition-colors duration-200 hover:bg-grey-lightest hover:text-blue-default"
                onClick={logout}
                role="button"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
