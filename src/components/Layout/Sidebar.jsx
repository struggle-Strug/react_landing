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
import Logo from "../../../public/logo.png";
import CompanyLogo from "../../../public/company-logo.png";
import { useRoutes } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const user = UseUserDetails()[0];
  const [jobTitle, setJobTitle] = useState("");
  const tokenFromStorage = localStorage.getItem("token");
  const token = tokenFromStorage ? JSON.parse(tokenFromStorage) : null;
  const subdomain = token.subdomain;
  // const router = useRoutes();
  // const exam = router.exam;
  // console.log(exam);
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
  };

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
      <div className="bg-main fixed z-20 flex md:w-80 lg:w-[450px] h-screen flex-col overflow-y-auto">
        <div className="flex grow flex-col my-3 px-10">
          <nav className="flex flex-1 flex-col">
            <div className="mx-auto mt-[80px]">
              <img src={Logo} alt="Logo" width={240} />
            </div>
            <p className="text-center text-white mt-8 text-xl font-bold font-CenturyGothic">
              Heart Beat FINDER
            </p>
            <p className="text-white mt-8 text-xs text-center font-HiraginoKakuGothicProNW3">
              株式会社CUOREMO
            </p>
            <div className="lg:flex block justify-around items-center mt-3 ">
              <div>
                <span className="text-white lg:text-3xl text-2xl font-NotoSansCJKjp-Regular">
                  {user.name}
                </span>
                <span className="text-white font-NotoSansCJKjp-Regular">
                  さん
                </span>
              </div>
              <p className=" w-max mx-auto text-white lg:text-sm text-xs py-1 px-2 border font-NotoSansCJKjp-Regular">
                {jobTitle}
              </p>
            </div>
            <ul role="list" className="-mx-primary-2 space-y-3 mt-7">
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
                <li key={menuItems[6].name}>
                  <NavLink
                    to={menuItems[6].href}
                    onClick={() => handleMenuItemClick(menuItems[6].name)}
                    className={classNames(
                      menuItems[6].name === menu
                        ? " bg-[#01015F] font-bold"
                        : "text-white",
                      "group flex justify-center gap-x-3 py-4 text-xs lg:text-sm leading-6 border text-white relative font-HiraginoKakuGothicProNW3"
                    )}
                  >
                    {menuItems[6].name === menu && (
                      <div className="absolute lg:right-5 right-2 top-1/2 -translate-y-1/2">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[15px] border-l-white"></div>
                      </div>
                    )}
                    {/* <HomeIcon
                        className={classNames(
                          menuItems[6].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      /> */}
                    {menuItems[6].name}
                  </NavLink>
                  {/* <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' /> */}
                </li>
              )}

              {!user.is_superuser && (
                <li key={menuItems[1].name}>
                  <NavLink
                    to={menuItems[1].href}
                    onClick={() => handleMenuItemClick(menuItems[1].name)}
                    className={classNames(
                      menuItems[1].name === menu
                        ? " bg-[#01015F] font-bold"
                        : "text-white",
                      "group flex justify-center gap-x-3 py-4 text-xs lg:text-sm leading-6 border text-white relative font-HiraginoKakuGothicProNW3"
                    )}
                  >
                    {menuItems[1].name === menu && (
                      <div className="absolute lg:right-5 right-2 top-1/2 -translate-y-1/2">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[15px] border-l-white"></div>
                      </div>
                    )}
                    {/* <DocumentMinusIcon
                        className={classNames(
                          menuItems[1].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      /> */}
                    {menuItems[1].name}
                  </NavLink>
                  {/* <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' /> */}
                </li>
              )}
              {(user.is_superuser || user.member_category > 1) && (
                <li key={menuItems[2].name}>
                  <NavLink
                    to={menuItems[2].href}
                    onClick={() => handleMenuItemClick(menuItems[2].name)}
                    className={classNames(
                      menuItems[2].name === menu
                        ? " bg-[#01015F] font-bold"
                        : "text-white",
                      "group flex justify-center gap-x-3 py-4 text-xs lg:text-sm leading-6 border text-white relative font-HiraginoKakuGothicProNW3"
                    )}
                  >
                    {menuItems[2].name === menu && (
                      <div className="absolute lg:right-5 right-2 top-1/2 -translate-y-1/2">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[15px] border-l-white"></div>
                      </div>
                    )}
                    {/* <UserGroupIcon
                        className={classNames(
                          menuItems[2].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      /> */}
                    {menuItems[2].name}
                  </NavLink>
                  {/* <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' /> */}
                </li>
              )}
              {!user.is_superuser && user.member_category === 99 && (
                <li key={menuItems[3].name}>
                  <NavLink
                    to={menuItems[3].href}
                    onClick={() => handleMenuItemClick(menuItems[3].name)}
                    className={classNames(
                      menuItems[3].name === menu
                        ? " bg-[#01015F] font-bold"
                        : "text-white",
                      "group flex justify-center gap-x-3 py-4 text-xs lg:text-sm leading-6 border text-white relative font-HiraginoKakuGothicProNW3"
                    )}
                  >
                    {menuItems[3].name === menu && (
                      <div className="absolute lg:right-5 right-2 top-1/2 -translate-y-1/2">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[15px] border-l-white"></div>
                      </div>
                    )}
                    {/* <UserPlusIcon
                        className={classNames(
                          menuItems[3].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      /> */}
                    {menuItems[3].name}
                  </NavLink>
                  {/* <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' /> */}
                </li>
              )}
              {!user.is_superuser && user.member_category === 99 && (
                <li key={menuItems[4].name}>
                  <NavLink
                    to={menuItems[4].href}
                    onClick={() => handleMenuItemClick(menuItems[4].name)}
                    className={classNames(
                      menuItems[4].name === menu
                        ? " bg-[#01015F] font-bold"
                        : "text-white",
                      "group flex justify-center gap-x-3 py-4 text-xs lg:text-sm leading-6 border text-white relative font-HiraginoKakuGothicProNW3"
                    )}
                  >
                    {menuItems[4].name === menu && (
                      <div className="absolute lg:right-5 right-2 top-1/2 -translate-y-1/2">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[15px] border-l-white"></div>
                      </div>
                    )}
                    {/* <UsersIcon
                        className={classNames(
                          menuItems[4].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      /> */}
                    {menuItems[4].name}
                  </NavLink>
                  {/* <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' /> */}
                </li>
              )}
              <li key={menuItems[5].name}>
                <NavLink
                  to={menuItems[5].href}
                  onClick={logoutUser}
                  className="w-[140px] flex justify-center py-2 mt-6 text-sm lg:text-base text-white border-2 rounded-full m-auto font-bold font-CenturyGothic"
                >
                  {/* <ArrowRightOnRectangleIcon
                      className='h-6 w-6 shrink-0 group-hover:text-gray-500'
                      aria-hidden="true"
                    /> */}
                  {menuItems[5].name}
                </NavLink>
              </li>
            </ul>
            <div>
              <div className="flex justify-center mt-16">
                <img src={CompanyLogo} width={131} alt="company-logo" />
              </div>
            </div>
            <div className="mt-7 mx-auto mb-3">
              <NavLink
                to={"/terms"}
                className="text-[10px] text-white mr-6 font-NotoSansCJKjp-Regular"
              >
                利用規約
              </NavLink>
              <NavLink
                to={"https://cuoremo.co.jp/privacy/"}
                target="__blank"
                className="text-[10px] text-white font-NotoSansCJKjp-Regular"
              >
                プライバシーポリシー
              </NavLink>
            </div>
            <p className="flex justify-center text-[10px] text-white font-NotoSansCJKjp-Regular">
              © 2023 CUOREMO inc. all lights reserved.
            </p>
          </nav>
        </div>
      </div>
    </>
  );
}
