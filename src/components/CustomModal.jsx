/* eslint-disable react/prop-types */

import { useSelector } from "react-redux";

const CustomModal = ({ id, setShowModal }) => {
    const { users } = useSelector((state) => state.users);
    const singleUser = users && users.filter((ele) => ele.id === id);

    return (
        <div className='modal-bg'>
            <div className='modal-container'>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <h3>Id: {singleUser[0].id}</h3>
                <h3>Name: {singleUser[0].name}</h3>
                <h3>Email: {singleUser[0].email}</h3>
                <h3>Age: {singleUser[0].age}</h3>
                <h3>Gender: {singleUser[0].gender}</h3>
            </div>
        </div>
    )
}

export default CustomModal