/* eslint-disable react/prop-types */
function Button(props) {
  const className = `flex justify-center px-6 py-3 bg-btn text-white rounded-full disabled:bg-slate-300 hover:bg-primary-1 transition-colors ${props.className || ''}`
  return (
    <div>
      <button {...props} className={className}>
        {props.title}
      </button>
    </div>
  );
}

export default Button;