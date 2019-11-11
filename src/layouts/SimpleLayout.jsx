import { Helmet } from 'react-helmet';
import Link from 'umi/link';
import React from 'react';
import { connect } from 'dva';
import styles from './SimpleLayout.less';

const SimpleLayout = props => {
  const {
    children,
  } = props;
  const title = '保定供电局 - 参赛应用'
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <span className={styles.title}>国网保定供电公司</span>
              </Link>
            </div>
            <div className={styles.desc}>计量装置错误接线分析与处理</div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default connect(({ settings }) => ({ ...settings }))(SimpleLayout);
