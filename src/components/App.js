import { Input } from 'antd';
import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import '../overwrite.css';
import Header from './header';
import styles from './styles.module.scss';
const { Search } = Input;

const mock = [
  {
    name: '05 Junior JavaScript / ReactJS Developer',
    link: 'http://localhost',
    description:
      'We are seeking a FrontEnd developer, who will work closely with our product managers, UI / UX designers, QA and other developers to help translate...',
    location: 'HCM',
    score: 5,
  },
  {
    name: '05 Junior JavaScript / ReactJS Developer',
    link: 'http://localhost',
    description:
      'We are seeking a FrontEnd developer, who will work closely with our product managers, UI / UX designers, QA and other developers to help translate...',
    location: 'HCM',
    score: 5,
  },
  {
    name: '05 Junior JavaScript / ReactJS Developer',
    link: 'http://localhost',
    description:
      'We are seeking a FrontEnd developer, who will work closely with our product managers, UI / UX designers, QA and other developers to help translate...',
    location: 'HCM',
    score: 5,
  },
  {
    name: '05 Junior JavaScript / ReactJS Developer',
    link: 'http://localhost',
    description:
      'We are seeking a FrontEnd developer, who will work closely with our product managers, UI / UX designers, QA and other developers to help translate...',
    location: 'HCM',
    score: 5,
  },
];

function App() {
  const [data, setData] = useState(mock);

  const debouncedSearch = useCallback(
    debounce((value) => {
      console.log('searched: ', value);
    }, 1000),
    []
  );
  return (
    <div>
      <Header />
      <div className='body'>
        <Search
          enterButton
          placeholder="Search by job's name ..."
          onSearch={(value) => debouncedSearch(value)}
        />
        {data.map((el, index) => {
          return (
            <div key={index} className={styles.itemContainer}>
              <img
                alt='...'
                src='https://cdn.itviec.com/employers/care-connect-vietnam/logo/w170/8R6J4dzjrdbiceZN9c3GVeKu/logo%20CCV.png'
              />
              <div className={styles.content}>
                <h1>{el.name}</h1>
                <div className={styles.description}>
                  <p>{el.description}</p>
                  <div className={styles.location}>{el.location}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
