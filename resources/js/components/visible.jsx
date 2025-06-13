export const Visible = ({ show, fallback = null, children }) => {
    if (show === true) {
        try {
            return <>{children}</>
        } catch (error) {
            return fallback
        }
    }

    return null
}
