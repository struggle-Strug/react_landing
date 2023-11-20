import { NavLink } from 'react-router-dom'
import CompanyLogo from '../../../public/company-logo.png'

export default function Footer() {
  return (
    <div className='text-white bottom-0 z-30 w-full flex flex-col h-auto bg-main items-center py-10 sp:py-9 sp:pb-20'>
      <div><img src={CompanyLogo} alt="Company-Logo" width={130}/></div>
      <p className='text-xs mt-5 mb-3'>
        <NavLink to={"/terms"} className={"mr-5"}>利用規約</NavLink>
        <NavLink to={"https://cuoremo.co.jp/privacy/"} target='__blank'>プライバシーポリシー</NavLink>
      </p>
      <p className='text-xs'>© 2023 CUOREMO inc. all lights reserved.</p>
    </div>
  )
}