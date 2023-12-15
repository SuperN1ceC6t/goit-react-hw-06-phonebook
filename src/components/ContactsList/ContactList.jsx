export const ContactList = ({contacts, onDeleteButton}) => {
    return (
        <>
            <h2>Contacts</h2>
            <ul>
                {contacts.map(contact => {
                    return (
                        <div key={contact.id}>
                        <li id={contact.id}>{contact.name}: {contact.number} </li>
                        <button onClick={() => onDeleteButton(contact.id)}>Delete</button>
                        </div>
                )})}
            </ul>
        </>
    )
}