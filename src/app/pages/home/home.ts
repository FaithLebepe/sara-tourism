import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { ActivityService } from '../../core/services/activity';
import { Activity } from '../../core/models';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Navbar, DecimalPipe],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  popularActivities = signal<Activity[]>([]);

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.activityService.list().subscribe(activities => {
      // "Popular" = first 3 for now; the real popularity ordering lives in
      // the admin-only sp_activity_get_all_with_popularity endpoint.
      this.popularActivities.set(activities.slice(0, 6));
    });
  }
}