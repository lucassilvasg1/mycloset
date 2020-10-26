
import { Component, OnInit } from '@angular/core';
import { LottieAnimationViewModule } from 'ng-lottie';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  lottieConfig: any;

  constructor() {
    LottieAnimationViewModule.forRoot();

    this.lottieConfig = {
      path: '../../../../assets/contact.json',
      autoplay: true,
      loop: true
    }
  }

  ngOnInit() { }

}
