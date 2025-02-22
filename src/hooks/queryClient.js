import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {noteApi} from '../services/api'
export const useNoteQuery = ()=>{
    return useQuery({
        queryKey : ["notes"],
        queryFn : async()=> await noteApi.get("notes",{ _sort: "pin", _order: 'asc' }),
    })
}

export function useAddNote(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey : "add",
        mutationFn: async (data) => await noteApi.post("notes/",{},data),

        onSuccess: ()=>{
            queryClient.invalidateQueries(["notes"]); // ✅ Refresh the list after adding
        }
    })
}
export function useUpdateNote(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey : "update",

        mutationFn: async ({ id, data }) => await noteApi.patch(`notes/${id}`, data),

        onSuccess: ()=>{
            queryClient.invalidateQueries(["notes"]); // ✅ Refresh after updating
        }
    })
}
export function useDeleteNote(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey : "delete",

        mutationFn: async (id) => await noteApi.delete(`notes/${id}`),

        onSuccess: ()=>{
            queryClient.invalidateQueries(["notes"]); // ✅ Refresh after updating
        }
    })
}