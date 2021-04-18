import MktCategory from './components/MktCategory.vue'
import MktListing from './components/MktListing.vue'
import MktDetails from './components/MktDetails.vue'
import MktAdd from './components/MktAdd.vue'
import MktCart from './components/MktCart.vue'

import EventCategory from './components/EventCategory.vue'
import EventListing from './components/EventListing.vue'
import EventDetails from './components/EventDetails.vue'
import EventAdd from './components/EventAdd.vue'

import InfoCategory from './components/InfoCategory.vue'
import InfoDetails from './components/InfoDetails.vue'
import InfoListing from './components/InfoListing.vue'
import InfoAdd from './components/InfoAdd.vue'

import RootPage from './components/RootPage.vue'
import SignUpPage from './components/SignUpPage.vue'
import LoginPage from './components/LoginPage.vue'
import ForgotPassword from './components/ForgotPassword.vue'

import Profile from './components/Profile.vue'

import Admin from './components/Admin.vue'



export default [

    { path: '/mkt-category', component: MktCategory },
    { path: '/mkt-details', component: MktDetails, name: 'mkt-details', props: true },
    { path: '/mkt-add', component: MktAdd },
    { path: '/mkt-cart', component: MktCart },
    {
        path: '/mkt-listing',
        component: MktListing,
        children: [
            { path: 'decor', component: MktListing, name: 'decor', props: true },
            { path: 'fashion', component: MktListing, name: 'fashion', props: true },
            { path: 'furniture', component: MktListing, name: 'furniture', props: true },
            { path: 'jewellery', component: MktListing, name: 'jewellery', props: true }
        ]
    },

    { path: '/event-category', component: EventCategory },
    { path: '/event-add', component: EventAdd },
    { path: '/event-details', component: EventDetails, name: 'event-details', props: true },
    {
        path: '/event-listing',
        component: EventListing,
        children: [
            { path: 'donation', component: EventListing, name: 'donation', props: true },
            { path: 'volunteering', component: EventListing, name: 'volunteering', props: true },
            { path: 'workshops', component: EventListing, name: 'workshops', props: true },
        ]
    },

    { path: '/info-category', component: InfoCategory },
    { path: '/info-details', component: InfoDetails, name: 'info-details', props: true },
    { path: '/info-add', component: InfoAdd },
    {
        path: '/info-listing',
        component: InfoListing,
        children: [
            { path: 'crafts', component: InfoListing, name: 'crafts', props: true },
            { path: 'news', component: InfoListing, name: 'news', props: true },
            { path: 'lifestyle', component: InfoListing, name: 'lifestyle', props: true },
        ]
    },


    { path: '/', component: RootPage, name: 'root-page', meta: { noAuth: true } },
    { path: '/sign-up', component: SignUpPage, name: 'sign-up', meta: { noAuth: true } },
    { path: '/login', component: LoginPage, name: 'login', meta: { noAuth: true } },
    { path: '/forgot-password', component: ForgotPassword, name: 'forgot-pw', meta: { noAuth: true } },

    { path: '/profile', component: Profile, name: 'profile' },

    { path: '/admin', component: Admin, name: 'admin' },
]