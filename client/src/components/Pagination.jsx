import React from "react";
import { Pagination,PaginationItem } from "@mui/material";
import { usePaginationStyles } from "./styles";
import { Link } from "react-router-dom";

const Paginate = () =>{
    const { ul } = usePaginationStyles();
    return(
        <Pagination
        classes={{ul:ul}}
        count = {5}
        page={1}
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