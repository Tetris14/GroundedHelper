import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ressource_entity } from './entity/ressources.entity';
import { RessourceController } from './ressources.controller';
import { RessourceService } from './ressources.service';

@Module({
  imports: [TypeOrmModule.forFeature([ressource_entity])],
  controllers: [RessourceController],
  providers: [RessourceService],
  exports: [RessourceService],
})
export class RessourceModule {}
