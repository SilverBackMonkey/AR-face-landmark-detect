
const LoadingButton = ({label, handleClick, loading, classList, disable, loadingLabel}) => {

    return (
            <button 
            className={`${classList} min-w-24 min-h-8`}
            onClick={handleClick}
            disabled={disable}
            >
                {!loading && label}
                {loading && <div className="flex inline-flex"> {loadingLabel}
                    <div className="ml-1">
                        <span className="loading loading-spinner loading-xs"></span>
                    </div>
                </div>}
            </button>
    )
}

export default LoadingButton;
