type SearchProps = {
    value: string;
    onChange: (value: string) => void;
}

export function Search({value, onChange}: SearchProps) {
    return (
        <input type="text"
               value={value}
               placeholder='Search'
               onChange={({target}) => onChange(target.value)}
        />
    )
}