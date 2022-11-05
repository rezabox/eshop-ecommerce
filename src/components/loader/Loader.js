import styles from './Loader.module.scss';
import LoaderGif from '../../asset/loader.gif';
import ReactDOM from 'react-dom';

function Loader() {
  return ReactDOM.createPortal (
      <div className={styles.warriper}>
        <div className={styles.loader}>
            <img src={LoaderGif} alt="loading..." />
        </div>
      </div>,
      document.getElementById("loader")
  )
}

export default Loader;
