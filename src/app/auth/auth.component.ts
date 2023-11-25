import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';
@Component({
  selector: 'app-auht',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error!: string ;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost!: PlaceholderDirective;
  private closeSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
        authObs = this.authService.login(email, password);
    } else {
     authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
    (response) => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      
    );
    form.reset()
  }

  



}