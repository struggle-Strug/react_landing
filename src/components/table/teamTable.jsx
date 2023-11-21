/* eslint-disable react/prop-types */
// import { CompanyListResponse } from '../../utils/type'
import { useAtom } from "jotai";
import { useNavigate } from "react-router";
import { formAtom, subscriptionAtom } from "../../utils/atom";
import PopupMessageModal from "../modal/popupMessageModal";
import { BACKEND_URL, COMPANY_ENDPOINT, MEMBER_ENDPOINT } from "../../utils/constants";
import { requestWithTokenRefresh } from "../../utils/AuthService";
import { useState, useEffect, useCallback } from "react";
// eslint-disable-next-line react/prop-types
export default function TeamTable({ teams, setShowModal, setTeamToEdit }) {
  const navigate = useNavigate()
  const [, setFormData] = useAtom(formAtom);
  const [subscriptionGlobal] = useAtom(subscriptionAtom);
  const [showPopupMessage, setShowPopupMessage] = useState(false);
  const [productivity, setProductivity] = useState();

  
  const fetchMembers = useCallback(async () => {
    const resp = await requestWithTokenRefresh(
      MEMBER_ENDPOINT + "list/",
      {},
      navigate
      );
      const data = await resp.json();
      setProductivity(await data.company.productivity_company)
    }, [navigate]);
    
    useEffect(() => {
      fetchMembers();
    }, [fetchMembers]);
    
    const companyId = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token")).company_relation
    : undefined;

  function handleCreateButtonClick() {
    if (!subscriptionGlobal) {
      setTeamToEdit();
      setFormData(null);
      setShowModal(true);
    } else setShowPopupMessage(true);
  }

  function handleEditButtonClick(team) {
    if (!subscriptionGlobal) {
      setTeamToEdit(team);
      setShowModal(true);
    } else setShowPopupMessage(true);
  }

  async function handleChangeProductivity(productivity) {
    if (productivity > 0 && productivity < 11) {
      await requestWithTokenRefresh(
        `${COMPANY_ENDPOINT}${companyId}/`,
        {
          method: "PATCH",
          body: JSON.stringify({ productivity_company: productivity }),
          headers: {
            "Content-Type": "application/json",
          },
        },
        navigate
      );
      setProductivity(productivity);
    }
  }

  const handleProductivityChange = async (e, id) => {
    if (e.target.value > 0 && e.target.value < 11) {
      const url = BACKEND_URL + 'api/team/update/' + id;
      const method = 'PATCH'
      const body = { productivity_team: parseInt(e.target.value) }
      await requestWithTokenRefresh(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }, navigate)
    }
  };

  return (
    <div>
      <div className="mx-auto sm:px-0 lg:px-8">
        <div className="w-full sm:flex sm:items-center">
          <div className="xl:w-[25%] lg:w-[15%] md:w-[10%]"></div>
          <div className="w-[50%] flex justify-center sm:flex-1 2xl:mr-14">
            <h1 className="lg:text-4xl md:text-2xl sp:text-xl font-bold text-gray-900 font-HiraginoKakuGothicProNW6">
              チーム登録・編集
            </h1>
          </div>
          <div className="w-[176px] mt-4 2xl:ml-16 sm:mt-0 sm:flex-none sp:w-full sp:w-fit sp:mx-auto">
            <button
              type="button"
              // className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-300"
              className="px-3 py-2 flex justify-center items-center bg-btn text-white lg:text-sm md:text-xs sp:text-xs sp:py-1 rounded-full disabled:bg-slate-300 hover:bg-primary-1 transition-colors border-4 border-white shadow-lg"
              onClick={handleCreateButtonClick}
            >
              新規チーム登録
            </button>
            {showPopupMessage && (
              <PopupMessageModal
                open={showPopupMessage}
                msg={"アセスメント開始後は各種作成及び編集は不可となります。"}
                status={"failed"}
                setShowPopupMessage={setShowPopupMessage}
              />
            )}
          </div>
        </div>
      </div>
      <div className="mt-14 flow-root overflow-hidden">
        <div className="w-full lg:w-11/12 mx-auto">
          <div className="h-14 bg-main text-white flex justify-between items-center mx-auto mb-4 xl:pl-20 lg:pr-7 md:px-4">
            <p className="text-xs">会社名</p>
            <p className="xl:text-2xl lg:text-lg md:text-sm font-HiraginoKakuGothicProNW6">株式会社CUOREMO</p>
            <div className="flex justify-center items-center gap-x-1 lg:gap-x-3">
              <p className="text-xs">会社の生産性スコア</p>
              <input className="w-10 lg:w-20 border border-black bg-white flex text-center placeholder:text-xs px-0 py-1 text-black font-HiraginoKakuGothicProNW6 lg:text-xl text-base" type="number"
                min={1}
                max={10}
                placeholder="会社の生産性"
                value={productivity}
                disabled={subscriptionGlobal}
                onChange={(e) => handleChangeProductivity(e.target.value)} />
            </div>
          </div>
          <div className="overflow-y-visible	">
            <table className="w-full text-center whitespace-nowrap">
              <thead className="sticky top-0 bg-main shadow z-10 text-white">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 w-2/12 text-xs font-semibold"
                  >
                    ID
                    {/* <div className="absolute inset-y-0 right-full z-0 w-screen border-b border-b-gray-200" /> */}
                    {/* <div className="absolute inset-y-0 left-0 z-0 w-screen border-b border-b-gray-200" /> */}
                  </th>
                  <th
                    scope="col"
                    className="hidden py-3.5 w-5/12 text-xs border-l border-[#A0A0A0] font-semibold sm:table-cell"
                  >
                    チーム名
                  </th>
                  <th
                    scope="col"
                    className="w-1/6 border-r border-[#A0A0A0] relative py-3.5"
                  >
                    <span></span>
                  </th>
                  <th
                    scope="col"
                    className="hidden py-3.5 text-xs font-semibold sm:table-cell"
                  >
                    チームの生産性スコア
                  </th>
                </tr>
              </thead>
            </table>
            <div className="h-auto max-h-[600px] overflow-y-auto overflow-x-hidden border border-[#A0A0A0]">
              <table className="text-center w-full">
                <tbody>
                  {teams &&
                    teams.map((team, index) => (
                      <tr key={index} className="odd:bg-[#F5F5F5]">
                        <td className="relative py-4 w-2/12 text-xs lg:text-base font-medium text-gray-900">
                          {team.id}
                          {/* <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" /> */}
                          {/* <div className="absolute bottom-0 left-0 h-px w-screen bg-main" /> */}
                        </td>
                        <td className="py-4 w-5/12 text-sm lg:text-base text-gray-500 sm:table-cell border-l border-[#A0A0A0]">
                          {team.team_name}
                        </td>
                        <td className="w-1/6 relative py-4 text-center text-sm lg:text-base font-medium border-r border-[#A0A0A0]">
                          <button
                            className="w-[40px] h-[20px] mx-auto flex justify-center items-center bg-[#0303FF] text-white text-[10px] rounded-md hover:text-indigo-900"
                            onClick={() => handleEditButtonClick(team)}
                          >
                            編集
                          </button>
                        </td>
                        <td className="w-[121px] lg:w-full py-4 text-sm mx-auto lg:text-base text-gray-500 flex items-center justify-center sm:gap-1">
                          <input
                            type="number"
                            defaultValue={team.productivity_team}
                            onChange={(e) => handleProductivityChange(e, team.id)}
                            className="w-16 border border-black bg-white flex text-center placeholder:text-xs px-0 py-1 text-black text-base font-HiraginoKakuGothicProNW6"
                            max={10}
                            min={1}
                            disabled={subscriptionGlobal}
                            placeholder="数値を入力"
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
