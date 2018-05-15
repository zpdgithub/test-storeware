import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { HttpModule, Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  template: `
  <div>更换皮肤</div>
  <div>
    <button *ngFor="let theme of themes" (click)="loadCss(theme.css)">css{{theme.id}}</button>
  </div>
  <div>
    <button *ngFor="let theme of themes" (click)="loadJs(theme.js)">js{{theme.id}}</button>
  </div>
  `
})
export class AppComponent {
  http: Http;
  themes: Object[];

  constructor(http: Http) {
    this.http = http;
    this.getThemes();
    this.getDefaultTheme();
  }

  loadJs(file: string): void {
    const scriptTag = document.getElementById('loadScript');
    const body = document.getElementsByTagName('body').item(0);
    if (scriptTag) {
      body.removeChild(scriptTag);
    }
    const script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.id = 'loadScript';
    body.appendChild(script);
  }

  loadCss(file: string): void {
    const cssTag = document.getElementById('loadCss');
    const head = document.getElementsByTagName('head').item(0);
    if (cssTag) {
      head.removeChild(cssTag);
    }
    const css = document.createElement('link');
    css.href = file;
    css.rel = 'stylesheet';
    css.type = 'text/css';
    css.id = 'loadCss';
    head.appendChild(css);
  }

  getThemes(): void {
    this.http.request('http://127.0.0.1:3000/api/themes').subscribe((res: Response) => {
      this.themes = res.json();
    });
  }

  getDefaultTheme(): void {
    this.http.request(`http://127.0.0.1:3000/api/theme/1`).subscribe((res: Response) => {
      const theme = res.json();
      this.loadCss(theme.css);
    });
  }
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
