import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class MySingleRestaurantInput extends PickType(Restaurant, ['id']) {}

@ObjectType()
export class MySingleRestaurantOutput extends CoreOutput {
  @Field(() => Restaurant, { nullable: true })
  restaurant?: Restaurant;
}
