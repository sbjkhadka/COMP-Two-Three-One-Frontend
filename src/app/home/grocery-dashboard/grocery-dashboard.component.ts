import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-grocery-dashboard',
  templateUrl: './grocery-dashboard.component.html',
  styleUrls: ['./grocery-dashboard.component.css']
})
export class GroceryDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Ingredients', cols: 2, rows: 2 },
          { title: 'Recipes', cols: 1, rows: 1  },
          { title: 'Calories', cols: 1, rows: 1 },
          { title: 'Other', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Ingredients', cols: 1, rows: 1  },
        { title: 'Recipes', cols: 1, rows: 1  },
        { title: 'Calories', cols: 1, rows: 1 },
        { title: 'Other', cols: 1, rows: 1 }

      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
