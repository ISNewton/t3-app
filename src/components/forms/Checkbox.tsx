interface CheckboxInterface extends React.HTMLProps<HTMLInputElement> {
    type?: string;
    id?: string;
    className?: string;
    placeholder?: string;
    touched?: any
    error?: any
    name?: string
}

const Checkbox = ({className  , touched , error,...props} : CheckboxInterface) => {
    return (
        <>
            <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                    <input  type="checkbox"
                        className={`w-4 h-4 border border-gray-300 rounded
                         bg-gray-50 focus:ring-3
                          focus:ring-blue-300
                         dark:bg-gray-700
                          dark:border-gray-600
                          dark:focus:ring-blue-600
                           dark:ring-offset-gray-800
                           dark:focus:ring-offset-gray-800 ${className}`}
                          {  ...props}
                    />
                </div>
                <label htmlFor={props.id} className="ml-2 text-sm font-medium text-gray-900">

                    {props.label}
                </label>
                {touched && (
                <p className="text-sm self-end text-red-400">{error ?? ''}</p>

            )}
            </div>
        </>

    )
}

export default Checkbox