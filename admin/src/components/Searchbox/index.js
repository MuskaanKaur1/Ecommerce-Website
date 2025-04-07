import { IoSearch } from "react-icons/io5";



const SearchBox=()=>{
    return(
        <>
       <div className="searchBox position-relative d-flex align-items-center ml-4">
        <IoSearch/>
        <input type="text" placeholder="Search Here..."/>
       </div>
        </>
    )
}
export default SearchBox;