import React, { useState } from 'react'

function useEdit() {
    const [edit, setEdit] = useState()

    const handleEditMode = () => {
        setEdit(!edit)
    }

    return {edit, setEdit}
}

export default useEdit