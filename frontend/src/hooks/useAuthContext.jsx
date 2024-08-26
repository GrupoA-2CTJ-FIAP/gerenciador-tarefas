import { useContext } from "react";
import { authContext } from "../contexts/authContext";

function useAuthContext() {
    const context = useContext(authContext)

    if (context === undefined) {
        throw new Error('Not inside context.')
    }

    return context
}

export default useAuthContext;