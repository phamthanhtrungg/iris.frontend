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
  const [searchStr, setSearchStr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNext, setNext] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollToBottom, setScollBottom] = useState(false);
  const [didFetch, setDidFetch] = useState(false);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setIsLoading(true);
      fetch(`http://localhost:9000?search=${value}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data.datas);
          setNext(data.next);
          setSearchStr(value);
          setDidFetch(true);
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

  React.useState(() => {
    document.addEventListener('scroll', trackScrolling);
    return () => {
      document.removeEventListener('scroll', trackScrolling);
    };
  });
  function trackScrolling() {
    const scrollHeight = Math.ceil(window.scrollY + window.innerHeight);
    var D = document;
    const maxHeight = Math.max(
      D.body.scrollHeight,
      D.documentElement.scrollHeight,
      D.body.offsetHeight,
      D.documentElement.offsetHeight,
      D.body.clientHeight,
      D.documentElement.clientHeight
    );
    if (scrollHeight > maxHeight / 2) {
      setScollBottom(true);
    } else {
      setScollBottom(false);
    }
  }
  function LoadMore() {
    setIsLoading(true);
    fetch(`http://localhost:9000?search=${searchStr}&page=${currentPage + 1}`)
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        setData([...data, ...resData.datas]);
        setNext(resData.next);
        setCurrentPage(currentPage + 1);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <div>
      <Header />
      <div className={styles.body} id='main'>
        <Search
          id='search'
          loading={isLoading}
          enterButton
          placeholder='Keyword skill (Java, iOS...), Job Title, Company...'
          onSearch={(value) => debouncedSearch(value)}
        />
        {isLoading ? <div>Is Loading</div> : null}
        {data.length === 0 && didFetch ? (
          <div>Not found</div>
        ) : (
          data.map((el, index) => {
            return (
              // eslint-disable-next-line react/jsx-no-target-blank
              <a
                key={index}
                href={el.link}
                target='_blank'
                style={{ textDecoration: 'none', color: 'black' }}>
                <div key={index} className={styles.itemContainer}>
                  <img alt='...' src={el.company.logo} />
                  <div className={styles.content}>
                    <h1>{el.name}</h1>
                    <div className={styles.description}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: el.description.substr(0, 300) + '...',
                        }}></div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })
        )}
        {hasNext ? (
          <div
            id='bottom'
            className={styles.loadMore}
            onClick={() => LoadMore()}>
            Load more
          </div>
        ) : null}
      </div>
      {scrollToBottom ? (
        <div
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setScollBottom(false);
          }}
          className={styles.scrollToTop}>
          {' '}
          👆{' '}
        </div>
      ) : null}
    </div>
  );
}

export default App;
