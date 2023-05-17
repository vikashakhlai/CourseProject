import hero from '../../../../../public/images/hero.png'
import styles from '../Home.module.scss'

const Hero = () => {
	return (
		<div>
			<div className={styles.container}>
				<h2 className={styles.header}>McDonald's</h2>

				<img src={hero}></img>
				<span>Place to eat delicious food</span>
			</div>
		</div>
	)
}

export default Hero
