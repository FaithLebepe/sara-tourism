import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { AdminLogin } from './pages/admin-login/admin-login';
import { Activities } from './pages/activities/activities';
import { ActivityDetails } from './pages/activity-details/activity-details';
import { MyBookings } from './pages/my-bookings/my-bookings';
import { AdminBookings } from './pages/admin/admin-bookings/admin-bookings';
import { AdminActivity } from './pages/admin/admin-activity/admin-activity';
import { AdminTourguides } from './pages/admin/admin-tourguides/admin-tourguides';
import { AdminTourists } from './pages/admin/admin-tourists/admin-tourists';
import { AdminReports } from './pages/admin/admin-reports/admin-reports';

import { touristGuard } from './core/guards/tourist';
import { adminGuard } from './core/guards/admin';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'admin-login', component: AdminLogin },

  { path: 'activities', component: Activities },
  { path: 'activities/:id', component: ActivityDetails },

  { path: 'my-bookings', component: MyBookings, canActivate: [touristGuard] },

  { path: 'admin/bookings', component: AdminBookings, canActivate: [adminGuard] },
  { path: 'admin/activities', component: AdminActivity, canActivate: [adminGuard] },
  { path: 'admin/tourguides', component: AdminTourguides, canActivate: [adminGuard] },
  { path: 'admin/tourists', component: AdminTourists, canActivate: [adminGuard] },
  { path: 'admin/reports', component: AdminReports, canActivate: [adminGuard] },

  { path: '**', redirectTo: '' }
];