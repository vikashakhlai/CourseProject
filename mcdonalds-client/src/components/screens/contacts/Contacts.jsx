import Layout from '../../layout/Layout'

import styles from './Contacts.module.scss'
import { useContacts } from './useContacts'

const Contacts = () => {
	const contacts = useContacts()

	return (
		<Layout>
			<div className={styles.container}>
				<h2 style={{ textAlign: 'center' }}>Contacts</h2>
				{contacts.length ? (
					contacts.map(item => (
						<div className={styles.item}>
							<p>{item.city}</p>
							<p>{item.address}</p>
						</div>
					))
				) : (
					<p>There are no contacts</p>
				)}
			</div>
		</Layout>
	)
}

export default Contacts
