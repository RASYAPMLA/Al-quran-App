import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

export function NavbarComp() {
    const location = useLocation();

    return (
        <Navbar fluid rounded className="shadow-sm sticky top-0 z-50">
            <NavbarBrand as={Link} to="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold text-green-700 dark:text-white">Al Quran</span>
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse>
                <NavbarLink as={Link} to="/" active={location.pathname === "/"}>
                    Home (Surat)
                </NavbarLink>
                <NavbarLink as={Link} to="/juz-range/1-10" active={location.pathname === "/juz-range/1-10"}>
                    Juz 1-10
                </NavbarLink>
                <NavbarLink as={Link} to="/juz-range/11-20" active={location.pathname === "/juz-range/11-20"}>
                    Juz 11-20
                </NavbarLink>
                <NavbarLink as={Link} to="/juz-range/21-30" active={location.pathname === "/juz-range/21-30"}>
                    Juz 21-30
                </NavbarLink>
            </NavbarCollapse>
        </Navbar>
    );
}