type UserIdFilterProps = {
    value: string;
    onChange: (value: string) => void;
    usersId: number[];
}

export function UserIdFilter({value, onChange, usersId, ...props}: UserIdFilterProps) {
    return (
        <div {...props}>
            Filter by user id:
            <select className="ms-2 h-100"
                    name="userId"
                    value={value}
                    onChange={({target}) => onChange(target.value)}
            >
                <option value=''>All</option>
                {usersId.map((id: number) => (
                    <option key={`${id}-optionUserId`} value={id}>User {id}</option>
                ))}
            </select>
        </div>
    )
}