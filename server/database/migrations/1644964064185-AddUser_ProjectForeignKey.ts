import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddUserProjectsForeignKey1644964064185 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'user_project',
      new TableForeignKey({
        name: 'userKey',
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_project',
      new TableForeignKey({
        name: 'projectKey',
        columnNames: ['projectId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'project',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('user_project', 'projectKey');
    await queryRunner.dropForeignKey('user_project', 'userKey');
  }
}
