import { Input, Pagination, Select } from 'antd';
import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import '../overwrite.css';
import Header from './header';
import styles from './styles.module.scss';
const { Search } = Input;
const { Option } = Select;

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
  const [selectedCity, setSelectedCity] = useState('');

  const debouncedSearch = useCallback(
    debounce((value) => {
      console.log('searched: ', value);
    }, 1000),
    []
  );
  return (
    <div>
      <Header />
      <div className={styles.body}>
        <Search
          enterButton
          placeholder='Keyword skill (Java, iOS...), Job Title, Company...'
          onSearch={(value) => debouncedSearch(value)}
        />
        <Select
          style={{ width: '250px', margin: '10px 0' }}
          value={selectedCity}
          onChange={(value) => setSelectedCity(value)}>
          <Option value=''>All cities</Option>
          <Option value='ho-chi-minh-hcm'>Ho Chi Minh</Option>
          <Option value='ha-noi'>Ha Noi</Option>
          <Option value='da-nang'>Da Nang</Option>
        </Select>
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
        <Pagination pageSize={4} total={10} className={styles.pagination} />
      </div>
    </div>
  );
}

export default App;
