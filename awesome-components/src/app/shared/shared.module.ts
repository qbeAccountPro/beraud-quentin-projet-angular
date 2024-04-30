import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ShortenPipe } from './pipes/shorten.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { TimeAgoPipe } from './pipes/time-ago-pipe';
import { UsernamePipe } from './pipes/username.pipe';
import { HighlightDirective } from './directives/highlight.directive';




@NgModule({
  declarations: [ShortenPipe, TimeAgoPipe, UsernamePipe, HighlightDirective],
  imports: [
    MaterialModule, ReactiveFormsModule
  ],
  exports: [
    MaterialModule, CommonModule, ShortenPipe, TimeAgoPipe, UsernamePipe, HighlightDirective
  ]
})
export class SharedModule { }
