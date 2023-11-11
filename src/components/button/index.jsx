/* eslint-disable react/prop-types */
function Button(props) {
  const className = `flex justify-center items-center py-1 sp:py-0 bg-btn text-white rounded-full disabled:bg-slate-300 hover:bg-primary-1 transition-colors border-4 border-white shadow-lg rounded-full ${props.className || ''}`
  return (
    <div>
      <button {...props} className={className}>
        {props.title}
      </button>
    </div>
  );
}

export default Button;