import { useLoaderData } from "react-router-dom";

const Edit = () => {

    const updatedData = useLoaderData();
    const { _id } = updatedData;

    console.log(_id);

    return (
        <div>
            <h1>hi</h1>
        </div>
    );
};

export default Edit;