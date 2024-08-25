import { resources } from '@/app/data'
import { RightOutlined } from '@ant-design/icons'
import Link from 'next/link'
import styles from '../../page.module.css'

const HelpfulResources = () => {
  return (
    <section className={styles.resourcesSection}>
    <h2>Helpful Resources</h2>
    <div className={styles.resourcesWrapper}>
      {resources.map((resource) => (
        <div className={styles.resourceItem} key={resource.id}>
          <img
            className={styles.resourceImage}
            src={resource.image}
            alt=""
          />
          <h3>{resource.title}</h3>
          <p>{resource.description}</p>
          <Link href={resource.link}>
            Read More <RightOutlined />
          </Link>
        </div>
      ))}
    </div>
  </section>
  )
}

export default HelpfulResources