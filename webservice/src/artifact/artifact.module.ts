import { Module } from '@nestjs/common';
import { ArtifactController } from './artifact.controller';
import { ArtifactService } from './artifact.service';
import { TagsService } from './tags/tags.service';
import { AssetsService } from './assets/assets.service';
import { ContentStoreModule } from './content-store/content-store.module';
//import { ContentStoreService } from './content-store/content-store.service';

@Module({
  imports: [ContentStoreModule],
  controllers: [ArtifactController],
  providers: [ArtifactService, TagsService, AssetsService],
})
export class ArtifactModule {}

/*

artifact -d PwCKINKS staging "tag 1.1.0" | path/to/img.gif | content | en.lang.json

artifact -d PwCKINKS prod 1.0.2 
    tag dev -> staging
    tag staging -> prod

artifact -d platfrom dev 4.3.2 
    tag dev -> staging
    tag staging -> prod

artifact hash PwCKINKS prod
 staging hash check from hash check dev == staging (dev == staging)
 prod hash check staging == prod

find dist/ -type f -print0 | sort -z | xargs -0 sha1sum | sha1sum

artifact -l PwCKINKS dev

Requests
- list tags buy applicaiton name
- applicaitons

*/
