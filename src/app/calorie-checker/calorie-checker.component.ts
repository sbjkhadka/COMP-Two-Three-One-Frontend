import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ThemeService} from '../shared-services/theme.service';

@Component({
  selector: 'app-calorie-checker',
  templateUrl: './calorie-checker.component.html',
  styleUrls: ['./calorie-checker.component.css']
})
export class CalorieCheckerComponent implements OnInit {

  theme: string;
  constructor(private themeService: ThemeService) {
    this.initializeForm();
  }

  public calorieForm: FormGroup;
  calories: number;
  submitted = false;

  ngOnInit(): void {
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });
  }
  initializeForm(): void {
    this.calorieForm = new FormGroup({
      goalWeight: new FormControl('', Validators.required),
      currentWeight : new FormControl('', Validators.required),
      goalDate: new FormControl(null, Validators.required),
      gender : new FormControl('female'),
      bodyFat : new FormControl(null, Validators.required),
      height : new FormControl(null, Validators.required),
      exerciseLevel : new FormControl('moderate'),
    });
  }
  calculateCalorie(): void {
    this.submitted = true;
    if (this.calorieForm.invalid) {
      return;
    }
    let bmr = 0;
    const gender = this.calorieForm.controls.gender.value;
    const age = this.calorieForm.controls.bodyFat.value;
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

  calculateRequirement(): void {
    const gender = this.calorieForm.controls.gender.value;
    const weight = this.calorieForm.controls.currentWeight.value;
    const goalWeight = this.calorieForm.controls.goalWeight.value;
    const bodyFat = this.calorieForm.controls.bodyFat.value;
    const exercise = this.calorieForm.controls.exerciseLevel.value;
    const goalDate = this.calorieForm.controls.goalDate.value;
    let requirement = weight;
    let leanFactor = 1;
    if (gender === 'female'){
      requirement *= 0.9;
      if (bodyFat >= 19 && bodyFat <= 28){
        leanFactor = 0.95;
      }
      else if (bodyFat >= 29 && bodyFat <= 38){
        leanFactor = 0.9;
      }
      else if (bodyFat >= 39){
        leanFactor = 0.85;
      }
    }
    else {
      if (bodyFat >= 15 && bodyFat <= 20){
        leanFactor = 0.95;
      }
      else if (bodyFat >= 21 && bodyFat <= 28) {
        leanFactor = 0.9;
      }
      else if (bodyFat >= 29) {
        leanFactor = 0.85;
      }
    }
    requirement *= 24;
    requirement *= leanFactor;
    if (exercise === 'active') {
      requirement *= 1.6;
    } else if (exercise === 'moderate') {
      requirement *= 1.45;
    } else {
      requirement *= 1.3;
    }

    const additionalCalories = (goalWeight - weight) * 7700.0;
    const currentDate = new Date();

    // @ts-ignore
    const diffDays = Math.floor((goalDate - currentDate) / (1000 * 60 * 60 * 24));

    requirement += (additionalCalories / diffDays);

    this.calories = requirement;
  }
}
