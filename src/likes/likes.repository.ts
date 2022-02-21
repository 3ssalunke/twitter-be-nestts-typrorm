import { EntityRepository, Repository } from "typeorm";
import { LikeEntity } from "./likes.entity";

@EntityRepository(LikeEntity)
export class LikesRepository extends Repository<LikeEntity> {}
