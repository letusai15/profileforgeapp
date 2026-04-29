import fullLogo from "./assets/logo/logo-full.png"
import compactLogo from "./assets/logo/logo-compact.png";
import iconLogo from "./assets/logo/logo-icon.png";

export default function Logo() {
    return (
        <div className="flex items-center">

            {/* Desktop */}
            <img
                src={fullLogo}
                alt="ProfileForge"
                className="hidden lg:block h-16"
            />

            {/* Tablet */}
            <img
                src={fullLogo}
                alt="ProfileForge"
                className="hidden sm:block lg:hidden h-12"
            />

            {/* Mobile */}
            <img
                src={fullLogo}
                alt="ProfileForge"
                className="block sm:hidden h-12"
            />

        </div>
    );
}