import styles from './index.module.less'

export default function Welcome() {
  return <div className={styles.welcome}>
    <div className={styles.content}>
      <div className={styles.subTitle}>Welcome to the</div>
      <div className={styles.title}>Admin Dashboard</div>
      <div className={styles.desc}>Manage your application with ease</div>
    </div>
    <div className={styles.img}></div>
  </div>
}
