interface ButtonType {
    children: string,
    type?:  "button" | "submit" | "reset"
    className?: string
}

const Button = (props: ButtonType) => {
    return (
        <button type={props.type ?? 'button'}
            className={`text-white my-6 bg-blue-700 hover:bg-blue-800 focus:ring-4
             focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2
              dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
               dark:focus:ring-blue-800 ${props.className}`}>
            {props.children}</button>
    )
}

export default Button