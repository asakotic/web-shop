import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ProductList } from './pages/product-list/product-list';
import { SingleView } from './pages/single-view/single-view';
import { authGuard} from './auth-guard';
import { publicGuard } from './public-guard';
import { Cart } from './pages/cart/cart';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login,
        canActivate: [publicGuard]
    },
    {
        path: 'register',
        component: Register,
        canActivate: [publicGuard]
    },
    {
        path: 'products',
        component: ProductList,
        canActivate: [authGuard]
    },
    { 
        path: 'product/:id',
        component: SingleView,
        canActivate: [authGuard]
    },
    {
        path: 'cart',
        component: Cart,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'products'
    }
];
