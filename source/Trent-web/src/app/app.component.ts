import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {TokenService} from 'src/app/services/token.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  rentersVisited:boolean=false;
  isAtHome: boolean=true;
  isHandset: boolean = false;
  isAuthenticated: boolean = false;
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private tokenService: TokenService,
    private route: ActivatedRoute,
  ) {
    this.route.url.subscribe(urlSegments => {
      this.isAtHome = urlSegments.length>0 && urlSegments[0].path ==='';
    })
  }

  ngOnInit() {
    this.tokenService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result =>{
      this.isHandset= result.matches;
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isAtHome = this.router.url === '/';
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
  navigateToAccommodationList() {
    this.router.navigate(['/accommodation-list']);
  }
  navigateToAddOrder() {
    this.router.navigate(['add-order']);
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
    this.rentersVisited=true;
  }
  navigateToRenterList() {
    this.router.navigate(['/renter-list']);
  }
  navigateToHome() {
    this.router.navigate(['/']);
  }
  title = 'Trent-web';
}
