import { Module } from '@nestjs/common';

import { RegisterShortenedLink } from './usecases/links/RegisterShortenedLink';

@Module({
  providers: [RegisterShortenedLink],
  exports: [RegisterShortenedLink],
})
export class ApplicationModule {}
