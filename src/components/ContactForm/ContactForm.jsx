export const ContactForm = ({ handleChange, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" onChange={handleChange} required />
            <input type="tel" name="number" onChange={handleChange} required />
            <button type="submit">Submit</button>
        </form>
    )
}