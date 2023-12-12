import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {TokenService} from 'src/app/services/token.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isHandset: boolean = false;
  isAuthenticated: boolean = false;
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.tokenService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result =>{
      this.isHandset= result.matches;
    });
  }
  logout(): void {
    // clear local storage
    this.tokenService.clearAccessToken();
    this.isAuthenticated = false;
    //dialog you have been logged out
    this.navigateToLogin();
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  navigateToRenterList() {
    this.router.navigate(['/renter-list']);
  }
  navigateToHome() {
    this.router.navigate(['/']);
  }
  title = 'Trent-web';
}
