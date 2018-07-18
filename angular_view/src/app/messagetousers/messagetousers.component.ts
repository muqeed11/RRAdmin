import {Component, OnInit} from "@angular/core";
import {Form, NgForm} from "@angular/forms";
import {ServerService} from "../server.service";

@Component({
  selector: 'app-messagetousers',
  templateUrl: './messagetousers.component.html',
  styleUrls: ['./messagetousers.component.css']
})
export class MessagetousersComponent implements OnInit{
  constructor(private server:ServerService) {}
  ngOnInit(){
    document.getElementById('messageToUser').style.visibility='hidden';
    document.getElementById('messagesSentToUser').style.visibility='hidden';
    document.getElementById('bulkmessagesToUser').style.visibility='hidden';
  }

  messageToUser(form:NgForm){

    const userId = form.value.userid;
    const message = form.value.message;
    const subject = form.value.subject;

    const body:any = {"userId":userId , "messageSub": subject ,"messageContent" : message } ;

    this.server.sendMessage(body)
      .subscribe(
        (res)=>
        {

          form.resetForm();
          console.log(res)


        }
      )


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
