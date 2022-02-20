import { Module } from '@nestjs/common';

import { ApplicationModule } from './application/application.module';
import { InfraModule } from './infra/infra.module';
import { LinksController } from './presentation/links/links.controller';

@Module({
  imports: [InfraModule, ApplicationModule],
  controllers: [LinksController],
  providers: [],
})
export class AppModule {}
