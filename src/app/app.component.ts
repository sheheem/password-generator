import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'password-generator';

  @ViewChild('input') myInput!: ElementRef;

  lowerCase = false;
  upperCase = false;
  number = false;
  symbol = false;

  generatedPass: string = '';

  disabled = false;
  max = 20;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;

  ngOnInit(): void {
    
  }

  onChangeLength(value: number) {
    this.value = value;
    
  }

  onChangeNumber(value: boolean) {
    this.number = value;
  }

  onChangeUpper(value: boolean) {
    this.upperCase = value;
  }

  onChangeLower(value: boolean) {
    this.lowerCase = value;
  }

  onChangeSymbol(value: boolean) {
    this.symbol = value;
  }



  getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random()*26)+97);
  }

  getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random()*26)+65);
  }

  getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random()*10)+48);
  }

  getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random()* symbols.length)];
  }

  generatePass(lower: boolean, upper: boolean, number: boolean, symbol: boolean, length: number) {
    this.generatedPass = ''

    const randomFunc: { [key: string]: string } = {
      lower: this.getRandomLower(),
      upper: this.getRandomUpper(),
      number: this.getRandomNumber(),
      symbol: this.getRandomSymbol()
    }

    let typesCount = (lower? 1:0) + (upper? 1:0) + (number? 1:0) + (symbol?1:0)

    const typeArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])
    
    if(typesCount === 0) {
      return 
    }

    for(let i=0; i < length; i+=typesCount) {
      typeArr.forEach(type => {
        const funcName = Object.keys(type)[0];
        
        this.generatedPass += randomFunc[funcName]
      })
    }

    return this.generatedPass
    
  }

  onClick() {
    
    let hasLower = this.lowerCase;
    let hasUpper = this.upperCase;
    let hasNumber = this.number;
    let hasSymbol = this.symbol;
    let length = this.value;

    console.log();
    

    this.myInput.nativeElement.value = this.generatePass(hasLower, hasUpper, hasNumber, hasSymbol, length)
    
  }
}
