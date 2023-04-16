import styles from './styles.module.css';
import { ReactComponent as AllianceLogo } from '../../assets/images/alliance-logo.svg';

const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <svg className={styles.spinner} viewBox="0 0 50 50">
        <circle className={styles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="2"></circle>
      </svg>
      <AllianceLogo className={styles.logo} />
    </div>
  );
};

export default LoadingSpinner;
