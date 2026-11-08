import { useState } from "react";

export const useTaskShow = ()=>{
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return {
        isEditModalOpen,
        openEditModal:()=>setIsEditModalOpen(true),
        closeEditModal:()=>setIsEditModalOpen(false)
    }
}