import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../shared/navbar/navbar';
import { ActivityService } from '../../core/services/activity';
import { Activity } from '../../core/models';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-activities',
  imports: [RouterLink, FormsModule, Navbar, DecimalPipe],
  standalone: true,
  templateUrl: './activities.html',
  styleUrl: './activities.scss',
})
export class Activities implements OnInit {
  activities = signal<Activity[]>([]);
  searchTerm = '';

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.activityService.list(this.searchTerm || undefined).subscribe(a => this.activities.set(a));
  }
}