import {Component, OnInit} from "@angular/core";
import {Form} from "@angular/forms";

@Component({
  selector: 'app-messagetousers',
  templateUrl: './messagetousers.component.html',
  styleUrls: ['./messagetousers.component.css']
})
export class MessagetousersComponent implements OnInit{
  constructor() {}
  ngOnInit(){
    document.getElementById('messageToUser').style.visibility='hidden';
    document.getElementById('messagesSentToUser').style.visibility='hidden';
    document.getElementById('bulkmessagesToUser').style.visibility='hidden';
  }

  messageToUser(form:Form){
  }

  messagesSentToUser(from:Form){}

  bulkMessages(){}

  showMessageToUser(){
    document.getElementById('messagesSentToUser').style.visibility='hidden';
    document.getElementById('bulkmessagesToUser').style.visibility='hidden';
    document.getElementById('messageToUser').style.visibility='visible';
    // document.getElementById('messagesSentToUser').style.display='none'
    // document.getElementById('messageToUser').style.display='visible'
  }
  showMessagesSentToUser(){
    // document.getElementById('messagesSentToUser').style.display='visible'
    // document.getElementById('messageToUser').style.display='none'
    document.getElementById('messageToUser').style.visibility='hidden'
    document.getElementById('bulkmessagesToUser').style.visibility='hidden';
    document.getElementById('messagesSentToUser').style.visibility='visible'

  }

  showBulkMessagesToUser(){
    // document.getElementById('messagesSentToUser').style.display='visible'
    // document.getElementById('messageToUser').style.display='none'
    document.getElementById('messageToUser').style.visibility='hidden'
    document.getElementById('messagesSentToUser').style.visibility='hidden'
    document.getElementById('bulkmessagesToUser').style.visibility='visible';


  }
}
