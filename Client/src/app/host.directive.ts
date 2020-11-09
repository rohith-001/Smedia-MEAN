import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[host]',
})
export class HostDirective {
    constructor(public viewRef: ViewContainerRef){

    }
 }