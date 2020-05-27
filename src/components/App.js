import { Input, Pagination, Select } from 'antd';
import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import '../overwrite.css';
import Header from './header';
import styles from './styles.module.scss';
const { Search } = Input;
const { Option } = Select;

function App() {
  const [data, setData] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setIsLoading(true);
      fetch(`http://localhost:9000?search=${value}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data.datas);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000),
    []
  );
  return (
    <div>
      <Header />
      <div className={styles.body}>
        <Search
          loading={isLoading}
          enterButton
          placeholder='Keyword skill (Java, iOS...), Job Title, Company...'
          onSearch={(value) => debouncedSearch(value)}
        />
        {isLoading ? <div>Is Loading</div> : null}
        {data.map((el, index) => {
          return (
            <div key={index} className={styles.itemContainer}>
              <img alt='...' src={el.company.logo} />
              <div className={styles.content}>
                <h1>{el.name}</h1>
                <div className={styles.description}>
                  <div
                    dangerouslySetInnerHTML={{ __html: el.description }}></div>
                </div>
              </div>
            </div>
          );
        })}
        {/* <Pagination pageSize={4} total={10} className={styles.pagination} /> */}
      </div>
    </div>
  );
}

export default App;
