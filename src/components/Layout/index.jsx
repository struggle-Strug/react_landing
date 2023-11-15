// import { NavLink } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
// import { useAtom } from 'jotai';
// import { tokenAtom, userAtom } from '../../utils/atom';

// eslint-disable-next-line react/prop-types
const SideNavigationLayout = ({ children }) => {
  // const [, setAccessToken] = useAtom(tokenAtom)
  // const [, setUser] = useAtom(userAtom)
  // // function onClickHandler() {
  // //   setAccessToken('')
  // //   setUser('')
  // // }
  return (
    <div className="w-full font-HiraginoKakuGothicProNW3">
      <div className='hidden sp:block'>
        <Header />
      </div>
      <div className='block sp:hidden'>
        <Sidebar />
      </div>
      <main className="sm:pl-96 md:pl-80 lg:pl-96 w-full sp:pl-0">{children}</main>
      <div className='hidden sp:block mt-32'>
        <Footer />
      </div>
    </div>
  );
};

export default SideNavigationLayout;
