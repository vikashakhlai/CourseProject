import Auth from '../components/screens/auth/Auth'
import Content from '../components/screens/cart/Content'
import Contacts from '../components/screens/contacts/Contacts'
import DishDetail from '../components/screens/dish-detail/DishDetail.jsx'
import DeleteDish from '../components/screens/dish/DeleteDish'
import Home from '../components/screens/home/Home'
import NewDish from '../components/screens/new-dish/NewDish'
import NewNews from '../components/screens/new-news/NewNews'
import NewPromotion from '../components/screens/new-promotion/NewPromotion'
import News from '../components/screens/news/News.jsx'
import UpdateNews from '../components/screens/news/UpdateNews'
import AdminOrder from '../components/screens/order/AdminOrder'
import DeleteOrder from '../components/screens/order/DeleteOrder'
import Order from '../components/screens/order/Order'
import Profile from '../components/screens/profile/Profile'
import DeletePromotion from '../components/screens/promotion/DeletePromotion'
import Promotion from '../components/screens/promotion/Promotion'

import CartPage from '../components/layout/header/cart/CartPage'

export const routes = [
	{
		path: '/auth',
		component: Auth,
		isAuth: false
	},
	{
		path: '/',
		component: Home,
		isAuth: true
	},

	{
		path: '/profile',
		component: Profile,
		isAuth: true
	},

	{
		path: '/news',
		component: News,
		isAuth: true
	},
	{
		path: '/orders',
		component: Order,
		isAuth: true
	},
	{
		path: '/new-news',
		component: NewNews,
		isAuth: true
	},
	{
		path: '/dishes/:id',
		component: DishDetail,
		isAuth: true
	},
	{
		path: '/new-dish',
		component: NewDish,
		isAuth: true
	},
	{
		path: '/new-promotion',
		component: NewPromotion,
		isAuth: true
	},
	{
		path: '/update-news',
		component: UpdateNews,
		isAuth: true
	},

	{
		path: '/delete-promotion',
		component: DeletePromotion,
		isAuth: true
	},
	{
		path: '/delete-dish',
		component: DeleteDish,
		isAuth: true
	},
	{
		path: '/delete-order',
		component: DeleteOrder,
		isAuth: true
	},
	// {
	// 	path: '/menu',
	// 	component: Dish,
	// 	isAuth: true
	// },
	{
		path: '/menu',
		component: Content,
		isAuth: true
	},
	{
		path: '/promotions',
		component: Promotion,
		isAuth: true
	},
	{
		path: '/admin-orders',
		component: AdminOrder,
		isAuth: true
	},
	{
		path: '/contacts',
		component: Contacts,
		isAuth: true
	},
	{
		path: '/cart',
		component: CartPage,
		isAuth: true
	}
]
