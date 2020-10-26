import React, {useEffect, useState} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { autoPlayAt15h30, stopPlayAt15h30 } from './google-libs/youtube';
import { setStorageByKey, getStorageByKey, getActiveTabUrl } from './google-libs/utils';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const timeoutIdKey = 'timeoutId';

const App = () => {
  const [youtubeSetTimeoutId, setYoutubeSetTimeoutId] = useState();
  const [currentTabUrl, setCurrentTabUrl] = useState();

  useEffect(async () => {
    const timeoutId = await getStorageByKey(timeoutIdKey);
    const curTabUrl = await getActiveTabUrl();
    setCurrentTabUrl(curTabUrl);
    setYoutubeSetTimeoutId(timeoutId);
  }, []);

  const onClickAutoPlay = async () => {
    if (youtubeSetTimeoutId) {
      await stopPlayAt15h30(youtubeSetTimeoutId);
      await setStorageByKey(timeoutIdKey, null);
      setYoutubeSetTimeoutId(undefined);
    } else {
      const timeoutId = await autoPlayAt15h30();
      await setStorageByKey(timeoutIdKey, timeoutId);
      setYoutubeSetTimeoutId(timeoutId);
    }
  };

  return (
    <div className="app">
      <ListGroup>
        {currentTabUrl && currentTabUrl.includes('youtube.com') && (<div onClick={onClickAutoPlay}>
          <ListGroupItem>{!youtubeSetTimeoutId ? 'Auto play at 15h30' : 'Stop auto play at 15h30'}</ListGroupItem>
        </div>)}
      </ListGroup>
    </div>
  );
};

export default App;
