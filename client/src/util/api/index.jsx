import React from 'react';

const Api = (data, cb) => {


  fetch('/api/probabilities',
    { headers: { Accept: 'application/json',
      'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data) })
    .then(res => res.json())
    .then((result) => {
      cb({ items: result });
    }, (error) => {
      cb({ error });
    });
};

export default Api;
