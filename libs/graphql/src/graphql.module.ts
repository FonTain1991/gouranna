import { AuthModule, AuthResolver, AuthService } from '@app/auth'
import { UserModule, UserResolver } from '@app/user'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { useFactory } from './graphql.utils'

@Module({
  imports: [
    AuthModule,
    UserModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [
        ConfigModule,
        AuthModule
      ],
      inject: [
        ConfigService,
        AuthService
      ],
      driver: ApolloDriver,
      useFactory: useFactory
    })
  ],
  providers: [
    AuthResolver,
    UserResolver
  ]
})
export class GraphqlModule { }
