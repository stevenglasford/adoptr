import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Message } from '../message';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.css']
})
export class MessageCardComponent implements OnInit {

  constructor(private db: DatabaseService) { }

  @Input() message: Message;

  ngOnInit(): void {
  }

}
