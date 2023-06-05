import { useDispatch, useSelector } from "react-redux"
import { deleteUser, getUsers } from "../redux/UserReducer";
import { useEffect } from "react";
import Loading from "./Loading";
import CustomModal from "./CustomModal";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const { users, loading, searchDataState } = useSelector((state) => state.users);
    console.log("👌👌users", users);

    const [viewId, setViewId] = useState();
    const [showModal, setShowModal] = useState(false);
    const [radioData, setRadioData] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [])

    return (
        <>
            {showModal && <CustomModal id={viewId} showModal={showModal} setShowModal={setShowModal} />}

            {
                loading ?

                    <Loading /> :

                    <div className="container">
                        <h1 className="text-center gradient-text my-4">CRUD App with JSON Server</h1>
                        {/* 
                            1. Creating inputs for changing gender filter
                            2. Create a local state to hold the checked radio value
                            3. Add checked logic on all inputs (all radio input will be checked by default)
                            4. Add onchange event on the inputs (values should match with the schema)                       
                        */}
                        <div className="mb-3 d-flex gap-5 justify-content-center">
                            <label htmlFor="age" className="form-label">Filter By: </label>
                            <div className="form-check">
                                <input checked={radioData === ""} value="" className="form-check-input" required type="radio" name="gender" id="flexRadioDefault0" onChange={(e) => setRadioData(e.target.value)} />
                                <label className="form-check-label" htmlFor="flexRadioDefault0">
                                    All
                                </label>
                            </div>
                            <div className="form-check">
                                <input checked={radioData === "male"} value="male" className="form-check-input" required type="radio" name="gender" id="flexRadioDefault1" onChange={(e) => setRadioData(e.target.value)} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Male
                                </label>
                            </div>
                            <div className="form-check">
                                <input checked={radioData === "female"} value="female" className="form-check-input" required type="radio" name="gender" id="flexRadioDefault2" onChange={(e) => setRadioData(e.target.value)} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Female
                                </label>
                            </div>
                        </div>
                        <div className="row row-cols-md-3 row-cols-2 gy-4">
                            {/* 
                                1. Sequence of filter first serach then gender based filter
                                2. Make sure to render the data as it is when search data in blank
                                3. matching the search string with the name of objects and returning that array only.
                                -------------
                                4. Apply logics to return an array based on gender selected
                                5. make sure to return the array as it is when 'all' input is checked
                                6. Map out the final array
                            */}
                            {
                                users && users.filter((e) => {
                                    if (searchDataState.length === 0) {
                                        return e
                                    } else {
                                        return e.name.toLowerCase().includes(searchDataState.toLowerCase())
                                    }
                                }).filter((e) => {
                                    if (radioData === "male") {
                                        return e.gender === radioData;
                                    } else if (radioData === "female") {
                                        return e.gender === radioData;
                                    } else {
                                        return e;
                                    }
                                }).map((user) => (
                                    <div className="col" key={user && user.id}>
                                        <div className="card shadow-lg bg-dark">
                                            <div className="card-body text-light">
                                                <h5 className="card-title">Name: {user && user.name}</h5>
                                                <h6 className="card-subtitle mb-2 text-body-secondary"> Email {user && user.email}</h6>
                                                <h6>Age: {user && user.age}</h6>
                                                <h6>Gender: {user && user.gender}</h6>
                                                <div className="d-flex justify-content-around">
                                                    <button onClick={() => [setViewId(user && user.id), setShowModal(true)]} className="btn btn-primary">
                                                        View
                                                    </button>
                                                    <Link to={`/edit/${user && user.id}`} className="btn btn-secondary">
                                                        Edit
                                                    </Link>
                                                    <button className="btn btn-danger" onClick={() => dispatch(deleteUser(user && user.id))}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div >
            }
        </>

    )
}

export default Home