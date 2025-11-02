import { Module } from '@nestjs/common';
import { CommentsModule } from './comments/comments.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config/config.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
      ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
        MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI') ,
      }),
      inject: [ConfigService],
    }),
    CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
