import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import ShowTodo from "../../Todos/ShowTodo";
import useTodo from "../../../hooks/useTodo";

const Home = () => {

    const axiosPublic = useAxiosPublic();
    const [, , refetch] = useTodo();

    const handleAdd = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const status = "todo";
        const allValues = { title, description, status };
        const res = await axiosPublic.post("/task", allValues);
        if (res?.data?.insertedId) {
            refetch();
            Swal.fire({
                title: "Good job!",
                text: "You successfully post your title and description!",
                icon: "success"
            });
            form.reset();
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    }

    return (
        <div className="max-w-screen-xl mx-auto">
            <h1 className="text-center text-3xl font-bold">Add Your title and description</h1>
            <form onSubmit={handleAdd} className="mt-8 flex flex-col gap-6">
                <input required placeholder="Enter a title" className="border p-2 rounded-lg mt-6" type="text" name="title" />
                <textarea required placeholder="Enter a description" className="border p-2 rounded-lg" name="description" cols="30" rows="10"></textarea>
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <input
                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500" type="submit" value="Add"
                    />
                </div>
            </form>
            <ShowTodo refetch={refetch} />
        </div >
    );
};

export default Home;