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
    <div className="w-full">
      <Header/>
      <Sidebar />
      <main className="sm:pl-60 w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default SideNavigationLayout;
