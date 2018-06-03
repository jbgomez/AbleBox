import React from 'react';
import {InputGroup, InputGroupAddon, Input} from 'reactstrap';

const Search = ({searchHandler, handleKeyPress}) => (
  <InputGroup>
    <InputGroupAddon addonType="prepend" className="d-none d-md-block">Search</InputGroupAddon>
    <Input type="text" name="searchText" id="searchText" placeholder="search a file or folder" onChange = {(e) => {searchHandler(e.target.value)}} onKeyPress={(e)=>{handleKeyPress(e, searchHandler.bind(this, e.target.value))}}/>
  </InputGroup>
);

export default Search;

