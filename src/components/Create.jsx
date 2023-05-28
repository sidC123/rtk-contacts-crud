import { useState } from "react"
import { useDispatch } from "react-redux";
import { createUser } from "../redux/UserReducer";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [users, setUsers] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUserData = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value });
        console.log(users);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("users...", users);
        dispatch(createUser(users));
        navigate('/');
    }


    return (
        <>
            <form className="w-50 mx-auto my-5 shadow-lg p-4 bg-light rounded-4" onSubmit={handleSubmit}>
                <h2 className="text-center">ADD NEW USER</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" required id="name" name="name" onChange={getUserData} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" required id="email" name="email" onChange={getUserData} />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input type="number" className="form-control" required id="age" name="age" onChange={getUserData} />
                </div>
                <div className="mb-3 d-flex gap-5">
                    <label htmlFor="age" className="form-label">Gender: </label>
                    <div className="form-check">
                        <input value="male" className="form-check-input" required type="radio" name="gender" id="flexRadioDefault1" onChange={getUserData} />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Male
                        </label>
                    </div>
                    <div className="form-check">
                        <input value="female" className="form-check-input" required type="radio" name="gender" id="flexRadioDefault2" onChange={getUserData} />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Female
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Create