/* eslint-disable react/prop-types */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

// eslint-disable-next-line react/prop-types
export default function AgreeCheckModal({ open, setOpenAgreeModal, confirmHandler }) {
  const [clickableButton, setClickableButton] = useState(false)
  function clickHandler() {
    setOpenAgreeModal(true)
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={clickHandler}>
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

        <div className="fixed inset-0 z-30 overflow-y-auto">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                <div>
                  <div className="mt-3 sm:mt-5">
                    <Dialog.Title as="h1" className="text-base font-semibold leading-4 text-gray-900 text-bold text-center">
                      「Heart Beat FINDER」利用規約
                    </Dialog.Title>
                    <div className="mt-5 overflow-y-auto h-[70vh]">
                      <p className="text-sm text-gray-500">
                        本利用規約（以下「<b>本規約</b>」といいます。）は、株式会社CUOREMO（以下「<b>当社</b>」といいます。）が「<b>Heart Beat FINDER</b>」の名称で提供するサービス及びその関連サービス（以下「<b>本サービス</b>」といいます。）の提供条件及びユーザー様と当社との間の権利義務関係を定めるものです。本サービスの利用に際しては、本規約の全文をお読みいただいたうえで、本規約に同意いただく必要があります。
                      </p>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5">
                        第1条（適用）
                      </h2>
                      <ol className="mt-3 list-outside list-decimal ml-5">
                        <li>
                          本規約は、本サービスの提供条件及び本サービスの利用に関する当社とユーザー様との間の権利義務関係を定めることを目的とし、ユーザー様と当社との間の本サービスの利用に関わる一切の関係に適用されます。
                        </li>
                        <li>
                          本サービスに関して本規約とは別に契約又は規約等（以下「<b>個別契約等</b>」といいます。）が存在する場合、個別契約等も本規約の一部を構成するものとし、個別契約等の定めと本規約の定めが抵触するときは個別契約等の定めが優先するものとします。
                        </li>
                        <li>本規約の内容と、前項のルールその他の本規約外における本サービスの説明等とが異なる場合は、本規約の規定が優先して適用されるものとします。</li>
                        <li>本規約のうち当社が本サービスの利用を許諾した時点ではユーザー様に適用されない規定がある場合、当該規定は、事情変更によって将来適用可能となった時点から適用されるものとします。</li>
                      </ol>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5">
                        第2条（定義）
                      </h2>
                      <ol className="mt-3 list-outside list-decimal ml-5">
                        <p>本規約において使用する以下の用語は、各々以下に定める意味を有するものとします。</p>
                        <li>
                        「<b>サービス利用契約</b>」とは、本規約を契約条件として当社とユーザー様の間で締結される、本サービスの利用契約を意味します。
                        </li>
                        <li>
                          「<b>知的財産権</b>」とは、著作権、特許権、実用新案権、意匠権、商標権その他の知的財産権（それらの権利を取得し、またはそれらの権利につき登録等を出願する権利を含みます。）を意味します。
                        </li>
                        <li>「<b>提供データ</b>」とは、ユーザー様が本サービスを利用して提供その他送信するあらゆるデータ（アンケート回答、文章、画像、動画その他のデータを含みますがこれらに限りません。）を意味します。</li>
                        <li>「<b>当社</b>」とは、株式会社CUOREMOを意味します。</li>
                        <li>「<b>当社ウェブサイト</b>」とは、当社が運営するウェブサイト（理由の如何を問わず、当社のウェブサイトのドメインまたは内容が変更された場合は、当該変更後のウェブサイトを含みます。）を意味します。</li>
                        <li>「<b>登録事項</b>」とは、ユーザー様について、本サービスの利用上登録された当社の定める一定の情報を意味します。</li>
                        <li>「<b>登録データ</b>」とは、ユーザー様について当社が保有するあらゆるデータを意味します。</li>
                        <li>「<b>ユーザー様</b>」とは、第3条第2項に基づいてサービス利用契約を締結した個人を意味します。</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 items-center px-24 text-center sm:px-0">
                  <p>本規約に同意することで、「Heart Beat FINDER」サービスの利用契約が成立し、本規約に従いサービスの利用が可能となります。</p>
                  <label>
                    <input type="checkbox"
                      defaultChecked={clickableButton}
                      onChange={() => setClickableButton(!clickableButton)}
                    />
                    本規約の内容を理解し、同意します。
                  </label>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => confirmHandler()}
                    disabled={!clickableButton}
                  >
                    開始する
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
