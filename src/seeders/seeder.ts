import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app/app.module';
import { SeedService } from './seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);
  await seedService.seedItems();
  await seedService.seedBiomes();
  await seedService.seedCreatures();
}

bootstrap();
