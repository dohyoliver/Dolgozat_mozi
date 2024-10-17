import { Body, Controller, Get, Post,  Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Mozidto } from './Mozi.dto';
import { Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }
  
  @Get('mozi')
  @Render('foglalas')
  foglalas(){
    return{
    data:{} ,
    errors:[]
    }
  }
  
  @Post('mozi')
  foglalasPost(@Body() mozidto: Mozidto, @Res() response: Response ){
  const errors: string[] = [];
  
  if(!mozidto.nev || !mozidto.email || !mozidto.nezok){
    errors.push('Minden mezőt kikell tölteni')
  }
  const aktualis= new Date();
  if(!mozidto.date || new Date(mozidto.date) < aktualis){
    errors.push('A dátum nem lehet a mai napnál kevesebb')
  }
  
  if(!mozidto.nev.trim()){
    errors.push('kötelező megadni nevet')
  }
  
  if(errors.length > 0){
    return response.render('foglalas', {
      data: mozidto,
      errors
    }) 
  }

    response.redirect(303, 'moziSuccess')

  }
  @Get('moziSuccess')
  @Render('success')
  moziSuccess(){

  }
}
