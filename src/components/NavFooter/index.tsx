import styles from './index.module.less'
const NavFooter = () => {
  return (
    <div className={styles.footer}>
      <div>
        <a href='https://www.imooc.com/u/1343480' target='_blank' rel='noreferrer'>
          ptc测试123456
        </a>
        <span className='gutter'>|</span>
        <a href='https://coding.imooc.com/class/644.html' target='_blank' rel='noreferrer'>
          ptc测试7890
        </a>
        <span className='gutter'>|</span>
        <a href='https://coding.imooc.com/class/502.html' target='_blank' rel='noreferrer'>
          ptc测试123456
        </a>
        <span className='gutter'>|</span>
        <a href='https://coding.imooc.com/class/397.html' target='_blank' rel='noreferrer'>
          ptc测试7890
        </a>
      </div>
      <div>Copyright ©2025 ptc测试123456 All Rights Reserved.</div>
    </div>
  )
}

export default NavFooter
