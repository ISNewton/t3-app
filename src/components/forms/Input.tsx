
interface InputProps extends React.HTMLProps<HTMLInputElement> {
    type?: string;
    id?: string;
    className?: string;
    placeholder?: string;
    touched?: any
    error?: any
    name?: string,
}
const Input = ({ type, className, touched, error, ...props }: InputProps) => {


    return (
        <>
            <input
                type={type ?? 'text'}
                className={ ` my-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
            ${className ?? ''}
            `}
                {...props}
            />
            {touched && (
                <p className="text-sm self-end text-red-400">{error ?? ''}</p>

            )}
        </>


    )
}

export default Input