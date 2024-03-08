import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useTodo from "../../hooks/useTodo";
import Loading from "../../shared/Loading";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShowTodo = ({ refetch }) => {

    const [allTask, isTask] = useTodo();
    const axiosPublic = useAxiosPublic();
    const [todo, setTodo] = useState([]);
    const [completed, setCompleted] = useState([]);

    useEffect(() => {
        if (allTask?.length > 0) {
            const todoTask = allTask?.filter(employee => employee?.status === "todo");
            setTodo(todoTask);
            const completedTask = allTask?.filter(employee => employee?.status === "completed");
            setCompleted(completedTask);
        }
    }, [allTask])

    if (isTask) {
        return <Loading />
    }


    console.log(todo, completed);

    const handleDelete = async (id) => {
        const res = await axiosPublic.delete(`/task/${id}`)
        if (res?.data?.deletedCount) {
            refetch();
            Swal.fire({
                title: "Good job!",
                text: "You successfully post your title and description!",
                icon: "success"
            });
        }
    }

    const handleComplete = async (id) => {
        console.log(id);
        const res = await axiosPublic.put(`/tasks/${id}`)
        if (res?.data?.modifiedCount) {
            Swal.fire({
                title: "Good job!",
                text: "You successfully move your task to complete!",
                icon: "success"
            });
            refetch();
        }

    }


    return (
        <div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                <div>
                    <h1 className="font-bold text-center text-xl">TO DO ({todo.length})</h1>
                    <div className="flex justify-center">
                        <hr className="border-2  border-blue-400 w-60" />
                    </div>
                    <div >
                        {
                            todo?.map(item => <>
                                <div key={item?._id} className=" border-blue-400  border-l-4 hover:border mt-5 shadow-blue-200 hover:shadow-blue-500 p-4 shadow-xl rounded-lg">
                                    <h1 className="text-xl font-bold">Title : {item?.title}</h1>
                                    <h1 className="text-blue-400">Description : {item?.description}</h1>
                                    <div className="flex justify-between items-center">
                                        <Link to={`edit/${item?._id}`}><button className="p-3 bg-blue-400 rounded-lg text-white">Edit</button></Link>
                                        <button onClick={() => handleDelete(item?._id)} className="p-3 bg-blue-400 rounded-lg text-white">Delete</button>
                                        <button className="p-3 bg-blue-400 rounded-lg text-white" onClick={() => handleComplete(item?._id)}>Mark Complete</button>
                                    </div>
                                </div>
                            </>)
                        }
                    </div>
                </div >
                <div>
                    <h1 className="font-bold text-center text-xl">Completed ({completed.length})</h1>
                    <div className="flex justify-center">
                        <hr className="border-2  border-blue-400 w-60" />
                    </div>
                    <div >
                        {
                            completed?.map(item => <>
                                <div key={item?._id} className=" border-blue-400  border-l-4 hover:border mt-5 shadow-blue-200 hover:shadow-blue-500 p-4 shadow-xl rounded-lg">
                                    <h1 className="text-xl font-bold">Title : {item?.title}</h1>
                                    <h1 className="text-blue-400">Description :  {item?.description}</h1>
                                </div>
                            </>)
                        }
                    </div>
                </div >
            </div>
        </div>
    );
};

export default ShowTodo;