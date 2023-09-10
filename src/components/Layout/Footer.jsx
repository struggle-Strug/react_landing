import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='text-white fixed bottom-0 z-30 w-full flex h-auto bg-main sm:justify-evenly items-center py-[20px]'>
      <NavLink to={"/terms"}>利用規約</NavLink>
      <NavLink to={"https://cuoremo.co.jp/privacy/"} target='__blank'>プライバシーポリシー</NavLink>
      <p>株式会社CUOREMO</p>
    </div>
  )
}