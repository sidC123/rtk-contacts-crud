import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchUser } from '../redux/UserReducer';

const Navbar = () => {
    const [searchData, setSearchData] = useState('');
    const dispatch = useDispatch();

    const users = useSelector((state) => state.users.users);

    useEffect(() => {
        dispatch(searchUser(searchData));
        // console.log(searchData);
    }, [searchData, dispatch])


    return (
        <>
            <nav className="navbar shadow-lg sticky-top navbar-expand-lg bg-body-tertiary bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">CRUD</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/create" className="nav-link" >Create user</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="" className="nav-link" aria-current="page" >All users({users.length})</Link>
                            </li>
                        </ul>
                        <form className="d-flex w-50" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                onChange={(e) => setSearchData(e.target.value)} />
                            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar