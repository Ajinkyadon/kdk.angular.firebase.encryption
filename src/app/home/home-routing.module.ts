import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../service/auth/auth.guard';



const routes: Routes = [
  {  
    
   
      path: 'login',
      component: LoginComponent,
      canActivate: [AuthGuard]
   
  },
  

 ];

@NgModule({
  
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class HomeRoutingModule { }

