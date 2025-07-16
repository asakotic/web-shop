import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './services/user-service';
import { Navigation} from './pages/navigation/navigation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = 'frontend';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.checkLoginStatus();
  }
}
