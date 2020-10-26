/**
 * Onbroading Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 * 
 * File path - 'src/pages/onboarding/onboarding.component.ts'
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {

  // Slider Options
  slideOpts = {
    initialSlide: 0,
    loop: false,
    autoplay: true,
    speed: 400,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  };


  constructor() { }

  ngOnInit() {
  }
}
