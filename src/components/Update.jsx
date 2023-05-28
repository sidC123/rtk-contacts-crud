import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import Loading from "./Loading";
import { updateUser } from "../redux/UserReducer";

const Update = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userToUpdate, setUserToUpdate] = useState();

    const { users, loading } = useSelector((state) => state.users);

    useEffect(() => {
        if (id) {
            const singleUser = users && users.filter((ele) => ele.id === id);
            setUserToUpdate(singleUser[0])
        }
    }, [])

    const updateUserData = (e) => {
        setUserToUpdate({ ...userToUpdate, [e.target.name]: e.target.value })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateUser(userToUpdate));
        navigate('/');
    }

    console.log(userToUpdate);

    return (
        <>
            {
                loading ?
                    <Loading /> :
                    <form className="w-50 mx-auto my-5 shadow-lg p-4 bg-light rounded-4" onSubmit={handleUpdate}>
                        <h2 className="text-center">EDIT USER</h2>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input value={userToUpdate && userToUpdate.name} type="text" className="form-control" required id="name" name="name" onChange={updateUserData} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input value={userToUpdate && userToUpdate.email} type="email" className="form-control" required id="email" name="email" onChange={updateUserData} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age</label>
                            <input value={userToUpdate && userToUpdate.age} type="number" className="form-control" required id="age" name="age" onChange={updateUserData} />
                        </div>
                        <div className="mb-3 d-flex gap-5">
                            <label htmlFor="age" className="form-label">Gender: </label>
                            <div className="form-check">
                                <input value="male" className="form-check-input" required type="radio" name="gender" id="flexRadioDefault1" onChange={updateUserData} checked={userToUpdate && userToUpdate.gender === "male"} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Male
                                </label>
                            </div>
                            <div className="form-check">
                                <input value="female" className="form-check-input" required type="radio" name="gender" id="flexRadioDefault2" onChange={updateUserData} checked={userToUpdate && userToUpdate.gender === "female"} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Female
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
            }
        </>
    )
}

export default Update