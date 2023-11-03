import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {
  UserGroupIcon,
  HomeIcon,
  DocumentMinusIcon,
  UserPlusIcon,
  UsersIcon,
  SquaresPlusIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/20/solid'
import { UseUserDetails } from '../../context/UserContext'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SidebarResponsive(props) {
  const setIsNavOpen = props.setIsNavOpen
  const shownStatus = props.shownStatus
  const user = UseUserDetails()[0]
  const tokenFromStorage = localStorage.getItem("token")
  const token = tokenFromStorage ? JSON.parse(tokenFromStorage) : null
  const subdomain = token.subdomain
  const navigation = [
    { name: 'マイページ', href: `/${subdomain}`, icon: HomeIcon, current: true },
    { name: 'アセスメント結果を確認', href: `/${subdomain}/result`, current: false },
    { name: 'チームの結果を確認', href: `/${subdomain}/team`, current: false },
    { name: 'メンバー登録・編集', href: `/${subdomain}/register/member`, current: false },
    { name: 'チーム登録・編集', href: `/${subdomain}/register/team`, current: false },
    { name: 'ログアウト', href: `/login`, current: false },
    { name: 'マイページ', href: `/${subdomain}`, icon: HomeIcon, current: true },
  ]
  const [menuItems, setMenuItems] = useState(navigation)
  const [menu, setMenu] = useState('マイページ')
  const handleMenuItemClick = (itemName) => {
    setMenu(itemName)
    setIsNavOpen(!shownStatus)
  }

  useEffect(() => {
    if (user.is_staff) {
      setMenuItems(navigation)
    } else {
      setMenuItems(navigation)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.is_staff])

  function logoutUser() {
    localStorage.clear()
  }

  return (
    <>
      <div>
        <div className={shownStatus ? "bg-zinc-100 top-16 fixed z-20 flex w-96 h-screen flex-col absolute left-0" : "hidden"}>
          <div className="flex grow flex-col mt-3 overflow-y-auto border-r px-6">
            <nav className="flex flex-1 flex-col">
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
                  <li key={menuItems[6].name}>
                    <NavLink
                      to={menuItems[6].href}
                      onClick={() => handleMenuItemClick(menuItems[6].name)}
                      className={classNames(
                        menuItems[6].name === menu
                          ? ' text-primary-2 font-bold'
                          : 'text-gray-700',
                        'group flex  gap-x-3 py-1 rounded-md text-sm leading-6'
                      )}
                    >
                      <HomeIcon
                        className={classNames(
                          menuItems[6].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {menuItems[6].name}
                    </NavLink>
                    <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' />
                  </li>
                )}

                {!user.is_superuser && (
                  <li key={menuItems[1].name}>
                    <NavLink
                      to={menuItems[1].href}
                      onClick={() => handleMenuItemClick(menuItems[1].name)}
                      className={classNames(
                        menuItems[1].name === menu
                          ? ' text-primary-2 font-bold'
                          : 'text-gray-700',
                        'group flex  gap-x-3 py-1 rounded-md text-sm leading-6'
                      )}
                    >
                      <DocumentMinusIcon
                        className={classNames(
                          menuItems[1].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {menuItems[1].name}
                    </NavLink>
                    <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' />
                  </li>
                )}
                {(user.is_superuser || user.member_category > 1) && (
                  <li key={menuItems[2].name}>
                    <NavLink
                      to={menuItems[2].href}
                      onClick={() => handleMenuItemClick(menuItems[2].name)}
                      className={classNames(
                        menuItems[2].name === menu
                          ? ' text-primary-2 font-bold'
                          : 'text-gray-700',
                        'group flex  gap-x-3 py-1 rounded-md text-sm leading-6'
                      )}
                    >
                      <UserGroupIcon
                        className={classNames(
                          menuItems[2].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {menuItems[2].name}
                    </NavLink>
                    <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' />
                  </li>
                )}
                {!user.is_superuser && user.member_category === 99 && (
                  <li key={menuItems[3].name}>
                    <NavLink
                      to={menuItems[3].href}
                      onClick={() => handleMenuItemClick(menuItems[3].name)}
                      className={classNames(
                        menuItems[3].name === menu
                          ? ' text-primary-2 font-bold'
                          : 'text-gray-700',
                        'group flex  gap-x-3 py-1 rounded-md text-sm leading-6'
                      )}
                    >
                      <UserPlusIcon
                        className={classNames(
                          menuItems[3].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {menuItems[3].name}
                    </NavLink>
                    <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' />
                  </li>
                )}
                {!user.is_superuser && user.member_category === 99 && (
                  <li key={menuItems[4].name}>
                    <NavLink
                      to={menuItems[4].href}
                      onClick={() => handleMenuItemClick(menuItems[4].name)}
                      className={classNames(
                        menuItems[4].name === menu
                          ? ' text-primary-2 font-bold'
                          : 'text-gray-700',
                        'group flex  gap-x-3 py-1 rounded-md text-sm leading-6'
                      )}
                    >
                      <UsersIcon
                        className={classNames(
                          menuItems[4].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                          'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                      />
                      {menuItems[4].name}
                    </NavLink>
                    <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' />
                  </li>
                )}
                <li key={menuItems[5].name}>
                  <NavLink
                    to={menuItems[5].href}
                    onClick={logoutUser}
                    className='group flex gap-x-3 py-1 text-gray-700 rounded-md text-sm leading-6'
                  >
                    <ArrowRightOnRectangleIcon
                      className='h-6 w-6 shrink-0 group-hover:text-gray-500'
                      aria-hidden="true"
                    />
                    {menuItems[5].name}
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
