import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='text-white fixed bottom-0 z-30 w-full flex flex-col	sm:flex-row h-auto bg-main sm:justify-between first-letter:items-center py-[20px] sm:px-[40px]'>
      <p className='text-xs mb-5 sm:mb-0'>
        <NavLink to={"/terms"} className={"mr-5"}>利用規約</NavLink>
        <NavLink to={"https://cuoremo.co.jp/privacy/"} target='__blank'>プライバシーポリシー</NavLink>
      </p>
      <p>株式会社CUOREMO</p>
      <p className='text-xs mb-5 sm:mb-0 hidden sm:invisible sm:block'>
        <NavLink to={"/terms"} className={"mr-5"}>利用規約</NavLink>
        <NavLink to={"https://cuoremo.co.jp/privacy/"} target='__blank'>プライバシーポリシー</NavLink>
      </p>
    </div>
  )
}