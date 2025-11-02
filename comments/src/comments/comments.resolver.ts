import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';

@Resolver()
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}
}
