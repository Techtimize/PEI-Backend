// src/mail/mail.module.ts
import { Module, Global } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigType } from '@nestjs/config';
import mailConfig from './email.config';
import { join } from 'path';
import { MailService } from './email.provider';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(mailConfig),
    MailerModule.forRootAsync({
      imports: [ConfigModule.forFeature(mailConfig)],
      inject: [mailConfig.KEY],
      useFactory: (config: ConfigType<typeof mailConfig>) => ({
        transport: {
          host: config.host,
          port: config.port,
          secure: config.port === 465, // true for 465, false for other ports
          auth: {
            user: config.user,
            pass: config.pass,
          },
        },
        defaults: {
          from: config.from,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
