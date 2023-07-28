/* eslint-disable react/prop-types */

function InputField (props) {
    const className = `px-3 py-2 rounded-md border border-slate-300 focus:bg-transparent placeholder-slate-400 focus:border-primary-2 focus:border-1 focus:outline-none st ${props.className || ''}`
    return (
        <div className='flex flex-col'>
            <label className='block mb-1 text-gray-700' htmlFor='email'>
                {props.label}
            </label>
            <input {...props} className={className}/>
        </div>
    );
}

export default InputField;

export function LoginInputField (props) {
  const classNames = `px-6 py-2 rounded-full border-0.5 border-slate-300 focus:border-primary-2 ${props.className || ''}`
  return (
      <div className='flex flex-col'>
          <label className='block mb-1 ml-3 text-gray-700' htmlFor='email'>
              {props.label}
          </label>
          <input {...props} className={classNames}/>
      </div>
  );
}