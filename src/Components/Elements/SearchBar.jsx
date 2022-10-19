import { FaSearch } from "react-icons/fa";
import './Elements.css';

export default function SearchBar() {
    return (
        <>
            <form className="d-flex my-0">
                <input className="form-control mr-sm-2 radius__square" type="search" placeholder="Search by mobile" aria-label="Search" />
                <button className="btn btn-dark my-2 my-sm-0 radius__square" type="submit"><FaSearch/></button>
            </form>
        </>
    );
}