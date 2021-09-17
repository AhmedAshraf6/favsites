import React, { useState, useEffect } from 'react';
import List from './List';
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};
function Form() {
  // Use state
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditting, setIsEditting] = useState(false);
  const [editId, setEditId] = useState(false);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name && !url) {
      alert('enter name and url');
    } else if (!name) {
      alert('enter name');
    } else if (!url) {
      alert('enter url');
    } else if (name && url && isEditting) {
      {
        setList(
          list.map((item) => {
            if (item.id == editId) {
              return { ...item, title: name, url: url };
            }
            return item;
          })
        );
      }
      setEditId(null);
      setIsEditting(false);
      setName('');
      setUrl('');
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        url: url,
      };
      setList([...list, newItem]);
      setName('');
      setUrl('');
    }
  };

  // Delete All
  const deleteAll = (e) => {
    e.preventDefault();
    if (list.length == 0) {
      alert('nothing to delete');
    } else {
      setList([]);
    }
  };

  // Remove Item
  const removeItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    setName('');
    setUrl('');
  };

  // Edit item
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditting(true);
    setEditId(id);
    setName(specificItem.title);
    setUrl(specificItem.url);
  };
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  });
  return (
    <div className='container special'>
      <div className='header clearfix'>
        <h3 className='text-muted'>Favourite Sites</h3>
      </div>

      <div className='jumbotron'>
        <h3>Put Your Favourite Sites</h3>

        <form id='myForm' onSubmit={handleSubmit}>
          <div className='col-auto'>
            <label htmlFor='staticEmail2'>Site Name</label>
            <input
              type='text'
              className='form-control'
              placeholder='Website Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>Site Url</label>
            <input
              type='text'
              className='form-control'
              id='siteUrl'
              placeholder='Website Url'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <button tybe='submit' className='btn btn-primary'>
            {isEditting ? 'Edit' : 'Add'}
          </button>
          <button tybe='submit' className='btn btn-danger' onClick={deleteAll}>
            Delete All
          </button>
          {/* <a class='btn btn-danger deleteAll'>Delete All</a> */}
        </form>
      </div>
      {list.length > 0 && (
        <div className='row marketing'>
          <div className='col-lg-12'>
            <div id='bookmarksResults'>
              <List items={list} removeItem={removeItem} editItem={editItem} />
            </div>
          </div>
        </div>
      )}
      <footer class='footer'>
        <p>&copy; 2021 Favourite Sites, Designed By Ahmed Ashraf.</p>
      </footer>
    </div> //end container
  );
}

export default Form;
