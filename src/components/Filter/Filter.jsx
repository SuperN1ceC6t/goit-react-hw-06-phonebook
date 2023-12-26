export const Filter = ({value ,filterContacts}) => {
    return (
        <>
            <p>Find contacts by name</p>
            <input type="text" name="filter" onChange={filterContacts} required/>
        </>
    )
}