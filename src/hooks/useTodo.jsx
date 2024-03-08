import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTodo = () => {

    const axiosPublic = useAxiosPublic();

    const {data : allTask, isPending : isTask, refetch} = useQuery({
        queryKey : ["allTodo"],
        queryFn : async () => {
            const res = await axiosPublic.get("/task");
            return res?.data
        }
    })

    return [allTask, isTask, refetch];
};

export default useTodo;