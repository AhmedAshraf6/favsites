import React from 'react';

const List = ({ items, removeItem, editItem }) => {
  return (
    <>
      {items.map((item) => {
        const { id, title, url } = item;
        // console.log(title);
        return (
          <div className='well'>
            <h3 key={id} className='row'>
              <span className='nameInput' className='col-xs-12 text-center'>
                {title}
              </span>
              <span className='col-xs-12 text-center'>
                <a className='btn btn-info' target='_blanc' href={url}>
                  Visit
                </a>

                <a className='btn btn-success' onClick={() => editItem(id)}>
                  Edit
                </a>
                <a className='btn btn-danger' onClick={() => removeItem(id)}>
                  Delete
                </a>
              </span>
            </h3>
          </div>
        );
      })}
    </>
  );
};

export default List;
