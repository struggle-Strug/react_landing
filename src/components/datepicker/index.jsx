import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from 'date-fns/locale/ja';
import './style.css'

registerLocale('ja', ja)

function Datepicker({dateSelected, setDate}) {
  return (
    <div className="flex items-center">
      <div className="">
        <DatePicker
          className="h-6 py-5 px-3 w-36 p-0 rounded border-slate-300 focus:border-primary-2 text-left"
          selected={dateSelected}
          locale="ja"
          dateFormat="yyyy/MM/dd"
          popperPlacement="top-start"
          showYearDropdown
          showMonthDropdown
          onChange={(date) => setDate(date)} />
      </div>
    </div>
  )
}

export default Datepicker