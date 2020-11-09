import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'hello',
    template: '<h1>Hello {{name}}</h1>',
    styles: ['']
})
export class helloComponent implements OnInit {
    constructor() { }
    @Input() name: string;
    ngOnInit(): void { }
}
@Component({
    selector: 'hi',
    template: '<h1>Hi {{name}}</h1>',
    styles: ['']
})
export class hiComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
    @Input() name: string;
}
