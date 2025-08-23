import {React,useEffect} from "react";
import { Pagination,PaginationItem } from "@mui/material";
import { usePaginationStyles } from "./styles";
import { Link } from "react-router-dom";

import { useDispatch,useSelector } from "react-redux";
import { getPosts } from "../actions/posts";

const Paginate = ({page}) =>{
    const { ul } = usePaginationStyles();
    const dispatch = useDispatch();
    const {numberOfPages} = useSelector((state)=>state.posts)

    useEffect(()=>{
        if(page) dispatch(getPosts(page))
    },[page])
    return(
        <Pagination
        classes={{ul:ul}}
        count = {numberOfPages}
        page={Number(page) || 1}
        variant = 'outlined'
        color = 'primary'
        renderItem ={(item)=>(
            <PaginationItem
            {...item} component={Link}
            to = {`/posts?page=${item.page}`}
            />
        )}
        />
    )
}

export default Paginate;