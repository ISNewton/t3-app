
interface LabelProps {
    htmlFor?: string;
    className?: string;
    text: string;
}
const Label = (props: LabelProps) => {


    return (
        <label htmlFor={props.htmlFor ?? ''}
            className={`block mb-2 text-sm font-medium text-gray-900  ${props.className ?? ''}`}>{props.text}</label>
    )
}

export default Label