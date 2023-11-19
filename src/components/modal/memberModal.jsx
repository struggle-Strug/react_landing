/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import InputField from "../inputfield";
import Dropdown, { MultiDropdown } from "../dropdown";
import Button from "../button";
import { userStatusTypes } from "../../config/options";
import { useAtom } from "jotai";
import { formAtom } from "../../utils/atom";
import Loader from "../loader";

// eslint-disable-next-line react/prop-types
export default function MemberModal({
  members,
  open,
  title,
  onClose,
  member,
  teams,
  submitForm,
  loading,
}) {
  const [, setFormData] = useAtom(formAtom);
  const [name, setName] = useState("");
  const [hiraganaName, setHiraganaName] = useState("");
  const [email, setEmail] = useState("");
  const [productivity, setProductivity] = useState("");
  const [category, setCategory] = useState("");
  const [isActive, setIsActive] = useState({ value: true, label: "有効" });
  const [isValidData, setIsValidData] = useState(false);
  const [assessmentExclude, setAssessmentExclude] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState(
    teams.filter((t) => t.value !== 0).map((t) => ({ ...t, checked: false }))
  );

  const [thirdEvaluationOptions, setThirdEvaluationOptions] = useState(
    members.map((mem) => ({ value: mem.id, label: mem.name }))
  );
  const [thirdEvaluation, setThirdEvaluation] = useState(
    members.map((mem) => ({ value: mem.id, label: mem.name }))
  );

  function clickHandler() {
    onClose(false);
  }

  function handleTeamCheckboxes(event) {
    const value = event.target.value;
    setSelectedTeams((prevState) =>
      prevState.map((checkbox) =>
        checkbox.value === parseInt(value)
          ? { ...checkbox, checked: event.target.checked }
          : checkbox
      )
    );
  }

  useEffect(() => {
    // if (selectedTeams === null) { return }
    const newTeams = selectedTeams
      .filter((t) => t.checked === true)
      .map((t) => t.value);

    const formData = {
      name: name,
      name_hiragana: hiraganaName,
      email: email,
      member_category: category,
      is_active: isActive.value,
      team_relation: newTeams,
      assessment_1st_exclude: assessmentExclude,
      productivity_member: productivity,
    };
    setFormData(formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    hiraganaName,
    name,
    email,
    category,
    isActive,
    selectedTeams,
    assessmentExclude,
    productivity,
  ]);

  useEffect(() => {
    let defaultTeams = selectedTeams.map((t) => ({ ...t, checked: false }));
    if (!member) {
      return;
    }
    setName(member.name);
    setHiraganaName(member.name_hiragana);
    setEmail(member.email);
    setCategory(member.member_category);
    setIsActive(
      member.is_active
        ? { value: true, label: "有効" }
        : { value: false, label: "停止中" }
    );
    if (member.team_relation.length > 0) {
      const memberTeams = member.team_relation.map((t) => t.id);
      defaultTeams = selectedTeams.map((t) =>
        memberTeams.includes(t.value)
          ? { ...t, checked: true }
          : { ...t, checked: false }
      );
    }
    setSelectedTeams(defaultTeams);
    setAssessmentExclude(member.assessment_1st_exclude);
    setProductivity(member.productivity_member);
    // setThirdEvaluation(member.given_evaluations.name.map(eva => ({ value: eva, label: eva })))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member]);

  useEffect(() => {
    const newTeams = selectedTeams
      .filter((t) => t.checked === true)
      .map((t) => t.value);
    if (name && hiraganaName && email && category) {
      if (parseInt(category) === 99) {
        setIsValidData(true);
      } else {
        if (newTeams.length > 0) {
          setIsValidData(true);
        } else {
          setIsValidData(false);
        }
      }
    } else {
      setIsValidData(false);
    }
  }, [category, email, hiraganaName, name, selectedTeams]);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={clickHandler}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0 ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="text-center text-lg sm:mt-5 font-HiraginoKakuGothicProNW3">
                      <Dialog.Title
                        as="h1"
                        className="text-3xl font-bold leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-6"></div>
                      <div className="mt-2 sm:max-w-sm mx-auto text-lg">
                        <div className="text-left">
                          名前
                          <span className="ml-2 text-red-600 text-sm">
                            必須
                          </span>
                        </div>
                        <InputField
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mt-2 sm:max-w-sm mx-auto">
                        <div className="text-left">
                          名前（ふりがな）
                          <span className="ml-2 text-sm text-red-600">
                            必須
                          </span>
                        </div>
                        <InputField
                          type="text"
                          value={hiraganaName}
                          onChange={(e) => setHiraganaName(e.target.value)}
                        />
                      </div>
                      <div className="mt-2 sm:max-w-sm mx-auto">
                        <div className="text-left">
                          Email
                          <span className="ml-2 text-sm text-red-600">
                            必須
                          </span>
                        </div>
                        <InputField
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-around">
                        <div className="mt-2">
                          <div className="text-left">
                            生産性スコア
                            <span className="ml-2 text-sm text-red-600">
                              必須
                            </span>
                          </div>
                          <InputField
                            type="number"
                            value={productivity}
                            placeholder="0〜10で入力"
                            min={1}
                            max={10}
                            onChange={(e) => setProductivity(e.target.value)}
                            className="w-36"
                          />
                        </div>
                        <div className="mt-2 mx-5">
                          <div className="text-left">
                            権限
                            <span className="ml-2 text-sm text-red-600">
                              必須
                            </span>
                          </div>
                          <InputField
                            type="number"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-36"
                          />
                        </div>
                        <div className="mt-2">
                          <div className="text-left mb-1.5">
                            ステータス
                            <span className="ml-2 text-sm text-red-600">
                              必須
                            </span>
                          </div>
                          <Dropdown
                            options={userStatusTypes}
                            selectedOption={isActive}
                            setSelectedOption={setIsActive}
                          />
                        </div>
                      </div>
                      <div className="mt-4 sm:max-w-sm mx-auto">
                        <div className="mb-1 text-left">所属チーム</div>
                        {selectedTeams && (
                          <div className="grid grid-cols-2">
                            {selectedTeams.map((t, i) => (
                              <div key={i} className="flex items-center">
                                <input
                                  id={i}
                                  name="categories"
                                  type="checkbox"
                                  value={t.value}
                                  checked={t.checked}
                                  onChange={handleTeamCheckboxes}
                                  className="h-4 w-4 rounded-3 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={t.value}
                                  className="ml-3 text-gray-600"
                                >
                                  {t.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mt-4 sm:max-w-sm mx-auto">
                        <div className="flex items-center">
                          <input
                            id="assessment_1st_exclude"
                            name="categories"
                            type="checkbox"
                            value={assessmentExclude}
                            checked={assessmentExclude}
                            onChange={(e) => {
                              setAssessmentExclude(e.target.checked);
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={"assessment_1st_exclude"}
                            className="ml-3 text-gray-600"
                          >
                            {"自己アセスメントを実施しない"}
                          </label>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-col">
                        <p className="text-sm">
                          このメンバーがアセスメントをする人（第三者評価
                          対象者）
                        </p>
                        <p className="text-xs">
                          プルダウン内の名前を選んで登録／解除してください
                        </p>
                        <div
                          className="mt-3 w-full flex justify-center"
                          style={{
                            height: `${thirdEvaluationOptions.length * 40}px`,
                          }}
                        >
                          <MultiDropdown
                            options={thirdEvaluationOptions}
                            setSelectedOption={setThirdEvaluation}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-center font-HiraginoKakuGothicProNW3">
                    <Button
                      title="この内容で保存する"
                      className="bg-main px-8 py-2 text-lg"
                      disabled={!isValidData}
                      onClick={submitForm}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              {loading && <Loader />}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
