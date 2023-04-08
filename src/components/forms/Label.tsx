
interface LabelProps {
    htmlFor?: string;
    className?: string;
    text: string;
}
const Input = (props: LabelProps) => {


    return (
        <label htmlFor={props.htmlFor ?? ''}
            className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${props.className ?? ''}`}>{props.text}</label>
    )
}