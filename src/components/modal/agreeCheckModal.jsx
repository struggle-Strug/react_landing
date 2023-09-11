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
                    <Dialog.Title as="h1" className="text-xl font-semibold leading-1 text-gray-900 text-bold text-center">
                      「Heart Beat FINDER」利用規約
                    </Dialog.Title>
                    <div className="mt-5 overflow-y-auto h-[60vh] text-sm text-gray-700">
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
                          <p>(ア) 本サービスに係るコンピューター・システムの点検または保守作業を緊急に行う場合</p>
                          <p>(イ) コンピューター、通信回線等の障害、誤操作、過度なアクセスの集中、不正アクセス、ハッキング等により本サービスの運営ができなくなった場合</p>
                          <p>(ウ) 地震、落雷、火災、風水害、停電、天災地変などの不可抗力により本サービスの運営ができなくなった場合</p>
                          <p>(エ) 本サービスの提供に必要な外部システムAWSサーバー等）の提供又は利用が遮断された場合</p>
                          <p>(オ) その他、当社が停止または中断を必要と判断した場合</p>
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
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第9条（当社による利用停止又は解除等）
                      </h2>
                      <ol className="list-outside list-decimal ml-6">
                        <li>
                          当社は、ユーザー様が、以下の各号のいずれかの事由に該当する場合は、事前に通知または催告することなく、保存されているデータ（登録事項及び登録データを含みますが、これに限られません。）を削除もしくは非表示にし、当該ユーザー様について本サービスの利用を一時的に停止し、またはユーザー様としての登録を抹消又は本サービス契約の解除を行うことができます。
                          <p>(ア) 本規約のいずれかの条項に違反した場合</p>
                          <p>(イ) 登録事項に虚偽の事実があることが判明した場合</p>
                          <p>(ウ) 手段の如何を問わず、本サービスの運営を妨害した場合</p>
                          <p>(エ) 支払停止もしくは支払不能となり、または破産手続開始、民事再生手続開始、会社更生手続開始、特別清算開始若しくはこれらに類する手続の開始の申立てがあった場合</p>
                          <p>(オ) 反社会的勢力等（暴力団、暴力団員、右翼団体、反社会的勢力、その他これに準ずる者を意味します。以下同じ。）である、又は資金提供その他を通じて反社会的勢力等の維持、運営若しくは経営に協力若しくは関与する等反社会的勢力等との何らかの交流若しくは関与を行っていると当社が判断した場合</p>
                          <p>(ア) 未成年者、成年被後見人、被保佐人または被補助人のいずれかであり、法定代理人、後見人、保佐人または補助人の同意等を得ていなかった場合</p>
                          <p>(カ) 過去当社との契約に違反した者またはその関係者であると当社が判断した場合</p>
                          <p>(キ) その他、当社が本サービスの利用またはユーザー様としての登録の継続を適当でないと判断した場合</p>
                        </li>
                        <li>
                          前項各号のいずれかの事由に該当した場合、ユーザー様は、当社に対して負っている債務の一切について当然に期限の利益を失い、直ちに当社に対して全ての債務の支払を行わなければなりません。
                        </li>
                        <li>当社は、本条に基づき当社が行った行為によりユーザー様に生じた損害について一切の責任を負いません。</li>
                      </ol>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第10条（解約）
                      </h2>
                      <ol className="list-outside list-decimal ml-6">
                        <li>
                          ユーザー様は、当社のお問合せメールアドレス（info@cuoremo.co.jp）に通知することにより、本サービス契約を解約し、自己のユーザー様としての登録を抹消することができます。
                        </li>
                        <li>
                          解約にあたり、当社に対して負っている債務が有る場合は、ユーザー様は、当社に対して負っている債務の一切について当然に期限の利益を失い、直ちに当社に対して全ての債務の支払を行わなければなりません。
                        </li>
                        <li>解約後のユーザー様の登録情報の取扱いについては、第14条及び第15条の規定に従うものとします。</li>
                      </ol>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第11条（本サービスの内容の変更、終了）
                      </h2>
                      <ol className="list-outside list-decimal ml-6">
                        <li>
                          当社は、当社の都合により、本サービスの内容を変更し、または提供を終了することができます。当社が本サービスの提供を終了する場合、当社はユーザー様に事前に通知するものとします。
                        </li>
                        <li>
                          当社は、本条に基づき当社が行った措置によって生じた損害について一切の責任を負いません。
                        </li>
                      </ol>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第12条（保証の否認及び免責）
                      </h2>
                      <ol className="list-outside list-decimal ml-6">
                        <li>
                          当社は、本サービスがユーザー様の特定の目的に適合すること、期待する機能・商品的価値・正確性・有用性を有すること、ユーザー様による本サービスの利用がユーザー様に適用のある法令または業界団体の内部規則等に適合すること、継続的に利用できること、及び不具合が生じないことについて、明示又は黙示を問わず何ら保証するものではありません。
                        </li>
                        <li>
                          当社は、本サービスに関してユーザー様が被った損害につき、いかなる損害についても、賠償する責任を負わないものとします。
                        </li>
                        <li>ユーザー様は、本サービスをユーザー様が利用する為に必要な環境や設備（インターネット回線、パソコン等のハードウェア、Webブラウザ等のソフトウェア等を含みますがこれらに限りません。）を自己の責任と費用において適切に用意する必要があり、当社は、これらの用意に関する責任を負いません。</li>
                        <li>ユーザー様は、登録データについて、当社に保存責任・義務がないことを理解し、ユーザー様の消去、喪失等に関連してユーザー様が被った損害について、一切の責任を負いません。</li>
                        <li>当社は、本サービスの利用不能若しくは本サービスの利用による機器の故障若しくは損傷によって生じた損害に起因して生じた損害について、一切の責任を負いません。</li>
                        <li>本サービス又は当社ウェブサイトに関連してユーザー様と他の利用者又は第三者との間において生じた取引、連絡若しくは紛争等について、当社は一切の責任を負いません。もしそれらに関連して当社に費用が発生した場合又は当社が賠償金の支払いを行なった場合には、ユーザー様は当社に対して、当該費用（弁護士等の専門家の費用を含む）及び賠償金を補償するものとし、当社はユーザー様にこれらの合計額の支払いを請求できるものとします。</li>
                      </ol>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第13条（秘密保持）
                      </h2>
                      <ol className="list-outside list-decimal ml-6">
                        <li>ユーザー様及び当社は、本規約に別段の定めがある場合を除き、本サービスに関連して相手方から開示を受けた情報であって、開示の際に秘密に取り扱うことを明示的に求められたものについて、相手方の事前の書面による承諾がある場合を除き、秘密情報として取り扱うものとします。但し、次の各号のいずれかに該当するものについては秘密情報には該当しないものとします。
                          <p>(ア) 開示を受けたときに既に保有していた情報</p>
                          <p>(イ) 開示を受けた後、秘密保持義務を負うことなく第三者から正当に入手した情報</p>
                          <p>(ウ) 開示を受けた後、相手方から開示を受けた情報に関係なく独自に取得し、又は創出した情報</p>
                          <p>(エ) 開示を受けたときに既に公知であった情報</p>
                          <p>(オ) 開示を受けた後、自己の責めに帰し得ない事由により公知となった情報</p>
                        </li>
                        <li>前項の規定にかかわらず、秘密情報を受領した当事者（以下「<b>受領当事者</b>」といいます。）は、監督官庁等の正当な要求若しくは法令の定めに従って開示する場合、受領当事者の役員・従業員、本サービスの委託先、弁護士若しくは会計士その他法律上機密保持義務を負う者へ開示する場合は、秘密情報を開示した当事者の事前の承諾を得ることなく秘密情報を開示することができるものとします。</li>
                      </ol>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第14条（個人情報の保護及び取扱いの責任）
                      </h2>
                      <ol className="list-outside list-decimal ml-6">
                        <li>当社は、ユーザー様から委託された個人情報の取扱いについては、当社が別途定める<a href='https://cuoremo.co.jp/privacy/' className="hover:underline font-semibold" target='__blank'>プライバシーポリシー</a>（以下「<b>プライバシーポリシー</b>」といいます。）の定めによるものとし、ユーザー様はこの<a href='https://cuoremo.co.jp/privacy/' className="hover:underline font-semibold" target='__blank'>プライバシーポリシー</a>に従って当社がユーザー様の利用者情報を取扱うことについて同意するものとします。</li>
                        <li>当社は、ユーザー様から委託された個人情報について、委託の趣旨の範囲を超えて利用、加工、複写及び複製を行わないものとします。</li>
                        <li>当社は、ユーザー様から委託された個人情報について、漏えい、滅失又は毀損等の事故が発生した場合、その事実を速やかにユーザー様に報告し、原因の調査を行い、事故の拡大防止に必要な措置を講ずるものとします。</li>
                      </ol>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第15条（データの利用）
                      </h2>
                      <ol className="list-outside list-decimal ml-6">
                        <li>当社は、前条の定めに関わらず、登録情報その他のユーザー様に関する情報（但し、個人情報に該当するものを除きます。）を、本サービスを含む当社が提供し又は提供しようとしているサービスの品質向上、これらのサービスに関するユーザー様へのご案内、その他当社が<a href='https://cuoremo.co.jp/privacy/' className="hover:underline font-semibold" target='__blank'>プライバシーポリシー</a>に定める目的で利用することができるものとします。</li>
                        <li>当社は、ユーザー様が当社に提供した情報、データ等を、個人を識別・特定できないように加工したもの（以下「<b>統計資料</b>」といいます。）を作成し、本サービスおよび当社のその他のサービスのために統計資料を利用及び公開することができるものとします。</li>
                        <li>当社は、ユーザー様から本サービスの利用情報を取得し、ユーザー様に対して本サービスに関するフィードバックの提供を求める場合があります。ユーザー様は、これらの利用情報又はフィードバックの内容につき、本サービス契約期間中及び本サービス契約終了後において当社が利用することに同意するものとします。ただし、これらの利用情報又はフィードバックの内容の利用の目的は、本サービスの運営、改善、プロモーション及び新サービスの開発に限定されます。</li>
                      </ol>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第16条（本規約等の変更）
                      </h2>
                      <p>当社は、当社が必要と認めた場合は、本規約を変更できるものとします。本規約を変更する場合、変更後の本規約の施行時期及び内容を当社ウェブサイト上での掲示その他の適切な方法により周知し、またはユーザー様に通知します。但し、法令上ユーザー様の同意が必要となるような内容の変更の場合は、当社所定の方法でユーザー様の同意を得るものとします。</p>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第17条（連絡又は通知）
                      </h2>
                      <ol className="list-outside list-decimal ml-6">
                        <li>本サービスに関する問い合わせその他ユーザー様から当社に対する連絡または通知、及び本規約の変更に関する通知その他当社からユーザー様に対する連絡または通知は、当社の定める方法で行うものとします。</li>
                        <li>当社が登録事項に含まれるメールアドレスその他の連絡先に連絡または通知を行った場合、ユーザー様は当該連絡または通知を受領したものとみなします。</li>
                      </ol>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第18条（サービス利用契約上の地位の譲渡等）
                      </h2>
                      <ol className="list-outside list-decimal ml-6">
                        <li>ユーザー様は、当社の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務につき、第三者に対し、譲渡、移転、担保設定、その他の処分をすることはできません。</li>
                        <li>当社は本サービスにかかる事業を他社に譲渡した場合には、当該事業譲渡に伴い利用契約上の地位、本規約に基づく権利及び義務並びにユーザー様の登録事項その他の情報を当該事業譲渡の譲受人に譲渡することができるものとし、ユーザー様は、かかる譲渡につき本項において予め同意したものとします。なお、本項に定める事業譲渡には、通常の事業譲渡のみならず、会社分割その他事業が移転するあらゆる場合を含むものとします。</li>
                      </ol>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第19条（分離可能性）
                      </h2>
                      <p>本規約のいずれかの条項またはその一部が、消費者契約法その他の法令等により無効または執行不能と判断された場合であっても、本規約の残りの規定及び一部が無効または執行不能と判断された規定の残りの部分は、継続して完全に効力を有するものとします。</p>
                      <h2 className="text-base font-semibold leading-6 text-gray-900 text-bold mt-5 mb-3">
                        第20条（準拠法及び管轄裁判所）
                      </h2>
                      <ol className="list-outside list-decimal ml-6">
                        <li>本規約及びサービス利用契約の準拠法は日本法とします。</li>
                        <li>本規約またはサービス利用契約に起因し、または関連する一切の紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
                      </ol>

                      <p className='text-right m-5'>以上</p>
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
