const Input = ({id, type, value, onChange, defaultValue, disabled, children}) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input type={type} id={id} {...defaultValue && {defaultValue}} {...!defaultValue && {value}} {...!defaultValue && {onChange}} disabled={disabled} />
        </>
    );
};
export default Input;
