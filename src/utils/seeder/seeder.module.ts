import { Module } from '@nestjs/common';
import { SeedService } from './seeder.service';
import { LoggerService } from '@utils/logger/logger.service';
import { AdminAuthModule } from '@modules/main/admin/auth/auth.module';
import { AuthModule } from '@modules/main/auth/auth.module';
import { WalletModule } from '@modules/main/wallet/wallet.module';
@Module({
  imports: [AuthModule, AdminAuthModule, WalletModule],
  exports: [SeedService],
  providers: [SeedService, LoggerService],
})
export class SeedModule {}
