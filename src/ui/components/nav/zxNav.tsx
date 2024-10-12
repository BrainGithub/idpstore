// import { Suspense } from "react";
// import { UserMenuContainer } from "./components/UserMenu/UserMenuContainer";
// import { CartNavItem } from "./components/CartNavItem";
// import { NavLinks } from "./components/zxNavLinks";
// import { MobileMenu } from "./components/MobileMenu";
import { SearchBar } from "./components/SearchBar";
import UserButton from "../../components-auth/user-button";

export const Nav = ({ channel }: { channel: string }) => {
	return (
		<nav className="flex w-full gap-4 lg:gap-6" aria-label="Main navigation">
			{/* <ul className="hidden gap-4 overflow-x-auto whitespace-nowrap md:flex lg:gap-8 lg:px-0">
				<NavLinks channel={channel} />
			</ul> */}
			<div className="ml-auto flex items-center justify-center gap-4 whitespace-nowrap lg:gap-8">
				<div className="hidden lg:flex">
					<SearchBar channel={channel} />
				</div>
				{/* <Suspense fallback={<div className="w-8" />}>
					<UserMenuContainer />
				</Suspense> */}
				<UserButton />
			</div>
		</nav>
	);
};
