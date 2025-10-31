import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}
}
