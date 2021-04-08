import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-calorie-checker',
  templateUrl: './calorie-checker.component.html',
  styleUrls: ['./calorie-checker.component.css']
})
export class CalorieCheckerComponent implements OnInit {

  constructor() {
    this.initializeForm();
  }

  public calorieForm: FormGroup;
  calories: number;
  submitted = false;

  ngOnInit(): void {
  }
  initializeForm(): void {
    this.calorieForm = new FormGroup({
      goalWeight: new FormControl('', Validators.required),
      currentWeight : new FormControl('', Validators.required),
      goalDate: new FormControl(null, Validators.required),
      gender : new FormControl('female'),
      age : new FormControl(null, Validators.required),
      height : new FormControl(null, Validators.required),
      exerciseLevel : new FormControl('moderate'),
      // personalHealth: new FormControl()
    });
  }
  calculateCalorie(): void {
    this.submitted = true;
    if (this.calorieForm.invalid) {
      return;
    }
    let bmr = 0;
    const gender = this.calorieForm.controls.gender.value;
    const age = this.calorieForm.controls.age.value;
    const height = this.calorieForm.controls.height.value;
    const weight = this.calorieForm.controls.currentWeight.value;
    const exercise = this.calorieForm.controls.exerciseLevel.value;
    if (gender === 'male') {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }

    if (exercise === 'active') {
      this.calories = bmr * 1.53;
    } else if (exercise === 'moderate') {
      this.calories = bmr * 1.76;
    } else {
      this.calories = bmr * 2.25;
    }
  }


}
