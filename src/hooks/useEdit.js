import React, { useState } from 'react'

function useEdit() {
    const [editMode, setEditMode] = useState(false)

    const handleEditMode = () => {
        if(editMode){
            setEditMode(false)
        } else {
            setEditMode(true)
        }
    }

    return {editMode, handleEditMode}
}

export default useEdit