import React from "react";

const SearchInput = ({ categories, placeholder, handleChange }) => {
  return (
    <div id="search-bar">
      <div className="d-flex flex-row-reverse">
        <div className="col-12 mb-5">
          <div className="input-group">
            <div className="input-group-append">
              <select
                className="form-control form-control-lg p-2"
                onChange={e => handleChange(e)}>
                {categories.map((category, i) => (
                  <option key={i} value={category.value}>
                    {category.text}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="search"
              className=" text-rtl form-control form-control-lg"
              placeholder={placeholder}
              onChange={e => handleChange(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;

/*
import SearchInput from '../../services/search-input';

    state = { 
        blogs: [],  

        categories: [
                { value: '', text: 'כולם'},
                { value: 'hotels', text: 'מלונות' },
            ],
     
    }

    const { categories } = this.state;

    <SearchInput categories={categories}  placeholder='חפש...'/>

        async handleChange(e){
        const { data } = await getBlogs();
        let blogs = data;
        const searchTerm = e.target.value; 
        const filertBlogs = blogs.filter((blog)=>{ return(
            blog.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) }); 
        this.setState({ blogs: filertBlogs });
    }

*/
