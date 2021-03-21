import MktCategory from './components/MktCategory.vue'
import MktListing from './components/MktListing.vue'
import MktDetails from './components/MktDetails.vue'
import MktAdd from './components/MktAdd.vue'
import MktCart from './components/MktCart.vue'
import EventCategory from './components/EventCategory.vue'
import InfoCategory from './components/InfoCategory.vue'

export default [
    { path: '/mkt-category', component: MktCategory },
    { path: '/mkt-listing', component: MktListing, name: 'mkt-listing', props: true },
    { path: '/mkt-details', component: MktDetails, name: 'mkt-details', props: true },
    { path: '/mkt-add', component: MktAdd },
    { path: '/mkt-cart', component: MktCart },
    { path: '/event-category', component: EventCategory },
    { path: '/info-category', component: InfoCategory },
]