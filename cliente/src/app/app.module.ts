import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { ShowPostComponent } from './show-post/show-post.component';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AddPostComponent } from './add-post/add-post.component';
import { CommonService } from './service/common.service';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { PostComponent } from './post/post.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        routing,
        FilterPipeModule,
        MatExpansionModule,
        BrowserAnimationsModule,
        MatCardModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ShowPostComponent,
        AddPostComponent,
        AdminComponent,
        PostComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        CommonService,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }