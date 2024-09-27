import { useState } from "react";

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(true);

    const menulist = [
        { src: "/sidebarIcon/user.svg", label: "マイアカウント" },
        { src: "/sidebarIcon/note.svg", label: "アセスメントを実施" },
        { src: "/sidebarIcon/chart.svg", label: "アセスメント結果を確認" },
        { src: "/sidebarIcon/sns.svg", label: "メンバー登録・編集" },
    ];


    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="h-screen flex items-center bg-cover bg-center bg-no-repeat">
            <div className={` bg-[#FCFCFE] custom-box-shadow transition-all duration-900 ${isOpen ? 'w-[330px] py-10 px-5' : 'w-[80px] py-10'} h-full backdrop-blur-lg flex flex-col`}>
                <div className="flex w-full">
                    <div onClick={toggle} className="flex items-center justify-center w-full h-20 transition-none">
                        {isOpen && (
                            <h1 className=" px-5 font-black text-2xl text-[#333333] sm:text-3xl md:text-[42px] ">Heart Beat
                                FINDER</h1>
                        )}
                        <img src="/sidebarIcon/mob_btn.svg" alt="" className={` ${isOpen ? 'hidden' : 'block'}`} />
                    </div>
                </div>

                <div className={`mt-8 flex flex-col space-y-2`}>
                    <div className="space-y-2">
                        {menulist.map(menu => (
                            <div key={menu.label} className={`flex items-center  ${isOpen ? 'pl-5 pr-2' : 'justify-center px-2'} space-x-4 py-4 rounded-lg  hover:bg-white hover:shadow-lg cursor-pointer transition`}>
                                <img className=" w-9 h-9" src={menu.src} alt={menu.label} />
                                <p className={`text-lg font-sans ${isOpen ? 'block' : 'hidden'}`}>{menu.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`p-3 h-[20%] ${isOpen ? "" : " flex items-center justify-center"}`}>
                    <div className={`flex flex-col items-center rounded-lg  ${isOpen ? 'py-3 gap-3' : ''} cursor-pointer transition`}>
                        {isOpen && (
                            <div className="flex flex-col">
                                <button
                                    className="bg-[#3E3E3E] hover:bg-[#3e3e3eb0] text-white text-xl font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline w-full h-11 flex justify-center items-center mb-28"
                                    type="submit"
                                >
                                    Logout
                                </button>
                                <div className=" mb-4">
                                    <img src="/logo1.png" alt="Cuoremo Logo" className="mx-auto h-[35px] w-auto" />
                                </div>
                                <div className=" flex justify-center items-center gap-5 mb-3">
                                    <a href="/" className="text-sm font-sans">利用規約</a>
                                    <a href="/" className="text-sm font-sans">プライバシーポリシー</a>
                                </div>
                                <span className="text-[12px]">© 2023 CUOREMO inc. all lights reserved.</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;