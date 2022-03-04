import { useLocation } from "react-router";

const UseQuery=()=>{
    return new URLSearchParams(useLocation().search);
    console.log(useLocation().search)
}

export default UseQuery;