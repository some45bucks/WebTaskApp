import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class userProjects1643860591250 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'userProjects',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'ProjectId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'isProjectLead',
            type: 'bool',
            isNullable: false,
          },
        ],
      }),
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('userProjects');
  }
}
