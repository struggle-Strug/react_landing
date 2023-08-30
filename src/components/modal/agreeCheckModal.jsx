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
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第1条（適用）
                      </h2>
                      <ol className="list-outside list-decimal ml-6">
                        <li>
                          本規約は、本サービスの提供条件及び本サービスの利用に関する当社とユーザー様との間の権利義務関係を定めることを目的とし、ユーザー様と当社との間の本サービスの利用に関わる一切の関係に適用されます。
                        </li>
                        <li>
                          本サービスに関して本規約とは別に契約又は規約等（以下「<b>個別契約等</b>」といいます。）が存在する場合、個別契約等も本規約の一部を構成するものとし、個別契約等の定めと本規約の定めが抵触するときは個別契約等の定めが優先するものとします。
                        </li>
                        <li>本規約の内容と、前項のルールその他の本規約外における本サービスの説明等とが異なる場合は、本規約の規定が優先して適用されるものとします。</li>
                        <li>本規約のうち当社が本サービスの利用を許諾した時点ではユーザー様に適用されない規定がある場合、当該規定は、事情変更によって将来適用可能となった時点から適用されるものとします。</li>
                      </ol>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第2条（定義）
                      </h2>
                      <p>本規約において使用する以下の用語は、各々以下に定める意味を有するものとします。</p>
                      <ol className="list-outside list-decimal ml-6">
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
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第3条（契約の締結等）
                      </h2>
                      <ol className="list-outside list-decimal ml-6">
                        <li>
                          本サービスの利用希望者（以下「<b>利用希望者</b>」といいます。）は、利用希望者の事業者において本サービスの利用者として登録され、かつ当社ウェブサイト上にて本規約を遵守することに同意した個人をいいます。
                        </li>
                        <li>
                          利用希望者が、本規約に遵守することを同意した時点において、サービス利用契約が契約者との間に成立し、契約者は本サービスを本規約に従い利用することができるようになります。
                        </li>
                      </ol>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第4条（登録事項の変更）
                      </h2>
                      <p>ユーザー様は、登録事項に変更があった場合、当社の定める方法により当該変更事項を遅滞なく当社に通知するものとします。</p>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第5条（パスワード及びユーザーIDの管理）
                      </h2>
                      <ol className="list-outside list-decimal ml-6">
                        <li>
                          ユーザー様は、自己の責任において、本サービスに関するパスワード及びユーザーIDを適切に管理及び保管するものとし、これを第三者に利用させ、または貸与、譲渡、名義変更、売買等をしてはならないものとします。
                        </li>
                        <li>
                          パスワードまたはユーザーIDの管理不十分、使用上の過誤、第三者の使用等によって生じた損害に関する責任はユーザー様が負うものとします。
                        </li>
                      </ol>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第6条（禁止事項）
                      </h2>
                      <p>ユーザー様は、本サービスの利用にあたり、以下の各号のいずれかに該当する行為または該当すると当社が判断する行為をしてはなりません。</p>
                      <ol className="list-outside list-decimal ml-6">
                        <li>
                          法令に違反する行為または犯罪行為に関連する行為
                        </li>
                        <li>
                          当社、本サービスの他の利用者またはその他の第三者に対する詐欺または脅迫行為
                        </li>
                        <li>
                          公序良俗に反する行為
                        </li>
                        <li>
                          当社、本サービスの他の利用者またはその他の第三者の知的財産権、肖像権、プライバシーの権利、名誉、その他の権利または利益を侵害する行為
                        </li>
                        <li>
                          本サービスのネットワークまたはシステム等に過度な負荷をかける行為
                        </li>
                        <li>当社が提供するソフトウェアその他のシステムに対するリバースエンジニアリングその他の解析行為</li>
                        <li>本サービスの運営を妨害するおそれのある行為</li>
                        <li>当社のネットワークまたはシステム等への不正アクセス</li>
                        <li>第三者に成りすます行為</li>
                        <li>本サービスの他の利用者のIDまたはパスワードを利用する行為</li>
                        <li>本サービスの他の利用者の情報の収集</li>
                        <li>当社、本サービスの他の利用者またはその他の第三者に不利益、損害、不快感を与える行為</li>
                        <li>反社会的勢力等への利益供与</li>
                        <li>面識のない異性との出会いを目的とした行為</li>
                        <li>前各号の行為を直接または間接に惹起し、または容易にする行為</li>
                        <li>前各号の行為を試みること</li>
                        <li>その他、当社が不適切と判断する行為</li>
                      </ol>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第7条（本サービスの停止等）
                      </h2>
                      <ol className="list-outside list-decimal ml-6">
                        <li>
                          当社は、以下のいずれかに該当する場合には、ユーザー様に事前に通知することなく、本サービスの全部または一部の提供を停止または中断することができるものとします。
                          <p>(ア)本サービスに係るコンピューター・システムの点検または保守作業を緊急に行う場合</p>
                          <p>(イ)コンピューター、通信回線等の障害、誤操作、過度なアクセスの集中、不正アクセス、ハッキング等により本サービスの運営ができなくなった場合</p>
                          <p>(ウ)地震、落雷、火災、風水害、停電、天災地変などの不可抗力により本サービスの運営ができなくなった場合</p>
                          <p>(エ)本サービスの提供に必要な外部システムAWSサーバー等）の提供又は利用が遮断された場合</p>
                          <p>(オ)その他、当社が停止または中断を必要と判断した場合</p>
                        </li>
                        <li>
                          当社は、本条に基づき当社が行った措置によって生じた損害について一切の責任を負いません。
                        </li>
                      </ol>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第8条（権利帰属）
                      </h2>
                      <ol className="list-outside list-decimal ml-6">
                        <li>
                          当社ウェブサイト及び本サービスに関する知的財産権は全て当社または当社にライセンスを許諾している者に帰属しており、本規約に基づく本サービスの利用許諾は、当社ウェブサイトまたは本サービスに関する当社または当社にライセンスを許諾している者の知的財産権の使用許諾を意味するものではありません。ユーザー様は、いかなる理由によっても当社又は当社にライセンスを許諾している者の知的財産権を侵害するおそれのある行為（逆アセンブル、逆コンパイル、リバースエンジニアリングを含みますが、これらに限定されません。）をしないものとします。
                        </li>
                        <li>
                          ユーザー様は、提供データについて、自らがデータ登録その他送信することについての適法な権利を有していること、及び提供データが第三者の権利を侵害していないことについて、当社に対し表明し、保証するものとします。
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 items-center px-0 text-center text-sm sm:px-12">
                  <p className='mb-3'>本規約に同意することで、「Heart Beat FINDER」サービスの利用契約が成立し、本規約に従いサービスの利用が可能となります。</p>
                  <label>
                    <input type="checkbox"
                      defaultChecked={clickableButton}
                      onChange={() => setClickableButton(!clickableButton)}
                      className='mr-2'
                    />
                    本規約の内容を理解し、同意します。
                  </label>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3"
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
