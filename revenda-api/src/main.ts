import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req: any, _res: any, next: any) => {
    console.log(`${req.method} ${req.url} - Origin: ${req.headers.origin}`);
    next();
  });

  // Habilitar CORS para permitir requisições do frontend
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
}
bootstrap();
