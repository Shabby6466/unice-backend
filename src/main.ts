/* eslint-disable no-console */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { AppService } from '@modules/main/app.service';
import { HttpExceptionFilter } from '@modules/common/filters/http-exception.filter';
import { TrimStringsPipe } from '@modules/common/transformer/trim-strings.pipe';
import { adminModulesImports, AppModule, imports } from '@modules/main/app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import express from 'express';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from '@utils/logger/logger.service';
import compression from 'compression';
import { IoAdapter } from '@nestjs/platform-socket.io';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  const logger: LoggerService = app.get(WINSTON_MODULE_NEST_PROVIDER);

  // Configure WebSocket adapter
  app.useWebSocketAdapter(new IoAdapter(app));

  app.use(compression());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.useLogger(logger);

  app.useGlobalPipes(new TrimStringsPipe(), new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  // Set global prefix with exclusions for certain routes
  app.setGlobalPrefix('v1/api', {
    exclude: ['.well-known/assetlinks.json', '.well-known/walletconnect.txt'],
  });

  app.disable('x-powered-by');
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  appSwaggerDoc(app, imports);
  adminSwaggerDoc(app, adminModulesImports);

  await app.listen(process.env.APP_PORT);
  AppService.startup();
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log('WebSockets are enabled and running');
};

const appSwaggerDoc = (app: INestApplication, modules) => {
  const config = new DocumentBuilder()
    .setTitle('🌐 Unice')
    .setDescription('App Backend APIs')
    .setVersion('1.0')
    .addServer(`http://localhost:${process.env.APP_PORT}`, 'Local')
    .addServer('', 'Dev')
    .addBearerAuth()
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    include: modules,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Mobile | API Docs',
    customfavIcon: '',
  });
};

const adminSwaggerDoc = (app: INestApplication, modules) => {
  const config = new DocumentBuilder()
    .setTitle('🌐 Unice')
    .setDescription('Admin Backend APIs')
    .setVersion('1.0')
    .addServer(`http://localhost:${process.env.APP_PORT}`, 'Local')
    .addServer('', 'Dev')
    .addBearerAuth()
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
    include: modules,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('/docs/admin', app, document, {
    customSiteTitle: 'Admin | API Docs',
    customfavIcon: '',
  });
};

bootstrap()
  .then(() => console.log('Server started on ' + process.env.APP_PORT))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
