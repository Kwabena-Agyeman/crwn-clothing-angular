import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.scss'],
})
export class StripePaymentComponent implements OnInit {
  @Input() amount: number = 0;

  ngOnInit(): void {
    this.invokeStripe();
  }

  makePayment() {
    const paymenthandler = (<any>window).StripeCheckout.configure({
      amount: this.amount * 100,
      locale: 'auto',
      key: environment.stripePublicKey,
      token: function (stripeToken: any) {
        console.log(stripeToken.card);
      },
    });

    paymenthandler.open({
      name: 'Crwn clothing',
      description: 'E-commerce platform',
      amount: this.amount * 100,
    });
  }

  invokeStripe() {
    if (window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = '';
      window.document.body.appendChild(script);
    }
  }
}
