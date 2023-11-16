import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentMinusIcon,
  UserPlusIcon,
  UsersIcon,
  SquaresPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { UseUserDetails } from "../../context/UserContext";
import Logo from "/public/logo.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarResponsive(props) {
  const setIsNavOpen = props.setIsNavOpen;
  const shownStatus = props.shownStatus;
  const user = UseUserDetails()[0];
  const tokenFromStorage = localStorage.getItem("token");
  const token = tokenFromStorage ? JSON.parse(tokenFromStorage) : null;
  const subdomain = token.subdomain;
  const navigation = [
    {
      name: "アセスメントを実施する",
      href: `/${subdomain}`,
      icon: HomeIcon,
      current: true,
    },
    {
      name: "自分のアセスメント結果を確認",
      href: `/${subdomain}/result`,
      current: false,
    },
    {
      name: "チームのアセスメント結果を確認",
      href: `/${subdomain}/team`,
      current: false,
    },
    {
      name: "チーム登録・編集",
      href: `/${subdomain}/register/team`,
      current: false,
    },
    {
      name: "メンバー登録・編集",
      href: `/${subdomain}/register/member`,
      current: false,
    },
    { name: "Logout", href: `/login`, current: false },
    {
      name: "アセスメントを実施する",
      href: `/${subdomain}`,
      icon: HomeIcon,
      current: true,
    },
  ];
  const [menuItems, setMenuItems] = useState(navigation);
  const [menu, setMenu] = useState("アセスメントを実施する");
  const handleMenuItemClick = (itemName) => {
    setMenu(itemName);
    setIsNavOpen(!shownStatus);
  };
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }
    if (user.is_superuser) {
      setJobTitle("Cuoremo管理者");
    } else if (user.member_category === 99) {
      setJobTitle("管理者");
    } else if (user.member_category > 1) {
      setJobTitle("マネージャー");
    } else {
      setJobTitle("一般社員");
    }
  }, [user]);

  useEffect(() => {
    if (user.is_staff) {
      setMenuItems(navigation);
    } else {
      setMenuItems(navigation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.is_staff]);

  function logoutUser() {
    localStorage.clear();
  }

  return (
    <>
      <div>
        <div
          className={
            shownStatus
              ? "bg-main top-0 fixed z-20 flex w-full justify-center items-center h-screen flex-col absolute left-0 text-white sm:pt-20 pt-14"
              : "hidden"
          }
        >
          <div
            className="absolute top-8 right-6"
            onClick={() => setIsNavOpen(false)}
          >
            <svg
              className="h-10 w-10 text-white"
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="34" y1="6" x2="6" y2="34" />
              <line x1="6" y1="6" x2="34" y2="34" />
            </svg>
          </div>
          <div className="w-5/12 mb-2">
            <img src={Logo} alt="Logo" />
          </div>
          <p className="mb-10 text-lg font-bold font-CenturyGothic">
            Heart Beat FINDER
          </p>
          <p className="text-xs font-HiraginoKakuGothicProNW3">
            株式会社CUOREMO
          </p>
          <div className="flex justify-around items-center mt-3">
            <div>
              <span className="text-white text-2xl font-NotoSansCJKjp-Regular">
                {user.name}
              </span>
              <span className="text-white font-NotoSansCJKjp-Regular">
                さん
              </span>
            </div>
            <p className="text-white py-1 px-2 text-xs border font-NotoSansCJKjp-Regular ml-6">
              {jobTitle}
            </p>
          </div>
          <div className="w-full flex grow justify-center mx-auto mt-5 overflow-y-auto px-6">
            <nav className="flex flex-1 flex-col max-w-[309px]">
              <ul role="list" className="-mx-primary-2 space-y-3">
                {/* {!user.is_superuser && (
                  <li key={menuItems[0].name}>
                    <NavLink
                      to={menuItems[0].href}
                      onClick={() => handleMenuItemClick(menuItems[0].name)}
                      className={classNames(
                        menuItems[0].name === menu
                          ? ' text-primary-2 font-bold'
                          : 'text-gray-700',
                        'group flex  gap-x-3 py-1 rounded-md text-sm leading-6'
                      )}
                    >
                      <HomeIcon
                        className={classNames(
                          menuItems[0].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {menuItems[0].name}
                    </NavLink>
                    <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' />
                  </li>
                )} */}

                {!user.is_superuser && (
                  <li key={menuItems[6].name} className="relative">
                    <NavLink
                      to={menuItems[6].href}
                      onClick={() => handleMenuItemClick(menuItems[6].name)}
                      className={classNames(
                        menuItems[6].name === menu ? "bg-[#01015F]" : "",
                        "group flex justify-center items-center gap-x-3 text-sm leading-6 h-12 border border-white font-HiraginoKakuGothicProNW3"
                      )}
                    >
                      {/* <HomeIcon
                        className={classNames(
                          menuItems[6].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      /> */}
                      {menuItems[6].name}
                    </NavLink>
                    {menuItems[6].name === menu && (
                      <div className="absolute lg:right-5 right-4 top-1/2 -translate-y-1/2">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[15px] border-l-white"></div>
                      </div>
                    )}
                    {/* <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' /> */}
                  </li>
                )}

                {!user.is_superuser && (
                  <li key={menuItems[1].name} className="relative">
                    <NavLink
                      to={menuItems[1].href}
                      onClick={() => handleMenuItemClick(menuItems[1].name)}
                      className={classNames(
                        menuItems[1].name === menu ? "bg-[#01015F]" : "",
                        "group flex justify-center items-center gap-x-3 border border-white h-12 text-sm leading-6 font-HiraginoKakuGothicProNW3"
                      )}
                    >
                      {/* <DocumentMinusIcon
                        className={classNames(
                          menuItems[1].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      /> */}
                      {menuItems[1].name}
                    </NavLink>
                    {menuItems[1].name === menu && (
                      <div className="absolute lg:right-5 right-4 top-1/2 -translate-y-1/2">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[15px] border-l-white"></div>
                      </div>
                    )}
                    {/* <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' /> */}
                  </li>
                )}
                {(user.is_superuser || user.member_category > 1) && (
                  <li key={menuItems[2].name} className="relative">
                    <NavLink
                      to={menuItems[2].href}
                      onClick={() => handleMenuItemClick(menuItems[2].name)}
                      className={classNames(
                        menuItems[2].name === menu ? "bg-[#01015F]" : "",
                        "group flex justify-center items-center gap-x-3 border border-white h-12 text-sm leading-6 font-HiraginoKakuGothicProNW3"
                      )}
                    >
                      {/* <UserGroupIcon
                        className={classNames(
                          menuItems[2].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      /> */}
                      {menuItems[2].name}
                    </NavLink>
                    {menuItems[2].name === menu && (
                      <div className="absolute lg:right-5 right-4 top-1/2 -translate-y-1/2">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[15px] border-l-white"></div>
                      </div>
                    )}
                    {/* <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' /> */}
                  </li>
                )}
                {!user.is_superuser && user.member_category === 99 && (
                  <li key={menuItems[3].name} className="relative">
                    <NavLink
                      to={menuItems[3].href}
                      onClick={() => handleMenuItemClick(menuItems[3].name)}
                      className={classNames(
                        menuItems[3].name === menu ? "bg-[#01015F]" : "",
                        "group flex justify-center items-center gap-x-3 border border-white h-12 text-sm leading-6 font-HiraginoKakuGothicProNW3"
                      )}
                    >
                      {/* <UserPlusIcon
                        className={classNames(
                          menuItems[3].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      /> */}
                      {menuItems[3].name}
                    </NavLink>
                    {menuItems[3].name === menu && (
                      <div className="absolute lg:right-5 right-4 top-1/2 -translate-y-1/2">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[15px] border-l-white"></div>
                      </div>
                    )}
                    {/* <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' /> */}
                  </li>
                )}
                {!user.is_superuser && user.member_category === 99 && (
                  <li key={menuItems[4].name} className="relative">
                    <NavLink
                      to={menuItems[4].href}
                      onClick={() => handleMenuItemClick(menuItems[4].name)}
                      className={classNames(
                        menuItems[4].name === menu ? "bg-[#01015F]" : "",
                        "group flex justify-center items-center gap-x-3 h-12 border border-white text-sm leading-6 font-HiraginoKakuGothicProNW3"
                      )}
                    >
                      {/* <UsersIcon
                        className={classNames(
                          menuItems[4].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      /> */}
                      {menuItems[4].name}
                    </NavLink>
                    {menuItems[4].name === menu && (
                      <div className="absolute lg:right-5 right-4 top-1/2 -translate-y-1/2">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[15px] border-l-white"></div>
                      </div>
                    )}
                    {/* <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' /> */}
                  </li>
                )}
                <li key={menuItems[5].name}>
                  <NavLink
                    to={menuItems[5].href}
                    onClick={logoutUser}
                    className="w-36 h-9 mx-auto mt-9 group flex justify-center items-center gap-x-3 font-bold text-base leading-6 border-2 border-white rounded-full shadow-md shadow-black font-CenturyGothic"
                  >
                    {/* <ArrowRightOnRectangleIcon
                      className='h-6 w-6 shrink-0 group-hover:text-gray-500'
                      aria-hidden="true"
                    /> */}
                    {menuItems[5].name}
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
