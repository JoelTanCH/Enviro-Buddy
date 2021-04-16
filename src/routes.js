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
import ConfirmSignUp from './components/ConfirmSignUp.vue'
import Profile from './components/Profile.vue'



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
            { path: 'cleanup', component: EventListing, name: 'cleanup', props: true },
            { path: 'recycling', component: EventListing, name: 'recycling', props: true },
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
            { path: 'outside', component: InfoListing, name: 'outside', props: true },
            { path: 'workshop', component: InfoListing, name: 'workshop', props: true },
        ]
    },


    { path: '/', component: RootPage, name: 'root-page', meta: { noAuth: true } },
    { path: '/sign-up', component: SignUpPage, name: 'sign-up', meta: { noAuth: true } },
    { path: '/login', component: LoginPage, name: 'login', meta: { noAuth: true } },
    { path: '/forgot-password', component: ForgotPassword, name: 'forgot-pw', meta: { noAuth: true } },
    { path: '/confirm-signup', component: ConfirmSignUp, name: 'confirm-signup', meta: { noAuth: true } },

    { path: '/profile', component: Profile, name: 'profile' },
]