import MktCategory from './components/MktCategory.vue'
import MktListing from './components/MktListing.vue'
import MktDetails from './components/MktDetails.vue'
import MktAdd from './components/MktAdd.vue'
import MktCart from './components/MktCart.vue'
import EventCategory from './components/EventCategory.vue'
import InfoCategory from './components/InfoCategory.vue'
import EventListing from './components/EventListing.vue'
import EventDetails from './components/EventDetails.vue'
import RootPage from './components/RootPage.vue' 
import SignUpPage from './components/SignUpPage.vue' 
import LoginPage from './components/LoginPage.vue' 


export default [
    { path: '/mkt-category', component: MktCategory },
    { path: '/mkt-listing', component: MktListing, name: 'mkt-listing', props: true },
    { path: '/mkt-details', component: MktDetails, name: 'mkt-details', props: true },
    { path: '/mkt-add', component: MktAdd },
    { path: '/mkt-cart', component: MktCart },
    { path: '/event-category', component: EventCategory },
    { path: '/info-category', component: InfoCategory },
    { path: '/eve-listing', component: EventListing, name: 'eve-listing', props: true },
    { path: '/eve-details', component: EventDetails, name: 'eve-details', props: true },
    { path: '/root', component: RootPage, name: 'root-page'},
    { path: '/sign-up', component: SignUpPage, name:'sign-up' },
    { path: '/login', component: LoginPage, name:'login' },
]