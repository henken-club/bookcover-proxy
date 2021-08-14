import {Controller, Get} from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getUrl(): string | null {
    return 'get url or null';
  }
}
