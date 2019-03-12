import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';

import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'app', component: AppComponent},
    { path: 'post', component: PostComponent, canActivate: [AuthGuard]},

    // sino se redirecciona a home
    { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders  = RouterModule.forRoot(appRoutes);