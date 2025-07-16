/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable, Logger } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { LoggerService } from '@utils/logger/logger.service';
import rolesData from './roles.json';
import { AdminAuthService } from '@modules/main/admin/auth/auth.service';
import { Role } from '@modules/main/role/entities/role.entity';
import { MoralisService } from '@modules/main/wallet/moralis/moralis.service';
@Injectable()
export class SeedService {
  constructor(
    private readonly logger: LoggerService,
    private readonly dataSource: DataSource,
    private readonly adminAuthService: AdminAuthService,
    private readonly moralisService: MoralisService,
  ) {
    // only main process

    this.seedData()
      .then((data) => Logger.log(data))
      .catch((err) => Logger.error(err));
  }

  async seedData() {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await this.seedRoles(queryRunner);
      await queryRunner.commitTransaction();
      await this.adminAuthService.createSuperAdmin();
      await this.moralisService.createOrUpdateStream();
      await this.moralisService.syncWalletAddresses();
    } catch (error) {
      this.logger.error(error, 'SeederService');
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Seeds the roles table with initial data.
   * @param queryRunner The QueryRunner instance to use for the operation.
   */
  private async seedRoles(queryRunner: QueryRunner) {
    await queryRunner.manager.save(Role, rolesData as Role[]);
  }
}
